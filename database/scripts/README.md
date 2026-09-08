# Hướng Dẫn Chạy Scripts Khởi Tạo Cơ Sở Dữ Liệu Gia Phả (Neo4j)

Thư mục này chứa các file Cypher đã được tách module rõ ràng theo phả hệ dòng họ:

## Danh sách Files:
1. **`01_ancestors_d01_d19.cypher`** (Đời 1 -> Đời 19: Cội nguồn cội tổ chung)
   - Reset dữ liệu cũ & tạo index/constraints.
   - Trực hệ từ Khởi tổ Thủy Tổ Đinh Thỉnh, Danh thần Lam Sơn Đinh Lễ, Đinh Liệt (Đời 3), các đời tại Thanh Hóa, Thái Bình (Ỷ Đốn, Chi Lăng).
   - Đời 14 (3 Phái) -> Đời 18 (Cụ Đinh Danh Côn & 2 cụ bà) -> Đời 19 (Cụ Đinh Danh Khương & Cụ Đinh Danh Dương).
2. **`02_branch1_hanoi.cypher`** (Chi 1: Cụ Đinh Danh Khì -> Hà Nội)
   - Đời 20 (Cụ Đinh Danh Khì) -> Đời 24 (Đinh Thị Lan Phương & Lê Minh Tuệ).
3. **`03_branch2_haiduong.cypher`** (Chi 2: Cụ Đinh Danh Bách -> Hải Dương)
   - Đời 20 (Cụ Đinh Danh Bách, Đinh Thị Hợp, Đinh Danh Dục) -> Đời 25 (Đinh Gia Long, Đinh Anh Quang, Đinh Anh Minh, Đinh Anh Phúc, Đinh Bảo Nhi, Đinh Bảo Hân).
4. **`04_branch3_chilang.cypher`** (Chi 3: Cụ Đinh Danh Giảng -> Thái Bình)
   - Đời 20 (Cụ Đinh Danh Giảng) -> Đời 25 (Đinh Thu Hà, Đinh Phúc Nguyên, Đinh Tấn Đạt, Đinh Phúc Hưng, Đinh Minh Khôi, Đinh Danh Tuấn,...).
5. **`05_branch4_taybac.cypher`** (Chi 4: Cụ Đinh Danh Liệu -> Điện Biên, Lai Châu)
   - Đời 20 (Cụ Đinh Danh Liệu) -> Đời 25 (Đinh Đức Anh, Đinh Ngân Hà, Đinh Danh Phúc, Đinh Gia Thăng, Đinh Thị Thảo, Đinh Thị Tâm, Đinh Danh Nghĩa, Đinh Danh Quân).

---

## Cách thực thi (Thứ tự bắt buộc):
Chạy tuần tự từ file `01` đến `05` qua **Neo4j Browser** hoặc bằng **cypher-shell**:

```bash
# Sử dụng cypher-shell nếu có CLI:
cypher-shell -u neo4j -p <mat_khau> -f 01_ancestors_d01_d19.cypher
cypher-shell -u neo4j -p <mat_khau> -f 02_branch1_hanoi.cypher
cypher-shell -u neo4j -p <mat_khau> -f 03_branch2_haiduong.cypher
cypher-shell -u neo4j -p <mat_khau> -f 04_branch3_chilang.cypher
cypher-shell -u neo4j -p <mat_khau> -f 05_branch4_taybac.cypher
```
