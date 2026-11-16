"use client";

import React, { useState, useEffect } from 'react';
import { getTreeAuditLogs } from '@/app/actions/tree';
import {
  History,
  Clock,
  User,
  Sparkles,
  Loader2,
  CheckCircle,
  FileSpreadsheet,
  Edit,
  Trash2,
  UserPlus
} from 'lucide-react';

interface AuditLogsTabProps {
  treeId: string;
}

export default function AuditLogsTab({ treeId }: AuditLogsTabProps) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      try {
        const res = await getTreeAuditLogs(treeId);
        setLogs(res || []);
      } catch (err) {
        console.error('Error fetching logs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, [treeId]);

  const renderActionBadge = (action: string) => {
    switch (action) {
      case 'IMPORT_TREE_DATA':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            <FileSpreadsheet className="w-3 h-3" />
            Nhập dữ liệu Excel
          </span>
        );
      case 'CLAIM_PROFILE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
            <User className="w-3 h-3" />
            Liên kết hồ sơ (Claim)
          </span>
        );
      case 'SUBMIT_PROPOSAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
            <Edit className="w-3 h-3" />
            Gửi đề xuất sửa đổi
          </span>
        );
      case 'APPROVE_PROPOSAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            <CheckCircle className="w-3 h-3" />
            Duyệt đề xuất
          </span>
        );
      case 'UPDATE_ROLE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300">
            <UserPlus className="w-3 h-3" />
            Đổi vai trò
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
            {action}
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-500" />
          Nhật Ký Hoạt Động & Lịch Sử Thay Đổi (Audit Logs)
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Ghi nhận toàn bộ thao tác nhập liệu, phân quyền, claim profile và duyệt đề xuất trên cây gia phả
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
          <p className="text-xs">Đang tải lịch sử hoạt động...</p>
        </div>
      ) : logs.length > 0 ? (
        <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 shrink-0">
                  {log.user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {log.user?.name || log.user?.email || 'Hệ thống'}
                    </span>
                    {renderActionBadge(log.action)}
                  </div>
                  {log.details && (
                    <div className="text-[11px] text-slate-500 font-mono mt-1">
                      {typeof log.details === 'object'
                        ? JSON.stringify(log.details)
                        : String(log.details)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0 self-end sm:self-center">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(log.createdAt).toLocaleString('vi-VN')}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 text-xs">
          Chưa có hoạt động nào được ghi nhận.
        </div>
      )}
    </div>
  );
}
