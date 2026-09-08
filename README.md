# Cây Gia Phả Kỹ Thuật Số (Digital Family Tree)

Dự án quản lý và hiển thị cây gia phả sử dụng **Next.js**, **React Flow** và cơ sở dữ liệu đồ thị **Neo4j**.

---

## 🛠️ Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
1. **Docker & Docker Compose** (để chạy database Neo4j).
2. **Node.js** (Khuyến nghị phiên bản LTS v18 trở lên).
3. **Yarn** hoặc **NPM** (để quản lý package Node).

---

## 🚀 Các bước khởi chạy dự án

### Bước 1: Cấu hình Biến môi trường (Environment Variables)

Đảm bảo bạn đã có file `.env.local` ở thư mục gốc của dự án với các thông số kết nối cơ bản:

```env
# Neo4j Database Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=password
```

---

### Bước 2: Khởi chạy Database Neo4j bằng Docker

Sử dụng Docker Compose để tải và chạy một container Neo4j được cấu hình sẵn (bao gồm cả plugin mở rộng APOC hỗ trợ duyệt cây gia phả):

1. **Khởi động Neo4j ở chế độ chạy ngầm (detach mode):**
   ```bash
   docker compose up -d
   ```

2. **Kiểm tra trạng thái container:**
   ```bash
   docker compose ps
   ```
   *Bạn sẽ thấy container `gia-pha-neo4j` ở trạng thái `running` (hoặc `Up`).*

3. **Truy cập Giao diện Neo4j Browser (tùy chọn):**
   * Mở trình duyệt và truy cập: **[http://localhost:7474](http://localhost:7474)**
   * Kết nối bằng tài khoản đã cấu hình:
     * **Connection URL:** `bolt://localhost:7687`
     * **Username:** `neo4j`
     * **Password:** `password`

---

### Bước 3: Cài đặt thư viện và Khởi chạy Next.js App

Mở một tab terminal mới và thực hiện các lệnh sau tại thư mục gốc của dự án:

1. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   yarn install
   # hoặc sử dụng npm
   npm install
   ```

2. **Khởi chạy máy chủ phát triển (Development Server):**
   ```bash
   yarn dev
   # hoặc sử dụng npm
   npm run dev
   ```

3. **Truy cập ứng dụng:**
   * Mở trình duyệt và truy cập: **[http://localhost:3000](http://localhost:3000)**

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
