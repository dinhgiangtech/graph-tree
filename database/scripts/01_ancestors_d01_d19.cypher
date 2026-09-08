// ==============================================================================
// PHẦN 1: CỘI NGUỒN CỘI TỔ CHUNG (ĐỜI 1 -> ĐỜI 19)
// Tộc phả Họ Đinh (gốc Lam Sơn, Thanh Hóa -> Đô Kỳ - Y Đốn, Chi Lăng, Thái Bình)
// ==============================================================================
// 1. DỌN DẸP DỮ LIỆU CŨ & TẠO RÀNG BUỘC (CONSTRAINTS / INDEXES)
MATCH (n)
DETACH DELETE n;

CREATE CONSTRAINT unique_person_id IF NOT EXISTS
FOR (p:Person)
REQUIRE p.id IS UNIQUE;

CREATE INDEX person_name_idx IF NOT EXISTS
FOR (p:Person)
ON (p.full_name);

// ==============================================================================
// 2. KHỞI TỔ ĐẾN THỜI KỲ KHỞI NGHĨA LAM SƠN (ĐỜI 1 -> ĐỜI 3)
// ==============================================================================

// --- ĐỜI 1 ---
CREATE
  (d01_thinh:Person
    {
      id: "P_D01",
      full_name: "Đinh Thỉnh",
      gender: "MALE",
      generation: 1,
      is_alive: false,
      title: "Thủy Tổ, Mục Huệ Đại Vương",
      hometown:
        "Sách Thúy Cối (Mỹ Lâm), huyện Lương Giang (Thọ Xuân), Thanh Hóa",
      biography:
        "Sinh ra và lớn lên ở Thanh Hóa. Cuối thời Trần dạy học ở Đô Kỳ (Thái Bình). Cùng con trai Đinh Tôn Nhân vào Lam Sơn theo giúp Lê Lợi khởi nghĩa chống quân Minh. Từng ứng nghĩa dưới cờ vua Trần Trùng Quang (Trần Quý Khoáng), được phong Thái Úy, Phò Mã. Khởi nghĩa thắng lợi được triều đình truy phong Mục Huệ Đại Vương.",
      note: "Thủy tổ của dòng họ."
    })
CREATE
  (d01_gai:Person
    {
      id: "P_D01_W",
      full_name: "Phạm Thị Gái",
      gender: "FEMALE",
      in_law: true,
      generation: 1,
      is_alive: false,
      title: "Khởi Tổ Mẫu",
      hometown: "Làng Sang, xã Quỳnh Châu, huyện Quỳnh Phụ, Thái Bình",
      biography:
        "Con gái cụ góa phụ họ Sang ở làng Sang. Mẹ mất khi đi cấy ở gò Bà Sang (mối xông). Bà được ông chủ họ Phạm nhận nuôi dưỡng rồi gả cho cụ Đinh Thỉnh.",
      note:
        "Gốc tích cội nguồn họ ngoại gắn liền với di tích Gò Bà Sang (thôn Đa Phú, xã Tây Đô)."
    })
CREATE (d01_thinh)-[:MARRIED_TO {marriage_order: 1}]->(d01_gai)

// --- ĐỜI 2 ---
CREATE
  (d02_nhan:Person
    {
      id: "P_D02",
      full_name: "Đinh Tôn Nhân",
      gender: "MALE",
      generation: 2,
      is_alive: false,
      title: "Thái úy Hùng Quốc Công, Phò mã",
      hometown: "Sách Mỹ Lâm, huyện Thọ Xuân, Thanh Hóa",
      biography:
        "Theo cha giúp Lê Lợi chuẩn bị và lãnh đạo khởi nghĩa Lam Sơn. Được Hào trưởng Lê Khoáng và Lê Lợi yêu mến gả con gái (chị gái Lê Lợi). Cùng 3 con trai dự Hội thề Lũng Nhai (1416) và lễ tế cờ Lam Sơn (1418). Được truy tặng Thái úy Hùng Quốc Công.",
      note: "Cao tổ dòng họ vùng đất Đô Kỳ - Ỷ Đún."
    })
CREATE
  (d02_voi:Person
    {
      id: "P_D02_W",
      full_name: "Lê Thị Ngọc Või",
      gender: "FEMALE",
      in_law: true,
      generation: 2,
      is_alive: false,
      title: "Quốc Phu Nhân",
      hometown: "Làng Lam Sơn, huyện Thọ Xuân, Thanh Hóa",
      biography:
        "Chị gái ruột Vua Lê Lợi, con gái Hào trưởng Lê Khoáng ở Lam Sơn. Được phong tặng Quốc Phu Nhân.",
      note:
        "Thân mẫu của ba vị Khai quốc công thần Đinh Lễ, Đinh Bồ, Đinh Liệt."
    })
CREATE (d01_thinh)-[:FATHER_OF]->(d02_nhan)
CREATE (d01_gai)-[:MOTHER_OF]->(d02_nhan)
CREATE (d02_nhan)-[:MARRIED_TO {marriage_order: 1}]->(d02_voi)

// --- ĐỜI 3: BA ANH EM KHAI QUỐC CÔNG THẦN ---
// 1. Nhánh cụ Đinh Lễ (dòng trưởng)
CREATE
  (d03_le:Person
    {
      id: "P_D03_LE",
      full_name: "Đinh Lễ",
      alias_name: "Đinh Ngợi, Lê Lễ",
      gender: "MALE",
      generation: 3,
      is_alive: false,
      title: "Đại Tư đồ, Thái sư Bân Quốc Công, Hiển Khánh Đại Vương",
      lunar_death_day: "13/01",
      hometown: "Sách Mỹ Lâm, huyện Thọ Xuân, Thanh Hóa",
      biography:
        "Cháu gọi Lê Lợi bằng cậu ruột, ban quốc tính họ Lê. Dự thề Lũng Nhai, lập công đầu trong các trận Lạc Thủy, Ninh Kiều, Tốt Động, Chúc Động. Giữ chức Tư Không. Bị giặc bắt tại trận Tây Phù Liệt (1427) và sát hại vì kiên quyết không chịu hàng. Sắc phong Phúc Thần nhiều nơi.",
      note:
        "Giỗ 13 tháng Giêng (Đại Việt Thông Sử chép hy sinh ngày 8/3 Đinh Mùi 1427)."
    })
CREATE
  (d03_le_w:Person
    {
      id: "P_D03_LE_W",
      full_name: "Bùi Thị Liễu",
      gender: "FEMALE",
      in_law: true,
      generation: 3,
      is_alive: false,
      title: "Tông Cơ (Quận Chúa)",
      lunar_death_day: "18/09",
      hometown: "Xã Cống Khê, huyện Chương Đức",
      biography:
        "Con gái quan Thái Truyền Trang Quốc Công họ Bùi. Sau khi cụ Đinh Lễ mất được phong tước Tông Cơ.",
      note: "Giỗ ngày 18 tháng 9 Âm lịch."
    })

// 2. Nhánh cụ Đinh Bồ (dòng thứ 2)
CREATE
  (d03_bo:Person
    {
      id: "P_D03_BO",
      full_name: "Đinh Bồ",
      alias_name: "Đinh Huyến, Lê Bồ",
      gender: "MALE",
      generation: 3,
      is_alive: false,
      title: "Định Quốc Công, Linh Cảm (Uy Dũng) Đại Vương",
      lunar_death_day: "16/01",
      hometown: "Sách Mỹ Lâm, huyện Thọ Xuân, Thanh Hóa",
      biography:
        "Tham gia thề Lũng Nhai, lập nhiều chiến công tại Lạc Thủy, Mường Thôi, Trà Lân, Bồ Ải. Hy sinh tại trận đánh Khả Lưu (Anh Sơn, Nghệ An) do giẫm phải chông độc. Phong tặng Định Quốc Công, Linh Cảm Đại Vương.",
      note: "Giỗ ngày 16 tháng Giêng Âm lịch."
    })
CREATE
  (d03_bo_w:Person
    {
      id: "P_D03_BO_W",
      full_name: "Lê Thị Ngọc Thuận",
      gender: "FEMALE",
      in_law: true,
      generation: 3,
      is_alive: false,
      lunar_death_day: "16/03",
      hometown: "Thôn Đóa Tú, làng Lam Sơn, Thọ Xuân, Thanh Hóa",
      biography: "Con gái Thái Úy Trung Quốc Công Lê Lâm ở làng Lam Sơn.",
      note: "Giỗ ngày 16 tháng 3 Âm lịch."
    })

// 3. Nhánh cụ Đinh Liệt (dòng thứ 3 - trực hệ truyền về Chi Lăng)
CREATE
  (d03_liet:Person
    {
      id: "P_D03",
      full_name: "Đinh Liệt",
      alias_name: "Đinh Rí, Đinh Liễu, Lê Liệt",
      gender: "MALE",
      generation: 3,
      is_alive: false,
      title:
        "Khai quốc nguyên huân, Thái sư Lân Quốc Công, Trung Mục Đại Vương",
      lunar_death_day: "13/12",
      hometown: "Sách Mỹ Lâm, huyện Thọ Xuân, Thanh Hóa",
      biography:
        "Chỉ huy chém Liễu Thăng ở núi Mã Yên (Chi Lăng). Phò tá 4 triều vua Lê, là Tể tướng chấp chính 10 năm. Đưa bà Ngô Thị Ngọc Giao về Ỷ Đốn lánh nạn và sinh hạ vua Lê Thánh Tông. Cùng Nguyễn Xí dẹp quyền thần, đưa Lê Thánh Tông lên ngôi. Thượng Đẳng Phúc Thần.",
      note: "Thờ tại Từ đường Chi Lăng, Sáo Đền, Lam Sơn. Giỗ 13 tháng Chạp."
    })
CREATE
  (d03_phu:Person
    {
      id: "P_D03_W",
      full_name: "Đào Thị Ngọc Phú",
      gender: "FEMALE",
      in_law: true,
      generation: 3,
      is_alive: false,
      lunar_death_day: "13/12",
      hometown: "Xã Thạch Nội, huyện Ngọc Sơn, Thanh Hóa",
      biography:
        "Từng bị Thái hậu Nguyễn Thị Anh giam cầm gần 6 năm dưới hầm sâu cùng con cái do kẻ gian vu cáo. Kiên trinh giữ vẹn tiết tháo.",
      note: "Có tài liệu chép bà họ Ngô, làng Động Bàng, Yên Định, Thanh Hóa."
    })

CREATE (d02_nhan)-[:FATHER_OF]->(d03_le)
CREATE (d02_nhan)-[:FATHER_OF]->(d03_bo)
CREATE (d02_nhan)-[:FATHER_OF]->(d03_liet)
CREATE (d02_voi)-[:MOTHER_OF]->(d03_le)
CREATE (d02_voi)-[:MOTHER_OF]->(d03_bo)
CREATE (d02_voi)-[:MOTHER_OF]->(d03_liet)
CREATE (d03_le)-[:MARRIED_TO {marriage_order: 1}]->(d03_le_w)
CREATE (d03_bo)-[:MARRIED_TO {marriage_order: 1}]->(d03_bo_w)
CREATE (d03_liet)-[:MARRIED_TO {marriage_order: 1}]->(d03_phu)

// Con cháu cụ Đinh Lễ (Đời 4)
CREATE
  (d04_trung:Person
    {
      id: "P_D04_TRUNG",
      full_name: "Đinh Trung",
      title: "Tước Hầu",
      gender: "MALE",
      generation: 4,
      is_alive: false,
      hometown: "Mỹ Lâm, Thanh Hóa"
    })
CREATE
  (d04_hue:Person
    {
      id: "P_D04_HUE",
      full_name: "Đinh Huệ",
      title: "Tước Hầu",
      gender: "MALE",
      generation: 4,
      is_alive: false,
      hometown: "Mỹ Lâm, Thanh Hóa"
    })
CREATE
  (d04_thai:Person
    {
      id: "P_D04_THAI",
      full_name: "Đinh Vĩnh Thái",
      title: "Trung Nghĩa Hầu (giữ 100 mẫu ruộng tại Sáo Đền)",
      gender: "MALE",
      generation: 4,
      is_alive: false,
      hometown: "Mỹ Lâm, Thanh Hóa"
    })
CREATE
  (d04_ke:Person
    {
      id: "P_D04_KE",
      full_name: "Đinh Thị Ngọc Kế",
      gender: "FEMALE",
      generation: 4,
      is_alive: false,
      title: "Càn Bà Vương",
      hometown: "Sách Mỹ Lâm, Thọ Xuân, Thanh Hóa",
      biography:
        "Con gái ruột cụ Đinh Lễ, được chú ruột Đinh Liệt nhận làm con nuôi. Lấy Thái úy Ngô Từ, sinh ra Hoàng Thái Hậu Ngô Thị Ngọc Giao (thân mẫu vua Lê Thánh Tông).",
      note:
        "Hưởng ruộng lộc điền tại trang An Lão (Song An, Vũ Thư, Thái Bình)."
    })
CREATE
  (ngo_tu:Person
    {
      id: "P_D04_KE_H",
      full_name: "Ngô Từ",
      gender: "MALE",
      in_law: true,
      generation: 4,
      is_alive: false,
      title: "Thái úy Diêm Dụ Vương",
      hometown: "Thôn Động Bàng, huyện Yên Định, Thanh Hóa",
      biography:
        "Khai quốc công thần, thân phụ của Hoàng Thái Hậu Ngô Thị Ngọc Giao.",
      note: "Nhạc phụ dòng họ Đinh."
    })
CREATE (d03_le)-[:FATHER_OF]->(d04_trung)
CREATE (d03_le)-[:FATHER_OF]->(d04_hue)
CREATE (d03_le)-[:FATHER_OF]->(d04_thai)
CREATE (d03_le)-[:FATHER_OF]->(d04_ke)
CREATE (d03_le_w)-[:MOTHER_OF]->(d04_ke)
CREATE (d03_liet)-[:ADOPTED_BY]->(d04_ke)
CREATE (ngo_tu)-[:MARRIED_TO {marriage_order: 1}]->(d04_ke)

// Con cụ Đinh Bồ (Đời 4)
CREATE
  (d04_ban:Person
    {
      id: "P_D04_BAN",
      full_name: "Đinh Thị Ngọc Ban",
      gender: "FEMALE",
      generation: 4,
      is_alive: false,
      hometown: "Sách Mỹ Lâm, Thanh Hóa",
      note:
        "Đền thờ tại làng Đông Cao, xã Trung Chính, huyện Nông Cống, Thanh Hóa."
    })
CREATE (d03_bo)-[:FATHER_OF]->(d04_ban)
CREATE (d03_bo_w)-[:MOTHER_OF]->(d04_ban)

// ==============================================================================
// 3. TRIỀU LÊ - TRỊNH ĐẾN TỔ CHUNG 3 PHÁI (ĐỜI 4 -> ĐỜI 14)
// ==============================================================================

// --- ĐỜI 4 (Con cụ Đinh Liệt) ---
CREATE
  (d04_mai:Person
    {
      id: "P_D04_MAI",
      full_name: "Đinh Thị Ngọc Mại",
      gender: "FEMALE",
      generation: 4,
      is_alive: false,
      hometown: "Sách Mỹ Lâm, Thanh Hóa"
    })
CREATE
  (d04_dot:Person
    {
      id: "P_D04",
      full_name: "Đinh Công Đột",
      alias_name: "Đinh Quý",
      gender: "MALE",
      generation: 4,
      is_alive: false,
      title: "Thượng thư Bộ Binh, Văn Thắng Hầu",
      lunar_death_day: "17/05",
      hometown: "Sách Mỹ Lâm, Thọ Xuân, Thanh Hóa",
      biography:
        "Làm quan triều vua Lê Thái Tông, Nhân Tông, Thánh Tông. Giữ chức Thị Lang rồi Thượng Thư Bộ Binh, Tả Tông Nhân. Thiên cư từ Mỹ Lâm ra thôn Đống Cải (Nông Cống, Thanh Hóa).",
      note: "Giỗ ngày 17 tháng 5 Âm lịch."
    })
CREATE
  (d04_duong:Person
    {
      id: "P_D04_W",
      full_name: "Lê Thị Ngọc Đường",
      gender: "FEMALE",
      in_law: true,
      generation: 4,
      is_alive: false,
      title: "Công Chúa triều Lê",
      lunar_death_day: "03/04",
      hometown: "Hoàng tộc triều Hậu Lê, Lam Sơn / Thăng Long",
      biography:
        "Công chúa con gái vua triều Hậu Lê, kết duyên cùng Thượng thư Đinh Công Đột.",
      note: "Giỗ ngày 3 tháng 4 Âm lịch."
    })
CREATE
  (d04_hien:Person
    {
      id: "P_D04_HIEN",
      full_name: "Đinh Công Hiến",
      gender: "MALE",
      generation: 4,
      is_alive: false,
      title: "Trần Tứ Sương Đô Chỉ Huy Sứ, Triệu Xương Bá",
      lunar_death_day: "11/01",
      hometown: "Sách Mỹ Lâm, Thọ Xuân, Thanh Hóa",
      biography:
        "Làm quan triều Lê Thái Tông, Nhân Tông, Thánh Tông; từng theo vua đi dẹp Bồn Man, Chiêm Thành. Hàng quan Thượng phẩm, Thiếu Bảo.",
      note: "Giỗ ngày 11 tháng Giêng Âm lịch."
    })
CREATE
  (d04_hien_w:Person
    {
      id: "P_D04_HIEN_W",
      full_name: "Bà họ Vũ",
      gender: "FEMALE",
      in_law: true,
      generation: 4,
      is_alive: false,
      lunar_death_day: "03/03",
      hometown: "Mỹ Lâm, Thanh Hóa"
    })

CREATE (d03_liet)-[:FATHER_OF]->(d04_mai)
CREATE (d03_liet)-[:FATHER_OF]->(d04_dot)
CREATE (d03_liet)-[:FATHER_OF]->(d04_hien)
CREATE (d03_phu)-[:MOTHER_OF]->(d04_mai)
CREATE (d03_phu)-[:MOTHER_OF]->(d04_dot)
CREATE (d03_phu)-[:MOTHER_OF]->(d04_hien)
CREATE (d04_dot)-[:MARRIED_TO {marriage_order: 1}]->(d04_duong)
CREATE (d04_hien)-[:MARRIED_TO {marriage_order: 1}]->(d04_hien_w)

// Các con cụ Đinh Công Hiến (Đời 5)
CREATE
  (d05_thuc:Person
    {
      id: "P_D05_THUC",
      full_name: "Đinh Nhân Thực",
      title: "Lễ Toàn Hầu",
      gender: "MALE",
      generation: 5,
      is_alive: false,
      hometown: "Thanh Hóa"
    })
CREATE
  (d05_bieu:Person
    {
      id: "P_D05_BIEU",
      full_name: "Đinh Thế Biểu",
      title: "Sùng Thiện Hầu (giữ 27 mẫu ruộng cúng tế tại Đô Kỳ)",
      gender: "MALE",
      generation: 5,
      is_alive: false,
      hometown: "Đô Kỳ, Thái Bình"
    })
CREATE (d04_hien)-[:FATHER_OF]->(d05_thuc)
CREATE (d04_hien)-[:FATHER_OF]->(d05_bieu)

// Các con cụ Đinh Công Đột (Đời 5)
CREATE
  (d05_dich:Person
    {
      id: "P_D05_DICH",
      full_name: "Đinh Công Địch",
      gender: "MALE",
      generation: 5,
      is_alive: false,
      hometown: "Thôn Đông Cao, Nông Cống, Thanh Hóa"
    })
CREATE
  (d05_minh:Person
    {
      id: "P_D05",
      full_name: "Đinh Công Minh",
      alias_name: "Đinh Viêm",
      gender: "MALE",
      generation: 5,
      is_alive: false,
      title: "Thượng thư Bộ Công, Lương Nghĩa Hầu",
      lunar_death_day: "18/03",
      hometown: "Thôn Đông Cao, Nông Cống, Thanh Hóa",
      biography:
        "Làm quan triều vua Lê Thánh Tông, Lê Hiến Tông. Giữ chức Tả Thị Lang rồi thăng Thượng Thư Bộ Công, phong tước Lương Nghĩa Hầu.",
      note: "Giỗ ngày 18 tháng 3 Âm lịch."
    })
CREATE
  (d05_mai:Person
    {
      id: "P_D05_W",
      full_name: "Lê Thị Ngọc Mại",
      gender: "FEMALE",
      in_law: true,
      generation: 5,
      is_alive: false,
      lunar_death_day: "17/02",
      hometown: "Làng Lam Sơn, Thọ Xuân, Thanh Hóa",
      note: "Giỗ ngày 17 tháng 2 Âm lịch."
    })
CREATE
  (d05_loc:Person
    {
      id: "P_D05_LOC",
      full_name: "Đinh Tiến Lộc",
      title: "Triêu Dương Hầu",
      gender: "MALE",
      generation: 5,
      is_alive: false,
      hometown: "Thanh Hóa"
    })
CREATE
  (d05_thuan_k:Person
    {
      id: "P_D05_THUAN_K",
      full_name: "Đinh Khắc Thuận",
      title: "Mỹ Lâm Hầu",
      gender: "MALE",
      generation: 5,
      is_alive: false,
      hometown: "Thanh Hóa"
    })

CREATE (d04_dot)-[:FATHER_OF]->(d05_dich)
CREATE (d04_dot)-[:FATHER_OF]->(d05_minh)
CREATE (d04_dot)-[:FATHER_OF]->(d05_loc)
CREATE (d04_dot)-[:FATHER_OF]->(d05_thuan_k)
CREATE (d04_duong)-[:MOTHER_OF]->(d05_minh)
CREATE (d05_minh)-[:MARRIED_TO {marriage_order: 1}]->(d05_mai)

// --- ĐỜI 6 & 7 ---
CREATE
  (d06_huu:Person
    {
      id: "P_D06",
      full_name: "Đinh Công Hữu",
      title: "Đô Tổng Binh Đồng Tri",
      gender: "MALE",
      generation: 6,
      is_alive: false,
      hometown: "Thanh Hóa",
      biography: "Giữ chức Đô Tổng Binh Đồng Tri trong quân đội triều Hậu Lê."
    })
CREATE
  (d06_thanh:Person
    {
      id: "P_D06_THANH",
      full_name: "Đinh Công Thành",
      title: "Đô Chỉ Huy Sứ Ty",
      gender: "MALE",
      generation: 6,
      is_alive: false,
      hometown: "Thanh Hóa"
    })
CREATE (d05_minh)-[:FATHER_OF]->(d06_huu)
CREATE (d05_minh)-[:FATHER_OF]->(d06_thanh)
CREATE (d05_mai)-[:MOTHER_OF]->(d06_huu)
CREATE (d05_mai)-[:MOTHER_OF]->(d06_thanh)

CREATE
  (d07_van:Person
    {
      id: "P_D07",
      full_name: "Đinh Phúc Vận",
      gender: "MALE",
      generation: 7,
      is_alive: false,
      title: "Thái Tế, Nam Quận Công",
      lunar_death_day: "06/08",
      hometown: "Làng Hò, xã Hoành Mỹ (nay xã Thống Nhất, Hưng Hà, Thái Bình)",
      biography:
        "Làm quan triều vua Lê Anh Tông, Lê Thế Tông và Chúa Trịnh Tùng. Có công đánh Chiêm Thành, tiễu trừ nhà Mạc thu phục Kinh sư. Được xếp vào hàng Trung hưng Công thần, ban Kim bài thẻ vàng, vinh phong Minh Nghĩa Kiệt Tiết Công Thần, văn võ đều Nhất phẩm. Đóng quân bảo vệ lũy Việt Yên (Hưng Hà).",
      note: "Giỗ ngày 6 tháng 8 Âm lịch."
    })
CREATE (d06_huu)-[:FATHER_OF]->(d07_van)

// --- ĐỜI 8 ---
CREATE
  (d08_can:Person
    {
      id: "P_D08",
      full_name: "Đinh Thừa Cận",
      gender: "MALE",
      generation: 8,
      is_alive: false,
      title: "Thái Tổ, Thúy Quận Công",
      lunar_death_day: "16/07",
      hometown: "Làng Hò, xã Hoành Mỹ (Thống Nhất, Hưng Hà, Thái Bình)",
      biography:
        "Làm quan triều Lê Anh Tông, Thế Tông và Chúa Trịnh Tùng. Theo cha đánh dẹp nhà Mạc lập nhiều công lớn, giữ chức Thái Tổ, tặng phong Dương Vũ Uy Dũng Tán Trị Công Thần, tước Thúy Quận Công.",
      note: "Giỗ ngày 16 tháng 7 Âm lịch."
    })
CREATE
  (d08_phu:Person
    {
      id: "P_D08_W",
      full_name: "Trịnh Thị Ngọc Phụ",
      gender: "FEMALE",
      in_law: true,
      generation: 8,
      is_alive: false,
      title: "Quận Phu Nhân",
      lunar_death_day: "09/10",
      hometown: "Làng Thủy Chú, huyện Lôi Dương (Thọ Xuân, Thanh Hóa)",
      biography: "Con gái quan Thái Úy Liệt Quốc Công Trịnh Khả.",
      note: "Giỗ ngày 9 tháng 10 Âm lịch."
    })
CREATE (d07_van)-[:FATHER_OF]->(d08_can)
CREATE (d08_can)-[:MARRIED_TO {marriage_order: 1}]->(d08_phu)

// --- ĐỜI 9 (Khởi lập Từ đường Y Đốn) ---
CREATE
  (d09_dien:Person
    {
      id: "P_D09",
      full_name: "Đinh Phúc Diên",
      gender: "MALE",
      generation: 9,
      is_alive: false,
      title:
        "Thiếu úy Tả Đô đốc Đông quân, Dương Quận Công (Khởi tổ dòng họ tại Chi Lăng)",
      lunar_death_day: "06/08",
      hometown:
        "Làng Đún Ngoại (Ngoại Thôn), xã Ỷ Đốn (nay là xã Chi Lăng, Hưng Hà, Thái Bình)",
      biography:
        "Phò tá các vua Lê Minh Tông, Thần Tông và Chúa Trịnh Tùng, Trịnh Tráng. Lập căn cứ tại Cẩm Giàng đánh Mạc, được thưởng Kim bài chữ vàng. Năm 1627 cắm đất dựng Từ đường họ Đinh tại làng Đún Ngoại và đặt 2 khu cấm địa Đường Vuông làm lăng mộ công thần. Triều Nguyễn phong tặng Trung Hưng Tôn Thần, Phúc thần làng Ỷ Đốn.",
      note: "Khởi tổ dòng họ Đinh xã Chi Lăng. Giỗ ngày 6 tháng 8 Âm lịch."
    })
CREATE
  (d09_quanChua:Person
    {
      id: "P_D09_W",
      full_name: "Bà Quận Chúa",
      gender: "FEMALE",
      in_law: true,
      generation: 9,
      is_alive: false,
      lunar_death_day: "15/10",
      hometown: "Hoàng tộc triều Hậu Lê",
      note: "Giỗ ngày 15 tháng 10 Âm lịch."
    })
CREATE
  (d09_nghi:Person
    {
      id: "P_D09_NGHI",
      full_name: "Đinh Phúc Nghị",
      gender: "MALE",
      generation: 9,
      is_alive: false,
      hometown: "Hàm Giang, Cẩm Giàng, Hải Dương",
      note: "Ra lập nghiệp ở Hàm Giang, Cẩm Giàng, Hải Dương."
    })
CREATE (d08_can)-[:FATHER_OF]->(d09_dien)
CREATE (d08_can)-[:FATHER_OF]->(d09_nghi)
CREATE (d08_phu)-[:MOTHER_OF]->(d09_dien)
CREATE (d08_phu)-[:MOTHER_OF]->(d09_nghi)
CREATE (d09_dien)-[:MARRIED_TO {marriage_order: 1}]->(d09_quanChua)

// --- ĐỜI 10 & 11 ---
CREATE
  (d10_tien:Person
    {
      id: "P_D10",
      full_name: "Đinh Phúc Tiến",
      gender: "MALE",
      generation: 10,
      is_alive: false,
      title: "Chánh Đội Trưởng, Tiền Cai Quản, Khuông Cầu Hầu",
      hometown: "Làng Đún Ngoại, xã Ỷ Đốn, Thái Bình",
      biography:
        "Làm quan triều vua Lê Thần Tông và Chúa Trịnh Tạc, đóng quân ở Hàm Giang, huyện Cẩm Giàng, Hải Dương.",
      note: "Lấy vợ người Cẩm Giàng, Hải Dương."
    })
CREATE
  (d10_w:Person
    {
      id: "P_D10_W",
      full_name: "Bà Dâu cụ Tiến",
      gender: "FEMALE",
      in_law: true,
      generation: 10,
      is_alive: false,
      hometown: "Huyện Cẩm Giàng, Hải Dương"
    })
CREATE (d09_dien)-[:FATHER_OF]->(d10_tien)
CREATE (d09_quanChua)-[:MOTHER_OF]->(d10_tien)
CREATE (d10_tien)-[:MARRIED_TO {marriage_order: 1}]->(d10_w)

CREATE
  (d11_tuyen:Person
    {
      id: "P_D11_TUYEN",
      full_name: "Đinh Phúc Tuyển",
      title: "Toản Vũ Hầu",
      gender: "MALE",
      generation: 11,
      is_alive: false,
      hometown: "Làng Đún Ngoại, xã Ỷ Đốn, Thái Bình"
    })
CREATE
  (d11_dat:Person
    {
      id: "P_D11_DAT",
      full_name: "Đinh Phúc Đạt",
      title: "Chánh Đội Trưởng, Phan Lộc Hầu",
      gender: "MALE",
      generation: 11,
      is_alive: false,
      hometown: "Làng Đún Ngoại, xã Ỷ Đốn, Thái Bình",
      biography:
        "Làm quan triều vua Lê Hy Tông, Dụ Tông và Chúa Trịnh Căn, Trịnh Cương."
    })
CREATE
  (d11_lien:Person
    {
      id: "P_D11",
      full_name: "Đinh Phúc Liên",
      gender: "MALE",
      generation: 11,
      is_alive: false,
      title: "Trí An Hầu",
      hometown: "Làng Đún Ngoại, xã Ỷ Đốn, Thái Bình",
      biography:
        "Làm quan triều vua Lê Dụ Tông, Chúa Trịnh Căn, Trịnh Cương. Có công dẹp Mạc, được phong Trí An Hầu. Là người đứng ra tu sửa Từ đường họ Đinh làng Đún.",
      note: "Định cư lâu dài tại Ỷ Đốn."
    })
CREATE (d10_tien)-[:FATHER_OF]->(d11_tuyen)
CREATE (d10_tien)-[:FATHER_OF]->(d11_dat)
CREATE (d10_tien)-[:FATHER_OF]->(d11_lien)
CREATE (d10_w)-[:MOTHER_OF]->(d11_lien)

// --- ĐỜI 12 & 13 ---
CREATE
  (d12_canh:Person
    {
      id: "P_D12_CANH",
      full_name: "Đinh Cảnh",
      gender: "MALE",
      generation: 12,
      is_alive: false,
      hometown: "Làng Đún Ngoại, xã Ỷ Đốn",
      note:
        "Vợ quê ở Thanh Hóa, sinh được 3 con trai: Nhân Chiêu, Công Triều, Công Cao."
    })
CREATE
  (d12_sam:Person
    {
      id: "P_D12",
      full_name: "Đinh Sâm",
      gender: "MALE",
      generation: 12,
      is_alive: false,
      hometown: "Làng Đún Ngoại, xã Ỷ Đốn, Thái Bình"
    })
CREATE
  (d12_ho:Person
    {
      id: "P_D12_HO",
      full_name: "Đinh Phúc Hồ",
      gender: "MALE",
      generation: 12,
      is_alive: false,
      hometown: "Làng Đún Ngoại, xã Ỷ Đốn",
      note: "Vợ người Ỷ Đún, sinh được 2 con trai: Phúc Vịnh, Phúc Hy."
    })
CREATE (d11_lien)-[:FATHER_OF]->(d12_canh)
CREATE (d11_lien)-[:FATHER_OF]->(d12_sam)
CREATE (d11_lien)-[:FATHER_OF]->(d12_ho)

CREATE
  (d13_tin:Person
    {
      id: "P_D13",
      full_name: "Đinh Phúc Tín",
      gender: "MALE",
      generation: 13,
      is_alive: false,
      title: "Định cư tại Ngoại Thôn",
      hometown: "Làng Đún Ngoại, xã Ỷ Đốn (Chi Lăng, Hưng Hà, Thái Bình)",
      biography:
        "Con cháu định cư tại Ngoại Thôn (làng Đún Ngoại), hình thành nên chi phái họ Đinh tại Chi Lăng, Minh Tân, Lô Giang.",
      note: "Thân phụ của cụ Đinh Nhân Hậu."
    })
CREATE (d12_sam)-[:FATHER_OF]->(d13_tin)

// --- ĐỜI 14 (TỔ CHUNG 3 PHÁI) ---
CREATE
  (d14_hau:Person
    {
      id: "P_D14",
      full_name: "Đinh Nhân Hậu",
      gender: "MALE",
      generation: 14,
      is_alive: false,
      title: "Tổ chung 3 Phái Họ Đinh Chi Lăng",
      hometown: "Làng Đún Ngoại, xã Ỷ Đốn (Chi Lăng, Hưng Hà, Thái Bình)",
      biography:
        "Ông Tổ chung của 3 Phái dòng họ Đinh xã Chi Lăng (Hưng Hà), Minh Tân và Lô Giang (Đông Hưng). Sinh 3 người con trai lập nên 3 Phái lớn.",
      note: "Gốc tích cội nguồn phân nhánh 3 Phái từ đời con cụ."
    })
CREATE (d13_tin)-[:FATHER_OF]->(d14_hau)

// ==============================================================================
// 4. PHÂN CHIA 3 PHÁI VÀ TRUYỀN THỪA PHÁI 3 (ĐỜI 15 -> ĐỜI 17)
// ==============================================================================

// --- PHÁI 1 (Khởi tổ: Cụ Đinh Thuần) ---
CREATE
  (d15_thuan:Person
    {
      id: "P_D15_THUAN",
      full_name: "Đinh Thuần",
      alias_name: "Đinh Phúc Thuần",
      gender: "MALE",
      generation: 15,
      is_alive: false,
      title: "Khởi tổ Phái 1, Huyện Thừa Nam Chân",
      hometown:
        "Thôn Quyết Thắng & Thống Nhất, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Năm 1748 phụng lệnh vua Lê làm bản kê khai tộc phả và công tích tổ tiên nộp Quốc Sử Quán, nhờ đó sử gia Lê Quý Đôn đưa vào Đại Việt Thông Sử.",
      note:
        "Con cháu chủ yếu ở quanh Từ đường Chi Lăng và 1 nhánh ở TP Chí Linh."
    })
CREATE
  (d16_mien_p1:Person
    {
      id: "P_D16_MIEN_P1",
      full_name: "Đinh Miên",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (d16_hy_p1:Person
    {
      id: "P_D16_HY_P1",
      full_name: "Đinh Hy",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (d16_khang_p1:Person
    {
      id: "P_D16_KHANG_P1",
      full_name: "Đinh Khang",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE (d14_hau)-[:FATHER_OF]->(d15_thuan)
CREATE (d15_thuan)-[:FATHER_OF]->(d16_mien_p1)
CREATE (d15_thuan)-[:FATHER_OF]->(d16_hy_p1)
CREATE (d15_thuan)-[:FATHER_OF]->(d16_khang_p1)

// --- PHÁI 2 (Khởi tổ: Cụ Đinh Thời) ---
CREATE
  (d15_thoi:Person
    {
      id: "P_D15_THOI",
      full_name: "Đinh Thời",
      alias_name: "Đinh Phúc Thời",
      gender: "MALE",
      generation: 15,
      is_alive: false,
      title: "Khởi tổ Phái 2",
      hometown: "Xã Minh Tân và xã Lô Giang, huyện Đông Hưng, Thái Bình",
      biography:
        "Khởi tổ Phái thứ 2, sinh được 4 con trai: Khiêm, Phán, Phạn, Tháo.",
      note:
        "Con cháu phát triển thành các chi họ Đinh tại Minh Tân và Lô Giang."
    })
CREATE
  (d16_khiem_p2:Person
    {
      id: "P_D16_KHIEM_P2",
      full_name: "Đinh Khiêm",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      hometown: "Minh Tân, Đông Hưng"
    })
CREATE
  (d16_phan_p2:Person
    {
      id: "P_D16_PHAN_P2",
      full_name: "Đinh Phán",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      hometown: "Minh Tân, Đông Hưng"
    })
CREATE
  (d16_phan2_p2:Person
    {
      id: "P_D16_PHAN2_P2",
      full_name: "Đinh Phạn",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      hometown: "Minh Tân, Đông Hưng"
    })
CREATE
  (d16_thao_p2:Person
    {
      id: "P_D16_THAO_P2",
      full_name: "Đinh Tháo",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      hometown: "Minh Tân, Đông Hưng"
    })
CREATE (d14_hau)-[:FATHER_OF]->(d15_thoi)
CREATE (d15_thoi)-[:FATHER_OF]->(d16_khiem_p2)
CREATE (d15_thoi)-[:FATHER_OF]->(d16_phan_p2)
CREATE (d15_thoi)-[:FATHER_OF]->(d16_phan2_p2)
CREATE (d15_thoi)-[:FATHER_OF]->(d16_thao_p2)

// --- PHÁI 3 (Khởi tổ: Cụ Đinh Nghiêm - Trực hệ) ---
CREATE
  (d15_nghiem:Person
    {
      id: "P_D15_NGHIEM",
      full_name: "Đinh Nghiêm",
      alias_name: "Đinh Phúc Nghiêm",
      gender: "MALE",
      generation: 15,
      is_alive: false,
      title: "Khởi tổ Phái 3",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography: "Khởi tổ Phái thứ 3, sinh 4 con trai: Khôi, Do, Cương, Thiện.",
      note:
        "Con cháu phần lớn ở thôn Trần Phú, Chi Lăng và các chi di cư Hà Nội, Hải Dương, Tây Bắc."
    })
CREATE
  (d16_khoi:Person
    {
      id: "P_D16",
      full_name: "Đinh Khôi",
      alias_name: "Đinh Phúc Cần",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      title: "Tự Phúc Cần (Tổ Phái 3 Đời 16)",
      lunar_death_day: "27/03",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tổ Phái 3 đời thứ 16, duy trì dòng dõi trực hệ tại quê nhà Chi Lăng.",
      note: "Giỗ ngày 27 tháng 3 Âm lịch."
    })
CREATE
  (d16_khoi_w:Person
    {
      id: "P_D16_W",
      full_name: "Bà hiệu Từ Ý",
      gender: "FEMALE",
      in_law: true,
      generation: 16,
      is_alive: false,
      lunar_death_day: "26/02",
      hometown: "Duyên Tục (làng Tuộc), huyện Đông Hưng, Thái Bình",
      note: "Giỗ ngày 26 tháng 2 Âm lịch."
    })
CREATE
  (d16_do:Person
    {
      id: "P_D16_DO",
      full_name: "Đinh Do",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      title: "Phó Chánh Đội Trưởng Phủ Chúa (1783)",
      hometown: "Xã Ỷ Đốn, huyện Thần Khê (Chi Lăng, Hưng Hà, Thái Bình)",
      biography:
        "Năm 1783 được chúa Đoan Nam Vương Trịnh Khải triệu vào làm việc trong Phủ Chúa nhận chức Phó Chánh Đội Trưởng do công tích tổ tiên.",
      note:
        "Thời Tây Sơn - Nguyễn biến động, con cháu phân tán không chép lại được."
    })
CREATE
  (d16_cuong:Person
    {
      id: "P_D16_CUONG",
      full_name: "Đinh Cương",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (d16_thien:Person
    {
      id: "P_D16_THIEN",
      full_name: "Đinh Thiện",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà"
    })

CREATE (d14_hau)-[:FATHER_OF]->(d15_nghiem)
CREATE (d15_nghiem)-[:FATHER_OF]->(d16_khoi)
CREATE (d15_nghiem)-[:FATHER_OF]->(d16_do)
CREATE (d15_nghiem)-[:FATHER_OF]->(d16_cuong)
CREATE (d15_nghiem)-[:FATHER_OF]->(d16_thien)
CREATE (d16_khoi)-[:MARRIED_TO {marriage_order: 1}]->(d16_khoi_w)

// --- ĐỜI 17: CỤ ĐINH PHÚC LUẬT ---
CREATE
  (d17_luat:Person
    {
      id: "P_D17",
      full_name: "Đinh Phúc Luật",
      gender: "MALE",
      generation: 17,
      is_alive: false,
      title: "Tổ Phái 3 Đời 17",
      lunar_death_day: "23/01",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tổ chung sinh ra 3 Ngành của Phái 3 (Ngành 1 Đinh Phúc Trực, Ngành 2 Đinh Danh Già, Ngành 3 Đinh Danh Côn). Phần lớn con cháu ở xóm Giếng Rế, thôn Trần Phú, Chi Lăng.",
      note: "Giỗ ngày 23 tháng Giêng Âm lịch."
    })
CREATE
  (d17_hien:Person
    {
      id: "P_D17_W",
      full_name: "Nguyễn Thị (Diệu Hiện)",
      gender: "FEMALE",
      in_law: true,
      generation: 17,
      is_alive: false,
      lunar_death_day: "21/11",
      hometown: "Xã Ỷ Đốn, huyện Thần Khê (Chi Lăng, Hưng Hà, Thái Bình)",
      note: "Giỗ ngày 21 tháng 11 Âm lịch."
    })
CREATE (d16_khoi)-[:FATHER_OF]->(d17_luat)
CREATE (d16_khoi_w)-[:MOTHER_OF]->(d17_luat)
CREATE (d17_luat)-[:MARRIED_TO {marriage_order: 1}]->(d17_hien)

// ==============================================================================
// 5. PHÂN CHIA 3 NGÀNH & ĐA THÊ (ĐỜI 18 -> ĐỜI 19)
// ==============================================================================

// --- ĐỜI 18 (3 NGÀNH) ---
// 1. Ngành 1 (Trưởng)
CREATE
  (d18_truc:Person
    {
      id: "P_D18_TRUC",
      full_name: "Đinh Phúc Trực",
      gender: "MALE",
      generation: 18,
      is_alive: false,
      title: "Khởi tổ Ngành 1",
      lunar_death_day: "04/02",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      note: "Giỗ ngày 4 tháng 2 Âm lịch."
    })
CREATE
  (d18_truc_w:Person
    {
      id: "P_D18_TRUC_W",
      full_name: "Bà hiệu Từ Tinh",
      gender: "FEMALE",
      in_law: true,
      generation: 18,
      is_alive: false,
      lunar_death_day: "11/07",
      hometown: "Xã Ỷ Đốn, Thái Bình",
      note: "Họ Nguyễn, giỗ ngày 11 tháng 7 Âm lịch."
    })
CREATE (d17_luat)-[:FATHER_OF]->(d18_truc)
CREATE (d18_truc)-[:MARRIED_TO {marriage_order: 1}]->(d18_truc_w)

// 2. Ngành 2
CREATE
  (d18_gia:Person
    {
      id: "P_D18_GIA",
      full_name: "Đinh Danh Già",
      gender: "MALE",
      generation: 18,
      is_alive: false,
      has_heir: false,
      title: "Ông Cai Già (Ngành 2)",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      note:
        "Sinh 1 con trai là Đinh Danh Thịnh, sau đó ngành này tuyệt tự không còn người nối dõi."
    })
CREATE (d17_luat)-[:FATHER_OF]->(d18_gia)

// 3. Ngành 3 (Khởi tổ 4 Chi)
CREATE
  (d18_con:Person
    {
      id: "P_D18_CON",
      full_name: "Đinh Danh Côn",
      alias_name: "Phúc Trung",
      gender: "MALE",
      generation: 18,
      is_alive: false,
      title: "Hữu Kiên Cơ Ngũ Trưởng (Khởi tổ Ngành 3)",
      lunar_death_day: "16/03",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Tuất. Giữ chức Hữu Kiên Cơ Ngũ Trưởng ở dinh Tổng đốc Hải Dương. Giỏi võ nghệ, từng dũng cảm đánh bắt cướp bảo vệ xóm làng, được nhân dân trong vùng mến phục.",
      note: "Giỗ ngày 16 tháng 3 Âm lịch. Khởi tổ Ngành 3 sinh ra 4 Chi lớn."
    })
CREATE
  (d18_baCa:Person
    {
      id: "P_D18_W1",
      full_name: "Bà Cả họ Nguyễn (hiệu Diệu Mẫu)",
      gender: "FEMALE",
      in_law: true,
      generation: 18,
      is_alive: false,
      lunar_death_day: "04/03",
      hometown: "Xã Ỷ Đốn, huyện Thần Khê (Chi Lăng, Hưng Hà, Thái Bình)",
      biography:
        "Tuổi Dần. Chính thất, sinh được 3 con trai và 1 con gái (Khương, Cán, Cổn, Biển).",
      note: "Giỗ ngày 4 tháng 3 Âm lịch."
    })
CREATE
  (d18_baHai:Person
    {
      id: "P_D18_W2",
      full_name: "Bà Hai họ Nguyễn (hiệu Từ Thuận)",
      gender: "FEMALE",
      in_law: true,
      generation: 18,
      is_alive: false,
      hometown: "Xã Ỷ Đốn, huyện Thần Khê (Chi Lăng, Hưng Hà, Thái Bình)",
      biography:
        "Thứ thất, sinh được 1 con trai là cụ Đinh Danh Dương (khởi tổ Chi 4).",
      note: "Không rõ phần mộ và ngày giỗ trong tộc phả."
    })

CREATE (d17_luat)-[:FATHER_OF]->(d18_con)
CREATE (d17_hien)-[:MOTHER_OF]->(d18_con)
CREATE
  (d18_con)-[:MARRIED_TO {marriage_order: 1, title: "Chính thất (Bà Cả)"}]->
  (d18_baCa)
CREATE
  (d18_con)-[:MARRIED_TO {marriage_order: 2, title: "Thứ thất (Bà Hai)"}]->
  (d18_baHai)

// --- ĐỜI 19 ---
// Con Cụ Trực (Ngành 1)
CREATE
  (d19_thuy_n1:Person
    {
      id: "P_D19_THUY_N1",
      full_name: "Đinh Danh Thùy",
      gender: "MALE",
      generation: 19,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (d19_thien_n1:Person
    {
      id: "P_D19_THIEN_N1",
      full_name: "Đinh Danh Thiện",
      gender: "MALE",
      generation: 19,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (d19_hin_n1:Person
    {
      id: "P_D19_HIN_N1",
      full_name: "Đinh Danh Hin",
      gender: "MALE",
      generation: 19,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE (d18_truc)-[:FATHER_OF]->(d19_thuy_n1)
CREATE (d18_truc)-[:FATHER_OF]->(d19_thien_n1)
CREATE (d18_truc)-[:FATHER_OF]->(d19_hin_n1)

// Con Cụ Già (Ngành 2)
CREATE
  (d19_thinh_n2:Person
    {
      id: "P_D19_THINH_N2",
      full_name: "Đinh Danh Thịnh",
      gender: "MALE",
      generation: 19,
      is_alive: false,
      has_heir: false,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE (d18_gia)-[:FATHER_OF]->(d19_thinh_n2)

// Con Cụ Côn (Ngành 3) - Phân thành 4 Chi lớn
// 1. Nhánh Bà Cả: Khởi đầu Chi 1, Chi 2, Chi 3
CREATE
  (d19_khuong:Person
    {
      id: "P_D19_KHUONG",
      full_name: "Đinh Danh Khương",
      alias_name: "Phúc Bình",
      gender: "MALE",
      generation: 19,
      is_alive: false,
      title: "Xã Sử (Khởi tổ Chi 1, Chi 2, Chi 3)",
      lunar_death_day: "08/03",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Tuất. Làm quan chức Xã Sử trong làng, tính tình thanh liêm, nhà nghèo. Mất vì bệnh tả vào tháng 5 năm Quý Mão (1903).",
      note:
        "Giỗ ngày 8 tháng 3 Âm lịch. Thân phụ sinh ra khởi tổ 3 chi lớn: Khì (Chi 1), Bách (Chi 2), Giảng (Chi 3)."
    })
CREATE
  (d19_may:Person
    {
      id: "P_D19_KHUONG_W",
      full_name: "Nguyễn Thị Mây",
      title: "Hiệu Diệu Hòa",
      gender: "FEMALE",
      in_law: true,
      generation: 19,
      is_alive: false,
      lunar_death_day: "24/01",
      hometown: "Xã Ỷ Đốn, Thái Bình",
      biography:
        "Tuổi Sửu. Sinh được 5 con trai, 1 con gái (Khì, Bách, Hợp, Dục, Giảng, Đích).",
      note: "Giỗ ngày 24 tháng Giêng Âm lịch."
    })
CREATE
  (d19_can:Person
    {
      id: "P_D19_CAN",
      full_name: "Đinh Danh Cán",
      gender: "MALE",
      generation: 19,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d19_con_n:Person
    {
      id: "P_D19_CON_N",
      full_name: "Đinh Danh Cổn",
      gender: "MALE",
      generation: 19,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d19_bien:Person
    {
      id: "P_D19_BIEN",
      full_name: "Đinh Thị Biển",
      gender: "FEMALE",
      generation: 19,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })

CREATE (d18_con)-[:FATHER_OF]->(d19_khuong)
CREATE (d18_con)-[:FATHER_OF]->(d19_can)
CREATE (d18_con)-[:FATHER_OF]->(d19_con_n)
CREATE (d18_con)-[:FATHER_OF]->(d19_bien)
CREATE (d18_baCa)-[:MOTHER_OF]->(d19_khuong)
CREATE (d18_baCa)-[:MOTHER_OF]->(d19_can)
CREATE (d18_baCa)-[:MOTHER_OF]->(d19_con_n)
CREATE (d18_baCa)-[:MOTHER_OF]->(d19_bien)
CREATE (d19_khuong)-[:MARRIED_TO {marriage_order: 1}]->(d19_may)

// 2. Nhánh Bà Hai: Khởi đầu Chi 4 (Tây Bắc)
CREATE
  (d19_duong:Person
    {
      id: "P_D19_DUONG",
      full_name: "Đinh Danh Dương",
      gender: "MALE",
      generation: 19,
      is_alive: false,
      title: "Khởi tổ Chi 4 (Tây Bắc)",
      lunar_death_day: "21/11",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Con trai bà thứ Từ Thuận. Sinh được 3 con trai: Nghịch (mất nhỏ), Nịnh, Liệu. Là nhánh phát triển lên Tây Bắc (Điện Biên, Lai Châu).",
      note: "Giỗ ngày 21 tháng 11 Âm lịch."
    })
CREATE
  (d19_duong_w:Person
    {
      id: "P_D19_DUONG_W",
      full_name: "Bà Dâu cụ Dương",
      gender: "FEMALE",
      in_law: true,
      generation: 19,
      is_alive: false,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE (d18_con)-[:FATHER_OF]->(d19_duong)
CREATE (d18_baHai)-[:MOTHER_OF]->(d19_duong)
CREATE (d19_duong)-[:MARRIED_TO {marriage_order: 1}]->(d19_duong_w);