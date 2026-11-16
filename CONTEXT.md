# 🌟 CONTEXT.MD — TỔNG QUAN DỰ ÁN CÂY GIA PHẢ THƯƠNG MẠI (FAMILY TREE SAAS)

> **Tài liệu hướng dẫn bắt buộc cho mọi AI Agent & Lập trình viên trước khi thao tác trên codebase.**

---

## 1. Bản Chất Dự Án & Mô Hình
- **Tên dự án**: Family Tree SaaS Platform (Nền tảng Quản lý & Kết nối Phả Hệ Dòng Tộc).
- **Mô hình**: **Multi-tenant SaaS** (Phục vụ nhiều dòng họ trên một nền tảng; dữ liệu được cô lập logic theo `treeId`).
- **Kiến trúc Cơ sở dữ liệu Hybrid**:
  - **PostgreSQL (Prisma ORM)**: Quản lý Authentication (NextAuth.js v5), Metadata cây gia phả (`Tree`), Phân quyền dòng họ (`TreeMembership`), Đề xuất sửa đổi (`EditProposal`), và Nhật ký (`AuditLog`).
  - **Neo4j (Cypher Graph Engine)**: Chuyên trách lưu trữ các nút thành viên (`:Person {treeId: ...}`) và quan hệ huyết thống (`[:PARENT_OF]`, `[:MARRIED_TO]`), xử lý thuật toán phân tầng đồ thị và tìm kiếm quan hệ huyết thống.

---

## 2. Tech Stack Cốt Lõi
- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Ngôn ngữ**: TypeScript (Strict Mode)
- **Giao diện**: Tailwind CSS, Lucide Icons, Radix UI
- **Graph Canvas**: `@xyflow/react` (React Flow v12) + Thuật toán tối ưu `treeLayout.ts`
- **ORM & DB**: Prisma ORM + PostgreSQL + Neo4j (`neo4j-driver`)
- **Authentication**: NextAuth.js v5 (Auth.js) 
- **State Management**: Zustand + React Server Actions

---

## 3. Hệ Thống Phân Quyền Dòng Họ (RBAC)
Mỗi người dùng trong một Cây Gia Phả có một trong các vai trò:
- `ADMIN`: Quản trị viên / Tộc trưởng (Toàn quyền quản lý cây, phân quyền, cấu hình riêng tư, duyệt đề xuất).
- `EDITOR`: Người chép sử / Ban liên lạc (Thêm/sửa/xóa trực tiếp thành viên và quan hệ).
- `MEMBER`: Con cháu đã liên kết tài khoản vào 1 node trên cây (*Claim Profile*); tự cập nhật thông tin cá nhân của mình, gửi đề xuất thêm/sửa người thân để Admin duyệt.
- `VIEWER` / `PUBLIC`: Chỉ xem (Có cơ chế ẩn thông tin nhạy cảm của người còn sống).

---

## 4. Ba Chế Độ Xem (3 Core Views)
1. **Interactive Graph View (`/trees/[treeId]`)**: Đồ thị vô cực tương tác, hỗ trợ lọc theo Chi/Nhánh, khoảng thế hệ (min/max), và xem cây con từ 1 cụ tổ (Sub-tree focus).
2. **Directory Table View (`/trees/[treeId]/directory`)**: Danh bạ thành viên dạng bảng có tìm kiếm và phân trang.
3. **Chronicle Book View (`/trees/[treeId]/book`)**: Sách gia phả truyền thống đọc theo từng đời.

---

## 5. Các Quy Chuẩn Code Bắt Buộc (Strict Rules)
1. **Cô lập dữ liệu (Multi-tenancy Isolation)**: Mọi câu lệnh Cypher (Neo4j) và Prisma (PostgreSQL) bắt buộc phải lọc theo `treeId`.
2. **Không tự ý seed dữ liệu cứng**: Dữ liệu bắt đầu sạch, người dùng tạo cây mới hoặc tải lên từ file Excel/CSV.
3. **Đọc tài liệu chi tiết trong thư mục `/docs`**:
   - `docs/overview.md`: Luồng người dùng & mục tiêu nghiệp vụ.
   - `docs/architecture.md`: Schema Prisma chi tiết & Model Neo4j.
   - `docs/api-contracts.md`: Server Actions & API Endpoints.
   - `docs/conventions.md`: Cấu trúc thư mục & Quy ước code.
   - `docs/tasks.md`: Danh sách Task triển khai theo từng giai đoạn.
