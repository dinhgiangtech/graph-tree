"use server";

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { upsertFamilyMember } from '@/app/actions';
import { ProposalStatus, TreeRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Claim Profile: Links current user account to a specific Person node in the tree
 */
export async function claimProfile(
  treeId: string,
  personId: string
): Promise<ActionResponse<void>> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Vui lòng đăng nhập để liên kết hồ sơ.' },
    };
  }

  try {
    // Check if membership exists
    const membership = await prisma.treeMembership.findUnique({
      where: {
        treeId_userId: {
          treeId,
          userId: user.id,
        },
      },
    });

    if (membership) {
      await prisma.treeMembership.update({
        where: { id: membership.id },
        data: { personId },
      });
    } else {
      // Create new membership with MEMBER role
      await prisma.treeMembership.create({
        data: {
          treeId,
          userId: user.id,
          role: TreeRole.MEMBER,
          personId,
        },
      });
    }

    await prisma.auditLog.create({
      data: {
        treeId,
        userId: user.id,
        action: 'CLAIM_PROFILE',
        details: { personId, userName: user.name },
      },
    });

    revalidatePath(`/trees/${treeId}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error claiming profile:', error);
    return {
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Không thể liên kết hồ sơ thành viên.' },
    };
  }
}

/**
 * Submit an edit proposal for a family member
 */
export async function submitEditProposal(
  treeId: string,
  data: {
    targetId?: string;
    changeType: 'UPDATE_INFO' | 'ADD_CHILD' | 'ADD_SPOUSE';
    payload: Record<string, any>;
  }
): Promise<ActionResponse<{ proposalId: string }>> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Vui lòng đăng nhập để gửi đề xuất.' },
    };
  }

  try {
    const proposal = await prisma.editProposal.create({
      data: {
        treeId,
        userId: user.id,
        targetId: data.targetId || null,
        changeType: data.changeType,
        payloadJson: data.payload,
        status: ProposalStatus.PENDING,
      },
    });

    await prisma.auditLog.create({
      data: {
        treeId,
        userId: user.id,
        action: 'SUBMIT_PROPOSAL',
        details: { proposalId: proposal.id, changeType: data.changeType },
      },
    });

    revalidatePath(`/trees/${treeId}`);
    return {
      success: true,
      data: { proposalId: proposal.id },
    };
  } catch (error: any) {
    console.error('Error submitting edit proposal:', error);
    return {
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Không thể gửi đề xuất chỉnh sửa.' },
    };
  }
}

/**
 * Get all proposals for a tree (ADMIN and EDITOR only)
 */
export async function getTreeProposals(treeId: string) {
  const user = await getCurrentUser();
  if (!user) return [];

  try {
    const membership = await prisma.treeMembership.findUnique({
      where: {
        treeId_userId: {
          treeId,
          userId: user.id,
        },
      },
    });

    if (!membership || (membership.role !== TreeRole.ADMIN && membership.role !== TreeRole.EDITOR)) {
      return [];
    }

    const proposals = await prisma.editProposal.findMany({
      where: { treeId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return proposals;
  } catch (error) {
    console.error('Error getting tree proposals:', error);
    return [];
  }
}

/**
 * Review a proposal (Approve or Reject)
 */
export async function reviewProposal(
  treeId: string,
  proposalId: string,
  decision: 'APPROVED' | 'REJECTED',
  reviewerNote?: string
): Promise<ActionResponse<void>> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Vui lòng đăng nhập.' },
    };
  }

  try {
    const membership = await prisma.treeMembership.findUnique({
      where: {
        treeId_userId: {
          treeId,
          userId: user.id,
        },
      },
    });

    if (!membership || (membership.role !== TreeRole.ADMIN && membership.role !== TreeRole.EDITOR)) {
      return {
        success: false,
        error: { code: 'FORBIDDEN', message: 'Bạn không có quyền duyệt đề xuất.' },
      };
    }

    const proposal = await prisma.editProposal.findUnique({
      where: { id: proposalId },
    });

    if (!proposal || proposal.treeId !== treeId) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy đề xuất này.' },
      };
    }

    if (decision === 'APPROVED') {
      const payload: any = proposal.payloadJson;

      if (proposal.changeType === 'UPDATE_INFO') {
        await upsertFamilyMember(payload, undefined, treeId);
      } else if (proposal.changeType === 'ADD_CHILD') {
        await upsertFamilyMember(
          payload.member,
          { relativeId: payload.relativeId, type: 'PARENT_OF' },
          treeId
        );
      } else if (proposal.changeType === 'ADD_SPOUSE') {
        await upsertFamilyMember(
          payload.member,
          {
            relativeId: payload.relativeId,
            type: 'SPOUSE_OF',
            marriageOrder: payload.marriageOrder,
          },
          treeId
        );
      }

      await prisma.editProposal.update({
        where: { id: proposalId },
        data: {
          status: ProposalStatus.APPROVED,
          reviewerNote: reviewerNote || 'Đã phê duyệt và cập nhật vào phả đồ',
          reviewedAt: new Date(),
        },
      });

      await prisma.auditLog.create({
        data: {
          treeId,
          userId: user.id,
          action: 'APPROVE_PROPOSAL',
          details: { proposalId, changeType: proposal.changeType },
        },
      });
    } else {
      await prisma.editProposal.update({
        where: { id: proposalId },
        data: {
          status: ProposalStatus.REJECTED,
          reviewerNote: reviewerNote || 'Từ chối đề xuất',
          reviewedAt: new Date(),
        },
      });

      await prisma.auditLog.create({
        data: {
          treeId,
          userId: user.id,
          action: 'REJECT_PROPOSAL',
          details: { proposalId, reviewerNote },
        },
      });
    }

    revalidatePath(`/trees/${treeId}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error reviewing proposal:', error);
    return {
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Không thể xử lý đề xuất.' },
    };
  }
}
