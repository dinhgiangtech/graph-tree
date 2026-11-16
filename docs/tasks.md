# 📋 Lộ Trình Phát Triển & Danh Sách Công Việc (Tasks Roadmap)

Bộ công việc được chia nhỏ thành các phiên thực hiện độc lập, tuần tự (mỗi task < 100k tokens) nhằm đảm bảo chất lượng code cao nhất:

---

## 🚀 Giai Đoạn 1: Thiết Lập Nền Tảng Đa Dòng Họ (Multi-tenancy & Hybrid DB)

### Task 1.1: Khởi tạo PostgreSQL, Prisma ORM & Neo4j Constraints
- **Mục tiêu**: Thiết lập kết nối PostgreSQL và đồng bộ `prisma/schema.prisma`.
- **Nội dung**:
  - Tạo `schema.prisma` theo thiết kế (User, Tree, TreeMembership, TreeBranch, EditProposal, AuditLog).
  - Tạo singleton client `src/lib/prisma.ts`.
  - Thiết lập index và constraint đa dòng họ trong Neo4j (`p.treeId, p.id`).
- **Kiểm thử**: Chạy migration thành công, kết nối song song PostgreSQL và Neo4j ổn định.

### Task 1.2: Tích hợp Xác thực NextAuth.js (Auth.js v5)
- **Mục tiêu**: Cài đặt và cấu hình hệ thống Đăng nhập / Đăng ký.
- **Nội dung**:
  - Cấu hình NextAuth với PrismaAdapter.
  - Xây dựng trang Đăng nhập (`/login`) và Đăng ký (`/register`) giao diện hiện đại.
  - Middleware bảo vệ các route `/dashboard` và `/trees/...`.
- **Kiểm thử**: Đăng ký tài khoản mới, đăng nhập, bảo vệ route thành công.

---

## 🌿 Giai Đoạn 2: Quản Lý Cây Gia Phả & Bảng Điều Khiển (Tree Dashboard & RBAC)

### Task 2.1: Bảng điều khiển Quản lý Cây (`/dashboard` & Tạo Cây) ✅ *(Đã hoàn thành)*
- **Mục tiêu**: Người dùng có thể xem danh sách các cây của mình và tạo cây gia phả mới.
- **Nội dung**:
  - Viết Server Actions: `getMyTrees()`, `createFamilyTree()`, `getTreeDetails()`.
  - Giao diện `/dashboard`: Card hiển thị các cây gia phả, vai trò (`ADMIN`, `MEMBER`, `EDITOR`), số lượng thành viên, thống kê tổng quan.
  - Modal tạo cây mới (Tên dòng họ, Chi nhánh, Quê quán, Lược sử, Cài đặt bảo mật).
- **Kiểm thử**: Tạo cây mới thành công, tự động cấp quyền `ADMIN` cho người tạo và mở canvas cây `/trees/[treeId]`.

### Task 2.2: Cài Đặt Cây & Phân Quyền Thành Viên (`/trees/[treeId]/settings`) ✅ *(Đã hoàn thành)*
- **Mục tiêu**: Quản trị viên quản lý danh sách thành viên và phân quyền (`ADMIN`, `EDITOR`, `MEMBER`, `VIEWER`).
- **Nội dung**:
  - Viết Server Actions quản lý: `updateTreeSettings()`, `updateTreeMemberRole()`, `inviteTreeMember()`, `removeTreeMember()`, `createBranch()`, `deleteBranch()`, `deleteTree()`.
  - Giao diện phân quyền đa tab: Thông tin chung & bảo mật (Public/Passcode), Quản lý thành viên & đổi vai trò tức thì, Quản lý Chi nhánh, Vùng nguy hiểm (Danger Zone).
  - Bảo vệ quyền quản trị: Chỉ có `ADMIN` mới được truy cập và cấu hình.

---

## 🎨 Giai Đoạn 3: Nâng Cấp Đồ Thị, Lọc Chi/Nhánh & Điều Hướng (Graph Engine)

### Task 3.1: Nâng cấp Thuật toán Layout & Bộ lọc Chi Nhánh (`treeLayout.ts`) ✅ *(Đã hoàn thành)*
- **Mục tiêu**: Hỗ trợ lọc theo Chi/Nhánh, khoảng thế hệ (min-max) và chế độ xem cây con từ 1 cụ tổ (Sub-tree Focus).
- **Nội dung**:
  - Cập nhật kiểu dữ liệu `TreeGraphFilter` (branchId, minGeneration, maxGeneration, rootPersonId).
  - Cập nhật Cypher query đa năng trong `getFamilyTree` hỗ trợ traversal cây con và lọc thế hệ bảo toàn liên kết vợ chồng.
  - Tối ưu thuật toán `calculateTreeLayout` gom nhóm đơn vị gia đình và căn giữa các con dưới Union Dot của cha mẹ.
- **Kiểm thử**: Lọc thử nghiệm trên cây nhiều thế hệ, kiểm tra tốc độ layout mượt mà.

### Task 3.2: Nâng cấp Giao diện Canvas & Thanh Điều Khiển (`FamilyTreeGraph.tsx`) ✅ *(Đã hoàn thành)*
- **Mục tiêu**: Trải nghiệm canvas chuyên nghiệp, đầy đủ công cụ.
- **Nội dung**:
  - Thanh công cụ điều khiển nổi `TreeToolbar.tsx`: Dropdown chọn Chi/Nhánh, Preset chọn khoảng Đời hiển thị, Ô tìm kiếm thành viên nhanh, Nút căn giữa (Fit View), Badge đếm số thành viên / số đời.
  - Tích hợp Zustand store `useTreeStore.ts` đồng bộ trạng thái đồ thị và bộ lọc tức thì.
  - Chế độ tập trung cây con (Subtree Focus Mode) với huy hiệu thoát nhanh.

---

## 👤 Giai Đoạn 4: Hồ Sơ Thành Viên, "Claim Profile" & Duyệt Đề Xuất

### Task 4.1: Nâng cấp Drawer Chi Tiết Thành Viên (`MemberDrawer.tsx`) ✅ *(Đã hoàn thành)*
- **Mục tiêu**: Hiển thị đầy đủ thông tin truyền thống và hiện đại của một thành viên.
- **Nội dung**:
  - Bổ sung các trường phả hệ truyền thống: Tên tự/hiệu (`alias_name`), Tước vị dòng họ (`title`), Tình trạng sinh tử (`is_alive`), Nơi an nghỉ & Tọa độ phần mộ (`resting_place`, `burial_coordinates`), Trạng thái dâu/rể (`in_law`), Thứ tự vợ (`marriage_order`).
  - Nút xem cây con (Subtree Focus) trực tiếp từ hồ sơ thành viên.
  - Form thêm nhanh Bạn đời / Con cái trực quan kèm tự động xác định thế hệ và thứ tự vợ.

### Task 4.2: Quy trình "Claim Profile" & Hàng đợi Đề xuất Chỉnh sửa (Proposals) ✅ *(Đã hoàn thành)*
- **Mục tiêu**: Con cháu có thể nhận diện bản thân và gửi đề xuất cập nhật thông tin.
- **Nội dung**:
  - Nút "Đây là tôi" (Claim Profile) trên Drawer thành viên liên kết tài khoản người dùng với node Person.
  - Server Actions tạo và duyệt đề xuất (`claimProfile`, `submitEditProposal`, `getTreeProposals`, `reviewProposal`).
  - Drawer thông báo / Hàng đợi phê duyệt `ProposalsDrawer.tsx` với badge đếm số lượng đề xuất pending dành riêng cho Admin/Editor trên toolbar.

---

## 📖 Giai Đoạn 5: Các Chế Độ Xem Bổ Trợ & Nhập/Xuất Dữ Liệu

### Task 5.1: Chế độ Danh Bạ Dòng Tộc (`/trees/[treeId]/directory`) ✅ *(Đã hoàn thành)*
- **Mục tiêu**: Bảng danh sách thành viên dễ đọc cho mọi lứa tuổi.
- **Nội dung**:
  - Giao diện Table phân trang, sắp xếp theo Đời, Chi nhánh, Tình trạng còn sống, Tên A-Z, Năm sinh.
  - Tìm kiếm nâng cao và lọc theo ngành/chi, thế hệ, giới tính, huyết thống/dâu rể.
  - Chuyển đổi linh hoạt giữa dạng Bảng chi tiết (Table) và dạng Thẻ lưới (Grid Cards).
  - Xuất bảng danh bạ ra file CSV / Excel chuẩn UTF-8 tiếng Việt.

### Task 5.2: Chế độ Sách Phả Ký Truyền Thống (`/trees/[treeId]/book`) ✅ *(Đã hoàn thành)*
- **Mục tiêu**: Trình bày gia phả dưới dạng sách/tập phả văn bản truyền thống.
- **Nội dung**:
  - Bố cục từng chương theo từng Thế hệ (Đời I -> Đời N) với số La Mã truyền thống.
  - Trình bày tiểu sử, công trạng, chức tước, ngày giỗ, mộ phần, các bạn đời (chính thất, trắc thất) và danh sách hậu duệ.
  - Mục lục nhảy nhanh theo đời (Table of Contents), chuyển đổi phông chữ Cổ điển (Serif) / Hiện đại (Sans).
  - Chế độ In ấn (Print Mode) / Xuất PDF chuẩn layout khổ giấy A4 sạch sẽ.

### Task 5.3: Tính Năng Nhập/Xuất Dữ Liệu (Import Excel & Export PDF/Ảnh) ✅ *(Đã hoàn thành)*
- **Mục tiêu**: Hỗ trợ dòng họ chuyển đổi và nhập liệu hàng loạt dễ dàng.
- **Nội dung**:
  - Server Action `importFamilyTreeData` (`src/app/actions/import.ts`): Nhập hàng loạt thành viên và tự động thiết lập quan hệ `:PARENT_OF`, `:SPOUSE_OF` trong đồ thị Neo4j.
  - Modal `ImportExcelModal.tsx`: Tải file mẫu CSV/Excel chuẩn, tải lên file, xem trước dữ liệu và xác thực trước khi nhập.
  - Tích hợp nút Xuất Excel danh bạ trên `/directory` và In sách PDF trên `/book`.
