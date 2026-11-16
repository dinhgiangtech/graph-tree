"use client";

import React, { useState } from 'react';
import { updateTreeMemberRole, inviteTreeMember, removeTreeMember } from '@/app/actions/tree';
import { TreeRole } from '@prisma/client';
import {
  Users,
  UserPlus,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Eye,
  Loader2,
  CheckCircle2,
  X,
  Mail,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface MemberItem {
  id: string;
  role: TreeRole;
  joinedAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

interface MembersSettingsTabProps {
  treeId: string;
  currentUserId: string;
  members: MemberItem[];
}

export default function MembersSettingsTab({
  treeId,
  currentUserId,
  members: initialMembers,
}: MembersSettingsTabProps) {
  const [members, setMembers] = useState<MemberItem[]>(initialMembers);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TreeRole>(TreeRole.MEMBER);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  async function handleRoleChange(userId: string, newRole: TreeRole) {
    setActionLoading(userId);
    setMessage(null);

    try {
      const res = await updateTreeMemberRole(treeId, userId, newRole);
      if (res.success) {
        setMembers((prev) =>
          prev.map((m) => (m.user.id === userId ? { ...m, role: newRole } : m))
        );
        setMessage({ text: 'Đã cập nhật vai trò thành công!', type: 'success' });
      } else {
        setMessage({ text: res.error?.message || 'Không thể đổi vai trò.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Lỗi kết nối máy chủ.', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  }

  async function handleRemoveMember(userId: string, userName: string) {
    if (!confirm(`Bạn có chắc chắn muốn xóa thành viên "${userName}" khỏi cây gia phả?`)) {
      return;
    }

    setActionLoading(userId);
    setMessage(null);

    try {
      const res = await removeTreeMember(treeId, userId);
      if (res.success) {
        setMembers((prev) => prev.filter((m) => m.user.id !== userId));
        setMessage({ text: 'Đã xóa thành viên khỏi cây.', type: 'success' });
      } else {
        setMessage({ text: res.error?.message || 'Không thể xóa thành viên.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Lỗi kết nối máy chủ.', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await inviteTreeMember(treeId, inviteEmail, inviteRole);
      if (res.success) {
        setMessage({ text: `Đã thêm thành viên "${inviteEmail}" vào cây thành công!`, type: 'success' });
        setIsInviteOpen(false);
        setInviteEmail('');
        // Reload page data by soft trigger or let Next.js revalidate
        window.location.reload();
      } else {
        setMessage({ text: res.error?.message || 'Không thể thêm thành viên.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Lỗi kết nối máy chủ.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-medium flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          )}
          {message.text}
        </div>
      )}

      {/* Header with Invite Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            Thành Viên & Phân Quyền ({members.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản lý quyền hạn chỉnh sửa, xem và cộng tác trong dòng họ
          </p>
        </div>

        <button
          onClick={() => setIsInviteOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Thêm / Mời Thành Viên
        </button>
      </div>

      {/* Members Table / List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {members.map((member) => {
            const isSelf = member.user.id === currentUserId;
            const isActing = actionLoading === member.user.id;

            return (
              <div
                key={member.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
              >
                {/* User Info */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                    {member.user.name?.[0]?.toUpperCase() || member.user.email?.[0]?.toUpperCase() || 'U'}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {member.user.name || 'Người dùng chưa đặt tên'}
                      </span>
                      {isSelf && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                          Bạn
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {member.user.email}
                      </span>
                      <span className="hidden md:flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Tham gia: {new Date(member.joinedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Role Dropdown & Actions */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="relative">
                    <select
                      value={member.role}
                      disabled={isActing}
                      onChange={(e) => handleRoleChange(member.user.id, e.target.value as TreeRole)}
                      className="px-3 py-1.5 pr-8 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                    >
                      <option value={TreeRole.ADMIN}>Tộc trưởng (Admin)</option>
                      <option value={TreeRole.EDITOR}>Biên tập viên (Editor)</option>
                      <option value={TreeRole.MEMBER}>Thành viên (Member)</option>
                      <option value={TreeRole.VIEWER}>Khách xem (Viewer)</option>
                    </select>
                  </div>

                  {!isSelf && (
                    <button
                      onClick={() => handleRemoveMember(member.user.id, member.user.name || member.user.email || '')}
                      disabled={isActing}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer disabled:opacity-50"
                      title="Xóa thành viên khỏi cây"
                    >
                      {isActing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role explanation guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            Tộc trưởng / Admin
          </div>
          <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
            Toàn quyền quản lý cây, phân quyền, cấu hình và xóa cây gia phả.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-900 dark:text-indigo-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
            Biên tập viên / Editor
          </div>
          <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80">
            Có quyền thêm, sửa, xóa các node và quan hệ trực tiếp trên đồ thị.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            Thành viên / Member
          </div>
          <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
            Có thể liên kết profile cá nhân (Claim), tự sửa thông tin và gửi đề xuất.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-500/10 border border-slate-500/20 text-slate-800 dark:text-slate-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            Khách xem / Viewer
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Chỉ có quyền tra cứu và xem đồ thị gia phả nội bộ.
          </p>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-rose-500 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                <h3 className="font-bold text-sm">Thêm Thành Viên Vào Cây</h3>
              </div>
              <button
                onClick={() => setIsInviteOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Tài Khoản Thành Viên <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="nguyenvana@gmail.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Người dùng cần có tài khoản đã đăng ký trong hệ thống với email này.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Vai Trò Trong Cây
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as TreeRole)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={TreeRole.MEMBER}>Thành viên (Member) - Khuyến nghị</option>
                  <option value={TreeRole.EDITOR}>Biên tập viên (Editor) - Nhập liệu</option>
                  <option value={TreeRole.ADMIN}>Tộc trưởng (Admin) - Toàn quyền</option>
                  <option value={TreeRole.VIEWER}>Khách xem (Viewer)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    'Xác Nhận Thêm'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
