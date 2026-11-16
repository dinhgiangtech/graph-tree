# 📐 Quy Chuẩn Mã Nguồn & Cấu Trúc Dự Án (Conventions & Tech Stack)

## 1. Danh Mục Công Nghệ (Tech Stack)

| Thành phần | Công nghệ / Thư viện | Vai trò |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) | Fullstack React framework |
| **Ngôn ngữ** | TypeScript (Strict Mode) | Đảm bảo tính an toàn dữ liệu |
| **Giao diện & Style** | Tailwind CSS + Lucide Icons + Radix UI | Thiết kế giao diện hiện đại, glassmorphism |
| **Graph Visualization** | `@xyflow/react` (React Flow v12) | Render đồ thị phả hệ vô cực mượt mà |
| **Relational DB** | PostgreSQL | Quản lý Auth, Trees, Phân quyền, Proposals, Logs |
| **ORM** | Prisma ORM | Schema migrations & Type-safe database queries |
| **Graph DB** | Neo4j (Cypher Query Language) | Lưu trữ Node phả hệ & Thuật toán huyết thống |
| **Xác thực** | NextAuth.js (Auth.js v5) | Authentication (Email/Pass + Google OAuth) |
| **State Management** | Zustand | Quản lý Client State (Bộ lọc cây, Zoom, Node chọn) |

---

## 2. Cấu Trúc Thư Mục Chuẩn (Project Directory Structure)

```text
gia-pha-app/
├── prisma/
│   ├── schema.prisma              # Schema PostgreSQL
│   └── migrations/                # Lịch sử migration
├── docs/                          # Bộ tài liệu kiến trúc dự án
│   ├── overview.md
│   ├── architecture.md
│   ├── api-contracts.md
│   ├── conventions.md
│   └── tasks.md
├── public/
│   └── uploads/                   # Thư mục chứa avatar và tư liệu tải lên
├── src/
│   ├── app/
│   │   ├── (auth)/                # Nhóm trang Đăng nhập / Đăng ký
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/           # Không gian quản trị cá nhân
│   │   │   ├── dashboard/         # Danh sách cây gia phả của tôi
│   │   │   └── create-tree/       # Tạo cây mới / Import Excel
│   │   ├── trees/[treeId]/        # Màn hình chính của Cây Gia Phả
│   │   │   ├── page.tsx           # Graph View (Mặc định)
│   │   │   ├── directory/         # Directory / Table View (Danh bạ)
│   │   │   ├── book/              # Sách Phả Ký (Chronicle Book View)
│   │   │   └── settings/          # Cài đặt cây & Phân quyền thành viên
│   │   ├── api/                   # API Routes (Uploads, Export Excel/PDF)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── graph/                 # Components liên quan đến React Flow
│   │   │   ├── FamilyTreeGraph.tsx
│   │   │   ├── FamilyMemberNode.tsx
│   │   │   ├── FamilyUnionNode.tsx
│   │   │   └── GraphControls.tsx
│   │   ├── drawer/                # Drawer xem và sửa thông tin thành viên
│   │   │   ├── MemberDrawer.tsx
│   │   │   ├── MemberInfoView.tsx
│   │   │   └── MemberEditForm.tsx
│   │   ├── directory/             # Table view components
│   │   ├── book/                  # Book view components
│   │   └── ui/                    # Reusable UI primitives (Button, Modal, Input, Toast)
│   ├── lib/
│   │   ├── prisma.ts              # Prisma Client singleton
│   │   ├── neo4j.ts               # Neo4j Driver & query helpers
│   │   ├── treeLayout.ts          # Thuật toán tính toán tọa độ đồ thị phả hệ
│   │   ├── kinship.ts             # Thuật toán tính xưng hô họ hàng
│   │   └── excel.ts               # Parser & Exporter Excel
│   ├── store/
│   │   └── useTreeStore.ts        # Zustand Store (Active filters, selected node, view mode)
│   └── types/
│       ├── family.ts              # Type definitions cho Member, Relationship, Graph
│       ├── tree.ts                # Type definitions cho Tree, Role, Permissions
│       └── auth.ts
├── CONTEXT.md                     # Tài liệu tổng kết cho AI Agent
└── package.json
```

---

## 3. Quy Ước Lập Trình & Bảo Mật (Coding & Security Rules)

1. **Multi-tenancy Isolation**: Mọi truy vấn Neo4j và PostgreSQL **bắt buộc phải kèm theo điều kiện `treeId`** và kiểm tra quyền (`TreeMembership`).
2. **Server Actions First**: Ưu tiên sử dụng Server Actions kết hợp với `zod` để validate dữ liệu đầu vào.
3. **No Direct Secret Exposure**: Tuyệt đối không để lộ mật khẩu, mã bí mật, `passcode` hoặc thông tin nhạy cảm của người còn sống trong các API trả về cho khách xem (`VIEWER`/`PUBLIC`).
4. **Clean Component Architecture**: Các custom Node trong React Flow phải giữ logic hiển thị gọn gàng, tách biệt các form chỉnh sửa sang Drawer hoặc Modal.
