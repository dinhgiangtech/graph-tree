import Link from 'next/link';
import { ArrowLeft, User, Calendar, MapPin, Briefcase, Heart, UserPlus, Users2 } from 'lucide-react';
import { getFamilyTree } from '@/app/actions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // Lấy dữ liệu toàn bộ cây gia phả từ Server Action
  const treeData = await getFamilyTree();
  
  // Tìm thành viên tương ứng với ID trên URL
  const member = treeData.members.find(m => m.id === id);

  if (!member) {
    return (
      <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6">
        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md border border-slate-200 dark:border-slate-700">
          <User className="w-16 h-16 mx-auto text-slate-350 dark:text-slate-500 mb-4 animate-bounce" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-150 mb-2">Không tìm thấy thành viên</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Thành viên với mã định danh "{id}" không tồn tại hoặc đã bị xóa.</p>
          <Link href="/" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-500/20">
            Quay về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  // Tìm kiếm những người thân liên quan từ dữ liệu quan hệ (Relationships)
  const spouseRel = treeData.relationships.find(
    r => r.type === 'SPOUSE_OF' && (r.from === id || r.to === id)
  );
  const spouse = spouseRel 
    ? treeData.members.find(m => m.id === (spouseRel.from === id ? spouseRel.to : spouseRel.from))
    : null;

  const parents = treeData.relationships
    .filter(r => r.type === 'PARENT_OF' && r.to === id)
    .map(r => treeData.members.find(m => m.id === r.from))
    .filter((m): m is typeof treeData.members[0] => !!m);

  const children = treeData.relationships
    .filter(r => r.type === 'PARENT_OF' && r.from === id)
    .map(r => treeData.members.find(m => m.id === r.to))
    .filter((m): m is typeof treeData.members[0] => !!m);

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 md:p-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200 dark:border-slate-700/60 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Nút quay lại trang chủ */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Quay về Cây Gia Phả
          </Link>
        </div>

        {/* Thông tin đầu trang của thành viên */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-200 dark:border-slate-750 pb-8 mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg uppercase
            ${member.gender === 'male' ? 'bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-blue-500/20' : 
              member.gender === 'female' ? 'bg-gradient-to-tr from-pink-500 to-rose-500 shadow-pink-500/20' : 
              'bg-gradient-to-tr from-slate-500 to-slate-700 shadow-slate-500/20'}`}
          >
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" />
            ) : (
              member.name.split(' ').pop()?.[0] || 'U'
            )}
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {member.name}
              </h1>
              <span className="inline-flex self-center sm:self-start px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase tracking-wider">
                Thế hệ {member.generation !== undefined ? member.generation + 1 : 'Chưa rõ'}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 font-semibold uppercase tracking-widest">
              Giới tính: {member.gender === 'male' ? 'Nam' : member.gender === 'female' ? 'Nữ' : 'Khác'}
            </p>
          </div>
        </div>

        {/* Bố cục chia 2 cột: Cột trái Thông tin cá nhân, Cột phải Mối quan hệ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Cột Trái & Giữa: Thông tin chi tiết */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-extrabold text-base border-l-4 border-indigo-500 pl-3 uppercase tracking-wider text-slate-900 dark:text-white">
              Thông tin chi tiết
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ngày sinh */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-750/30">
                <Calendar className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ngày sinh</div>
                  <div className="text-sm font-bold mt-0.5">{member.birthDate || 'Chưa cập nhật'}</div>
                </div>
              </div>

              {/* Trạng thái mất (nếu có) */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-750/30">
                <Calendar className="w-5 h-5 text-slate-450 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ngày mất</div>
                  <div className="text-sm font-bold mt-0.5">{member.deathDate || 'Còn sống'}</div>
                </div>
              </div>

              {/* Nơi sinh */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-750/30">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quê quán</div>
                  <div className="text-sm font-bold mt-0.5">{member.birthPlace || 'Chưa cập nhật'}</div>
                </div>
              </div>

              {/* Nghề nghiệp */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-750/30">
                <Briefcase className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nghề nghiệp</div>
                  <div className="text-sm font-bold mt-0.5">{member.job || 'Chưa cập nhật'}</div>
                </div>
              </div>
            </div>

            {/* Tiểu sử */}
            <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-750/30">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Tiểu sử / Ghi chú</div>
              <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed italic">
                "{member.bio || 'Chưa có ghi chú tiểu sử cho thành viên này.'}"
              </p>
            </div>
          </div>

          {/* Cột Phải: Mối quan hệ trực hệ */}
          <div className="space-y-6">
            <h3 className="font-extrabold text-base border-l-4 border-pink-500 pl-3 uppercase tracking-wider text-slate-900 dark:text-white">
              Quan hệ trực hệ
            </h3>

            {/* Vợ/Chồng */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                Vợ / Chồng
              </div>
              {spouse ? (
                <Link 
                  href={`/member/${spouse.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/40 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950/20 text-pink-500 flex items-center justify-center font-bold text-xs">
                    {spouse.name[0]}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{spouse.name}</div>
                </Link>
              ) : (
                <div className="text-xs text-slate-400 italic pl-1">Chưa cập nhật thông tin phối ngẫu</div>
              )}
            </div>

            {/* Cha Mẹ */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5 text-indigo-500" />
                Cha / Mẹ
              </div>
              {parents.length > 0 ? (
                <div className="grid gap-2">
                  {parents.map(parent => (
                    <Link 
                      key={parent.id}
                      href={`/member/${parent.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/40 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/20 text-indigo-500 flex items-center justify-center font-bold text-xs">
                        {parent.name[0]}
                      </div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{parent.name}</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic pl-1">Chưa có thông tin cha mẹ</div>
              )}
            </div>

            {/* Con Cái */}
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5 text-emerald-500" />
                Con cái ({children.length})
              </div>
              {children.length > 0 ? (
                <div className="grid gap-2">
                  {children.map(child => (
                    <Link 
                      key={child.id}
                      href={`/member/${child.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/40 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center font-bold text-xs">
                        {child.name[0]}
                      </div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{child.name}</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic pl-1">Chưa có thông tin con cái</div>
              )}
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
