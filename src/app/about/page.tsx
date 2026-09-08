import Link from 'next/link';
import { ArrowLeft, BookOpen, Database, Heart, Cpu, Network } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-6 md:p-12 flex flex-col items-center justify-center">
      {/* Container với thiết kế Glassmorphic */}
      <div className="w-full max-w-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700/60 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-300">
        
        {/* Họa tiết màu sắc làm nền mờ phía sau */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-pink-500/10 dark:bg-pink-500/20 blur-3xl" />

        {/* Nút quay lại trang chủ */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Quay về Cây Gia Phả
          </Link>
        </div>

        {/* Tiêu đề chính */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Giới thiệu Hệ thống
            </h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-extrabold mt-0.5">
              Cây Gia Phả Kỹ Thuật Số
            </p>
          </div>
        </div>

        {/* Đoạn mô tả chung */}
        <p className="text-slate-600 dark:text-slate-350 text-base leading-relaxed mb-8">
          Hệ thống quản lý gia phả số được thiết kế nhằm mục đích lưu giữ, trực quan hóa và tôn vinh nguồn cội dòng tộc của bạn. Bằng cách áp dụng các công nghệ hiện đại, chúng tôi mong muốn mang lại trải nghiệm khám phá lịch sử gia đình mượt mà và trực quan nhất.
        </p>

        {/* Grid các tính năng kỹ thuật */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card Neo4j */}
          <div className="p-5 rounded-2xl border border-slate-200/65 dark:border-slate-700/40 bg-slate-50/50 dark:bg-slate-900/30 hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center gap-3 mb-3 text-indigo-500 dark:text-indigo-400">
              <Database className="w-5 h-5" />
              <h3 className="font-bold text-sm">Cơ Sở Dữ Liệu Đồ Thị (Neo4j)</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Mối quan hệ gia tộc được lưu trữ tối ưu dưới dạng các nút (Person) và quan hệ liên kết (PARENT_OF, SPOUSE_OF), giúp truy vấn thế hệ nhanh chóng và chính xác.
            </p>
          </div>

          {/* Card React Flow */}
          <div className="p-5 rounded-2xl border border-slate-200/65 dark:border-slate-700/40 bg-slate-50/50 dark:bg-slate-900/30 hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center gap-3 mb-3 text-pink-500 dark:text-pink-400">
              <Network className="w-5 h-5" />
              <h3 className="font-bold text-sm">Đồ Thị Tương Tác (React Flow)</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Giao diện vẽ phả hệ kéo thả mượt mà, hỗ trợ zoom, tự động sắp xếp vị trí và thêm/sửa thành viên trực quan ngay trên màn hình.
            </p>
          </div>

        </div>

        {/* Footer của Card giới thiệu */}
        <footer className="border-t border-slate-200 dark:border-slate-700/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-450">
            <Cpu className="w-4 h-4 text-purple-500" />
            <span>Phiên bản 1.0.0 • Công nghệ Next.js 16</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
            Phát triển với <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> bởi Gia Tộc
          </div>
        </footer>

      </div>
    </main>
  );
}
