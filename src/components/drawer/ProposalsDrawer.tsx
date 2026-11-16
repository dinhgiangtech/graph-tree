"use client";

import React, { useState } from 'react';
import { reviewProposal } from '@/app/actions/proposal';
import { ProposalStatus } from '@prisma/client';
import {
  Bell,
  X,
  CheckCircle,
  XCircle,
  Clock,
  User,
  GitCommit,
  Loader2,
  AlertCircle,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export interface ProposalItem {
  id: string;
  treeId: string;
  userId: string;
  targetId: string | null;
  changeType: string;
  payloadJson: any;
  status: ProposalStatus;
  reviewerNote: string | null;
  reviewedAt: Date | null;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

interface ProposalsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  proposals: ProposalItem[];
  treeId: string;
  onProposalReviewed?: () => void;
}

export function ProposalsDrawer({
  isOpen,
  onClose,
  proposals: initialProposals,
  treeId,
  onProposalReviewed,
}: ProposalsDrawerProps) {
  const [proposals, setProposals] = useState<ProposalItem[]>(initialProposals);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen) return null;

  const pendingList = proposals.filter((p) => p.status === 'PENDING');
  const historyList = proposals.filter((p) => p.status !== 'PENDING');

  const handleReview = async (proposalId: string, decision: 'APPROVED' | 'REJECTED') => {
    setActionLoading(proposalId);
    setFeedbackMsg(null);

    const note = noteInputs[proposalId] || '';

    try {
      const res = await reviewProposal(treeId, proposalId, decision, note);
      if (res.success) {
        setProposals((prev) =>
          prev.map((p) =>
            p.id === proposalId
              ? {
                  ...p,
                  status: decision === 'APPROVED' ? ProposalStatus.APPROVED : ProposalStatus.REJECTED,
                  reviewerNote: note || (decision === 'APPROVED' ? 'Đã duyệt' : 'Đã từ chối'),
                  reviewedAt: new Date(),
                }
              : p
          )
        );

        setFeedbackMsg({
          text: decision === 'APPROVED' ? 'Đã phê duyệt và cập nhật đồ thị thành công!' : 'Đã từ chối đề xuất.',
          type: 'success',
        });

        if (onProposalReviewed) {
          onProposalReviewed();
        }
      } else {
        setFeedbackMsg({ text: res.error?.message || 'Có lỗi xảy ra.', type: 'error' });
      }
    } catch {
      setFeedbackMsg({ text: 'Lỗi kết nối máy chủ.', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  const renderChangeTypeBadge = (type: string) => {
    switch (type) {
      case 'UPDATE_INFO':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            Cập nhật thông tin
          </span>
        );
      case 'ADD_CHILD':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            Thêm con cái
          </span>
        );
      case 'ADD_SPOUSE':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300">
            Thêm bạn đời
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
            {type}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-indigo-600 to-rose-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-base">Hàng Đợi Phê Duyệt</h3>
            <p className="text-xs text-indigo-100">Dành riêng cho Quản trị viên & Biên tập viên</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 p-2 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Chờ Duyệt ({pendingList.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Lịch Sử ({historyList.length})
        </button>
      </div>

      {feedbackMsg && (
        <div
          className={`m-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
          }`}
        >
          {feedbackMsg.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          )}
          {feedbackMsg.text}
        </div>
      )}

      {/* List content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'pending' && (
          <>
            {pendingList.length > 0 ? (
              pendingList.map((item) => {
                const isActing = actionLoading === item.id;
                const payload = item.payloadJson || {};

                return (
                  <div
                    key={item.id}
                    className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 text-white font-bold text-xs flex items-center justify-center">
                          {item.user.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white">
                            {item.user.name || item.user.email}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.createdAt).toLocaleString('vi-VN')}
                          </div>
                        </div>
                      </div>
                      {renderChangeTypeBadge(item.changeType)}
                    </div>

                    {/* Payload Details */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl text-xs space-y-1 font-mono text-slate-700 dark:text-slate-300 overflow-x-auto border border-slate-100 dark:border-slate-800">
                      {item.changeType === 'UPDATE_INFO' && (
                        <div>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">Tên:</span> {payload.name}
                          {payload.alias_name && <div><span className="font-bold">Tự/Hiệu:</span> {payload.alias_name}</div>}
                          {payload.birthDate && <div><span className="font-bold">Sinh:</span> {payload.birthDate}</div>}
                          {payload.job && <div><span className="font-bold">Nghề:</span> {payload.job}</div>}
                        </div>
                      )}
                      {(item.changeType === 'ADD_CHILD' || item.changeType === 'ADD_SPOUSE') && (
                        <div>
                          <div className="font-bold text-emerald-600 dark:text-emerald-400">Thành viên mới:</div>
                          <div><span className="font-bold">Họ tên:</span> {payload.member?.name}</div>
                          <div><span className="font-bold">Giới tính:</span> {payload.member?.gender === 'female' ? 'Nữ' : 'Nam'}</div>
                          {payload.member?.birthDate && <div><span className="font-bold">Năm sinh:</span> {payload.member?.birthDate}</div>}
                        </div>
                      )}
                    </div>

                    {/* Note Input */}
                    <input
                      type="text"
                      placeholder="Ghi chú phản hồi (tùy chọn)..."
                      value={noteInputs[item.id] || ''}
                      onChange={(e) =>
                        setNoteInputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleReview(item.id, 'REJECTED')}
                        disabled={isActing}
                        className="flex-1 py-2 px-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-700 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Từ Chối
                      </button>
                      <button
                        onClick={() => handleReview(item.id, 'APPROVED')}
                        disabled={isActing}
                        className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {isActing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                        Phê Duyệt
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-500/50 mx-auto" />
                <p className="text-sm font-semibold">Không có đề xuất nào đang chờ duyệt</p>
                <p className="text-xs">Mọi thay đổi từ thành viên đã được xử lý xong.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <>
            {historyList.length > 0 ? (
              historyList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{item.user.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                      }`}
                    >
                      {item.status === 'APPROVED' ? 'Đã duyệt' : 'Đã từ chối'}
                    </span>
                  </div>
                  {item.reviewerNote && (
                    <p className="text-slate-500 italic bg-slate-50 dark:bg-slate-900/30 p-2 rounded-lg">
                      Ghi chú: {item.reviewerNote}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-slate-400 text-xs">
                Chưa có lịch sử đề xuất nào.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProposalsDrawer;
