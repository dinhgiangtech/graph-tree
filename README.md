# Cây Gia Phả Kỹ Thuật Số (Digital Family Tree)

Dự án quản lý và hiển thị cây gia phả sử dụng **Next.js**, **React Flow** và cơ sở dữ liệu đồ thị **Neo4j**.

---

## 🛠️ Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
1. **Docker & Docker Compose** (để chạy database Neo4j).
2. **Node.js** (Khuyến nghị phiên bản LTS v18 trở lên).
3. **Yarn** hoặc **NPM** (để quản lý package Node).

---

## 🚀 Các bước khởi chạy dự án (Xem chi tiết tại [docs/setup-guide.md](docs/setup-guide.md))

### Bước 1: Cài đặt Dependencies & Môi trường
```bash
cp .env.example .env.local
yarn install
```

### Bước 2: Khởi chạy CSDL (PostgreSQL & Neo4j)
```bash
docker compose up -d
```

### Bước 3: Khởi tạo Database Schema & Seed Data
```bash
# Đồng bộ bảng PostgreSQL (User, Auth, Trees, ...)
npx prisma db push

# Nạp dữ liệu cây gia phả mẫu vào Neo4j
yarn init:db
```

### Bước 4: Chạy Ứng dụng
```bash
yarn dev
```
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **Neo4j Browser GUI**: [http://localhost:7474](http://localhost:7474) (Username: `neo4j`, Password: `password`)

---

## 🛑 Các lệnh Docker Compose thường dùng

* **Dừng database (vẫn giữ lại dữ liệu gia phả đã lưu):**
  ```bash
  docker compose down
  ```
* **Dừng database và xóa toàn bộ dữ liệu (reset database về ban đầu):**
  ```bash
  docker compose down -v
  ```
* **Xem nhật ký hoạt động (logs) để debug lỗi kết nối:**
  ```bash
  docker compose logs -f
  ```

---

## 💡 Xử lý sự cố thường gặp (Troubleshooting)

1. **Lỗi kết nối: `Neo4jError: ServiceUnavailable`**
   * **Nguyên nhân**: Container Docker của Neo4j chưa khởi động hoàn tất (thường mất 5-10 giây để Neo4j khởi động hoàn toàn trong lần đầu tiên).
   * **Cách xử lý**: Hãy đợi khoảng 10 giây và tải lại trang, hoặc chạy lệnh `docker compose logs` để kiểm tra xem database đã sẵn sàng chưa.

2. **Lỗi không đăng nhập được trên Browser UI:**
   * Hãy chắc chắn rằng bạn đang kết nối tới cổng `7687` (`bolt://localhost:7687`) chứ không phải cổng HTTP `7474`.
# graph-tree
