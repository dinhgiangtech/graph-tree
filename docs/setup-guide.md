# Hướng Dẫn Khởi Tạo và Chạy Dự Án (Setup & Getting Started)

Tài liệu này hướng dẫn chi tiết từng bước để thiết lập môi trường, khởi chạy cơ sở dữ liệu và vận hành ứng dụng **Gia Phả (Family Tree)**.

---

## 1. Yêu Cầu Môi Trường (Prerequisites)

- **Node.js**: Phiên bản `>= 18.18.0` (Khuyến nghị Node 20 LTS).
- **Package Manager**: `yarn` (v1.22+) hoặc `npm`.
- **Docker & Docker Compose**: Dùng để chạy PostgreSQL và Neo4j cục bộ.

---

## 2. Các Bước Cài Đặt (Quick Start)

### Bước 1: Clone dự án và cài đặt dependencies

```bash
cd gia-pha-app
yarn install
```
*(Lưu ý: Lệnh `yarn install` sẽ tự động trigger `prisma generate` nhờ cấu hình `postinstall`).*

---

### Bước 2: Cấu hình biến môi trường

Tạo file `.env` từ file mẫu `.env.example`:

```bash
cp .env.example .env
cp .env.example .env.local
```

> **Lưu ý**: Prisma CLI mặc định đọc từ file `.env`, còn Next.js đọc từ cả `.env` và `.env.local`.

Nội dung file `.env` / `.env.local`:
```env
# 1. PostgreSQL (Lưu Auth, Tree Metadata, Phân quyền RBAC, Đề xuất chỉnh sửa)
DATABASE_URL="postgresql://postgres:password@localhost:5432/gia_pha_db?schema=public"

# 2. Neo4j Graph Database (Lưu Nodes phả hệ & Relationships)
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password

# 3. NextAuth / Session Secret
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-in-production-123456"
```

---

### Bước 3: Khởi động hệ CSDL bằng Docker

Chạy docker compose để khởi động PostgreSQL (cổng `5432`) và Neo4j (cổng `7474`, `7687`):

```bash
docker compose up -d
```

Kiểm tra trạng thái container:
```bash
docker compose ps
```
> Đảm bảo cả hai container `gia-pha-postgres` và `gia-pha-neo4j` đều ở trạng thái `running` (healthy).

---

### Bước 4: Khởi tạo Schema PostgreSQL (Prisma)

Đồng bộ các model (`User`, `Tree`, `TreeMembership`, `EditProposal`, `AuditLog`, ...) vào PostgreSQL:

```bash
npx prisma db push
```

*(Tuỳ chọn) Mở giao diện trực quan Prisma Studio để xem dữ liệu bảng:*
```bash
npx prisma studio
```

---

### Bước 5: Nạp dữ liệu phả hệ mẫu vào Neo4j (Graph DB)

Dự án đã chuẩn bị sẵn các tệp Cypher chứa phả hệ từ Cụ tổ đến các đời và các chi nhánh:

```bash
yarn init:db
```

Script sẽ tự động import các file Cypher trong `database/scripts/`:
- `01_ancestors_d01_d19.cypher`
- `02_branch1_hanoi.cypher`
- `03_branch2_haiduong.cypher`
- `04_branch3_chilang.cypher`
- `05_branch4_taybac.cypher`

*Sau khi import thành công, script sẽ in ra thống kê tổng số Persons, Relationships và phân bố theo từng Đời.*

---

### Bước 6: Khởi chạy ứng dụng (Development Server)

```bash
yarn dev
```

Mở trình duyệt và truy cập:
- **Ứng dụng chính**: [http://localhost:3000](http://localhost:3000)
- **Neo4j Browser GUI**: [http://localhost:7474](http://localhost:7474) (Username: `neo4j`, Password: `password`)

---

## 3. Các Lệnh Thường Dùng (Scripts Cheat Sheet)

| Lệnh | Mô tả |
| :--- | :--- |
| `yarn dev` | Chạy dev server Next.js (Turbopack) trên cổng `3000` |
| `yarn build` | Build bundle ứng dụng cho môi trường production |
| `yarn start` | Chạy server production sau khi build |
| `yarn init:db` | Nạp toàn bộ dữ liệu Cypher vào Neo4j |
| `npx prisma generate` | Tạo lại code TypeScript client cho Prisma |
| `npx prisma db push` | Đẩy thay đổi từ schema sang Postgres DB |
| `npx prisma studio` | Mở UI quản lý dữ liệu PostgreSQL trên trình duyệt |
| `docker compose down` | Dừng và tắt các container database |
| `docker compose down -v` | Xóa container và **xóa toàn bộ volumes dữ liệu** (Dùng khi muốn reset sạch DB) |

---

## 4. Xử Lý Các Lỗi Thường Gặp (Troubleshooting)

### 1. Lỗi `@prisma/client did not initialize yet` hoặc `Cannot find module '.prisma/client/default'`
- **Nguyên nhân**: Prisma Client chưa được sinh ra mã nguồn trong `node_modules`.
- **Cách sửa**:
  ```bash
  npx prisma generate
  rm -rf .next
  yarn dev
  ```

### 2. Lỗi `The table public.User does not exist in the current database` (Mã P2021)
- **Nguyên nhân**: PostgreSQL chưa có bảng dữ liệu.
- **Cách sửa**:
  ```bash
  npx prisma db push
  ```

### 3. Lỗi không kết nối được Neo4j (`ServiceUnavailable` hoặc `Connection refused`)
- **Nguyên nhân**: Container Neo4j chưa khởi động xong hoặc APOC plugin đang được tải.
- **Cách sửa**:
  - Đợi khoảng 15-30 giây để Neo4j khởi động hoàn tất.
  - Xem logs Neo4j: `docker logs -f gia-pha-neo4j`.
  - Đảm bảo cổng `7687` không bị ứng dụng khác chiếm giữ.

### 4. Xung đột cổng `3000` (`Port 3000 is in use`)
- **Cách sửa**: Tắt tiến trình cũ đang chiếm cổng:
  ```bash
  lsof -ti :3000 | xargs kill -9
  ```
