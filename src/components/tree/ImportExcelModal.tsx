"use client";

import React, { useState } from 'react';
import { importFamilyTreeData, ImportMemberRow } from '@/app/actions/import';
import {
  FileSpreadsheet,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  FileText,
  Sparkles,
  Layers
} from 'lucide-react';

interface ImportExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  treeId: string;
  onImportSuccess?: () => void;
}

export default function ImportExcelModal({
  isOpen,
  onClose,
  treeId,
  onImportSuccess,
}: ImportExcelModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [csvText, setCsvText] = useState<string>('');
  const [previewRows, setPreviewRows] = useState<ImportMemberRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen) return null;

  // Download sample CSV template
  const handleDownloadTemplate = () => {
    const headers = [
      'Họ và tên',
      'Giới tính (male/female)',
      'Đời thứ',
      'Tên cha',
      'Tên vợ/chồng',
      'Năm sinh',
      'Năm mất',
      'Tên tự / Hiệu',
      'Tước vị',
      'Nghề nghiệp',
      'Nơi an nghỉ',
      'Tiểu sử'
    ];

    const sampleRows = [
      [
        'Nguyễn Văn Thủy Tổ',
        'male',
        '1',
        '',
        'Trần Thị Đức',
        '1850',
        '1920',
        'Thuần Phác Tiên Sinh',
        'Thủy Tổ Khởi Nghiệp',
        'Nho y',
        'Lăng tổ Nghĩa trang Đồng Chiêm',
        'Người có công khai hoang lập ấp.'
      ],
      [
        'Trần Thị Đức',
        'female',
        '1',
        '',
        'Nguyễn Văn Thủy Tổ',
        '1855',
        '1930',
        'Từ Tâm',
        'Chính thất Thủy Tổ',
        'Nội trợ',
        'Khu mộ tổ',
        'Đức hạnh vẹn toàn.'
      ],
      [
        'Nguyễn Văn Trưởng Chi',
        'male',
        '2',
        'Nguyễn Văn Thủy Tổ',
        'Lê Thị Hiền',
        '1880',
        '1955',
        'Văn Đức',
        'Đại huynh',
        'Đốc học',
        'Nghĩa trang dòng họ',
        'Kế thừa gia phong.'
      ]
    ];

    const csvContent =
      '\uFEFF' + [headers.join(','), ...sampleRows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'mau-nhap-gia-pha-chuan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parse CSV text into row objects
  const parseCsvContent = (content: string) => {
    try {
      const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length <= 1) return [];

      const parsed: ImportMemberRow[] = [];

      for (let i = 1; i < lines.length; i++) {
        // Regex to handle comma separation with quotes
        const match = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        const cols = lines[i]
          .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          .map((c) => c.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));

        if (cols[0]) {
          parsed.push({
            name: cols[0],
            gender: (cols[1]?.toLowerCase().includes('fe') || cols[1]?.toLowerCase().includes('nữ') ? 'female' : 'male') as any,
            generation: parseInt(cols[2], 10) || 1,
            parentName: cols[3] || undefined,
            spouseName: cols[4] || undefined,
            birthDate: cols[5] || undefined,
            deathDate: cols[6] || undefined,
            alias_name: cols[7] || undefined,
            title: cols[8] || undefined,
            job: cols[9] || undefined,
            resting_place: cols[10] || undefined,
            bio: cols[11] || undefined,
          });
        }
      }

      return parsed;
    } catch (err) {
      console.error('Error parsing CSV:', err);
      return [];
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvText(text);
      const rows = parseCsvContent(text);
      setPreviewRows(rows);
    };
    reader.readAsText(uploadedFile);
  };

  const handleImportSubmit = async () => {
    if (previewRows.length === 0) {
      setResultMsg({ text: 'Vui lòng chọn file hoặc nhập dữ liệu hợp lệ.', type: 'error' });
      return;
    }

    setLoading(true);
    setResultMsg(null);

    try {
      const res = await importFamilyTreeData(treeId, previewRows);
      if (res.success) {
        setResultMsg({
          text: `Đã nhập thành công ${res.importedCount} thành viên và tạo ${res.createdRelationshipsCount} liên kết gia phả!`,
          type: 'success',
        });
        if (onImportSuccess) {
          setTimeout(() => {
            onImportSuccess();
            onClose();
          }, 1500);
        }
      } else {
        setResultMsg({
          text: res.error?.message || 'Có lỗi xảy ra khi nhập dữ liệu.',
          type: 'error',
        });
      }
    } catch {
      setResultMsg({ text: 'Lỗi kết nối máy chủ.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 space-y-5 animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Nhập Dữ Liệu Từ Excel / CSV
              </h3>
              <p className="text-xs text-slate-500">
                Thêm hàng loạt thế hệ tiền nhân và con cháu vào phả đồ một cách nhanh chóng
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action / Step 1: Download Template */}
        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Tải file mẫu Excel / CSV chuẩn
            </div>
            <p className="text-emerald-700/80 dark:text-emerald-400/80 text-[11px] mt-0.5">
              File mẫu có sẵn tiêu đề và các dòng dữ liệu mẫu chuẩn UTF-8 tiếng Việt.
            </p>
          </div>
          <button
            onClick={handleDownloadTemplate}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải file mẫu (.csv)</span>
          </button>
        </div>

        {/* Upload Zone */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Chọn file CSV đã điền thông tin:
          </label>
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-indigo-500/60 transition-colors bg-slate-50/50 dark:bg-slate-900/50">
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-file-input"
            />
            <label
              htmlFor="csv-file-input"
              className="cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <Upload className="w-8 h-8 text-indigo-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {file ? file.name : 'Bấm vào đây để tải lên file .csv'}
              </span>
              <span className="text-[11px] text-slate-400">
                Hỗ trợ định dạng CSV phân tách bằng dấu phẩy
              </span>
            </label>
          </div>
        </div>

        {/* Feedback message */}
        {resultMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              resultMsg.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
            }`}
          >
            {resultMsg.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            {resultMsg.text}
          </div>
        )}

        {/* Preview parsed rows */}
        {previewRows.length > 0 && (
          <div className="flex-1 overflow-hidden flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Xem trước ({previewRows.length} thành viên):
              </span>
              <span className="text-slate-400 text-[11px]">Sẵn sàng nhập</span>
            </div>
            <div className="flex-1 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-2xl max-h-40 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {previewRows.map((r, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between gap-2">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {r.name}{' '}
                    <span className="text-[11px] font-normal text-slate-500">
                      ({r.gender === 'female' ? 'Nữ' : 'Nam'} • Đời {r.generation})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {r.parentName ? `Con của: ${r.parentName}` : ''}{' '}
                    {r.spouseName ? `• Vợ/Chồng: ${r.spouseName}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={handleImportSubmit}
            disabled={loading || previewRows.length === 0}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>Tiến Hành Nhập ({previewRows.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
