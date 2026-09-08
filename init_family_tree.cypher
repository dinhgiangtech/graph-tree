// ==============================================================================
// 1. DỌN DẸP & TẠO RÀNG BUỘC (INDEX / CONSTRAINT)
// ==============================================================================
MATCH (n)
DETACH DELETE n;

CREATE CONSTRAINT unique_person_id IF NOT EXISTS
FOR (p:Person)
REQUIRE p.id IS UNIQUE;

CREATE INDEX person_name_idx IF NOT EXISTS
FOR (p:Person)
ON (p.full_name);

// ==============================================================================
// 2. KHỞI TỔ ĐẾN ĐỜI 13 (THỜI LÊ - TRỊNH)
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
        "Sinh ra và lớn lên ở Thanh Hóa. Cuối thời Trần dạy học ở Đô Kỳ (Thái Bình). Cùng con trai Đinh Tôn Nhân vào Lam Sơn theo giúp Lê Lợi khởi nghĩa chống Minh. Từng ứng nghĩa dưới cờ vua Trần Trùng Quang (Trần Quý Khoáng), được phong Thái Úy, Phò Mã. Khởi nghĩa thắng lợi được truy phong Mục Huệ Đại Vương.",
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
        "Con gái cụ góa phụ họ Sang ở làng Sang. Mẹ mất khi đi cấy ở gò Bà Sang (mối xông). Bà được ông chủ họ Phạm nhận nuôi rồi gả cho cụ Đinh Thỉnh.",
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
        "Theo cha giúp Lê Lợi chuẩn bị và lãnh đạo khởi nghĩa Lam Sơn. Được Lê Khoáng và Lê Lợi yêu mến gả con gái (chị gái Lê Lợi). Cùng 3 con trai dự Hội thề Lũng Nhai (1416) và lễ tế cờ Lam Sơn (1418).",
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
        "Chị gái ruột Vua Lê Lợi, con gái Hào trưởng Lê Khoáng ở Lam Sơn.",
      note: "Mẹ của ba vị tướng kiệt xuất Đinh Lễ, Đinh Bồ, Đinh Liệt."
    })
CREATE (d01_thinh)-[:FATHER_OF]->(d02_nhan)
CREATE (d01_gai)-[:MOTHER_OF]->(d02_nhan)
CREATE (d02_nhan)-[:MARRIED_TO {marriage_order: 1}]->(d02_voi)

// --- ĐỜI 3 (Ba anh em Khai quốc công thần) ---
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
        "Cháu gọi Lê Lợi bằng cậu ruột, ban quốc tính họ Lê. Dự thề Lũng Nhai, lập công đầu trong các trận Lạc Thủy, Ninh Kiều, Tốt Động, Chúc Động. Giữ chức Tư Không. Bị giặc bắt tại trận Tây Phù Liệt (1427) và sát hại vì kiên quyết không hàng. Sắc phong Phúc Thần nhiều nơi.",
      note:
        "Giỗ 13 tháng Giêng (Đại Việt Thông Sử chép hy sinh 8/3 Đinh Mùi 1427)."
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
      biography: "Con gái quan Thái Truyền Trang Quốc Công họ Bùi.",
      note: "Lăng mộ để tại thôn Đức Già, làng Lam Sơn."
    })

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
        "Tham gia thề Lũng Nhai, lập công tại Lạc Thủy, Mường Thôi, Trà Lân, Bồ Ải. Hy sinh tại trận đánh Khả Lưu (Anh Sơn, Nghệ An) do giẫm phải chông độc.",
      note: "Lăng mộ và đền thờ tại xã Phúc Điền, huyện Hưng Nguyên, Nghệ An."
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
      biography: "Con gái Thái Úy Trung Quốc Công Lê Lâm.",
      note: "Lăng mộ ở thôn Đóa Tú, Lam Sơn."
    })

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
        "Chỉ huy chém Liễu Thăng ở núi Mã Yên. Phò tá 4 triều vua Lê, là Tể tướng chấp chính 10 năm. Đưa bà Ngô Thị Ngọc Giao về Ỷ Đốn lánh nạn và sinh hạ vua Lê Thánh Tông. Cùng Nguyễn Xí dẹp quyền thần, đưa Lê Thánh Tông lên ngôi. Thượng Đẳng Phúc Thần.",
      note: "Thờ tại Từ đường Chi Lăng, Sáo Đền, Lam Sơn."
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
        "Từng bị Thái hậu Nguyễn Thị Anh giam cầm gần 6 năm dưới hầm sâu cùng con cái do kẻ gian vu cáo.",
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

// Con nuôi của Cụ Đinh Liệt (con gái cụ Đinh Lễ lấy Thái úy Ngô Từ)
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
CREATE (d03_le)-[:FATHER_OF]->(d04_ke)
CREATE (d03_le_w)-[:MOTHER_OF]->(d04_ke)
CREATE (d03_liet)-[:ADOPTED_BY]->(d04_ke)
CREATE (ngo_tu)-[:MARRIED_TO {marriage_order: 1}]->(d04_ke)

// --- ĐỜI 4 ---
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
      note: "Mộ để tại thôn Đông Cao, xã Trung Chính, Nông Cống."
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
      note: "Mộ để tại Lam Sơn, Thọ Xuân, Thanh Hóa."
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
        "Làm quan triều Lê Thái Tông, Nhân Tông, Thánh Tông; từng theo vua đi dẹp Bồn Man, Chiêm Thành. Quan hàng Thượng phẩm, Thiếu Bảo.",
      note: "Vợ là bà họ Vũ. Mộ để tại Mỹ Lâm, Thanh Hóa."
    })
CREATE (d03_liet)-[:FATHER_OF]->(d04_mai)
CREATE (d03_liet)-[:FATHER_OF]->(d04_dot)
CREATE (d03_liet)-[:FATHER_OF]->(d04_hien)
CREATE (d03_phu)-[:MOTHER_OF]->(d04_mai)
CREATE (d03_phu)-[:MOTHER_OF]->(d04_dot)
CREATE (d03_phu)-[:MOTHER_OF]->(d04_hien)
CREATE (d04_dot)-[:MARRIED_TO {marriage_order: 1}]->(d04_duong)

// --- ĐỜI 5 ---
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
      note: "Mộ để tại Lam Sơn, Thọ Xuân, Thanh Hóa."
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
      note: "Mộ để tại Lam Sơn, Thọ Xuân, Thanh Hóa."
    })
CREATE (d04_dot)-[:FATHER_OF]->(d05_minh)
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
      hometown: "Thanh Hóa"
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
      note: "Hưởng ruộng bổng lộc tại đất Hưng Hà."
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
      note:
        "Lăng mộ để tại làng Hò (xã Thống Nhất, Hưng Hà) gọi là lăng Thúy Quận Công."
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
      note: "Mộ để cùng chồng tại lăng Thúy Quận Công, làng Hò."
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
      note: "Khởi tổ dòng họ Đinh xã Chi Lăng. Mộ để tại An Lão (Vũ Thư)."
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
      note: "Mộ đặt tại trang An Lão, Song An, Vũ Thư, Thái Bình."
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
      note: "Ra ở Hàm Giang, Cẩm Giàng, Hải Dương."
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
      note: "Lăng mộ để tại khu lăng Đường Vuông sau Vượt, xã Ỷ Đốn."
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
      note: "Vợ quê ở Thanh Hóa, sinh được 3 con trai."
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
      note: "Vợ người Ỷ Đún, sinh được 2 con trai."
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

// ==============================================================================
// 3. ĐỜI 14 -> ĐỜI 17: PHÂN CHIA 3 PHÁI
// ==============================================================================
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
        "Ông Tổ chung của 3 Phái dòng họ Đinh xã Chi Lăng (Hưng Hà), Minh Tân và Lô Giang (Đông Hưng).",
      note:
        "Sinh 3 con trai: Đinh Thuần (Phái 1), Đinh Thời (Phái 2), Đinh Nghiêm (Phái 3)."
    })
CREATE (d13_tin)-[:FATHER_OF]->(d14_hau)

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
CREATE (d14_hau)-[:FATHER_OF]->(d15_thuan)
CREATE (d14_hau)-[:FATHER_OF]->(d15_thoi)
CREATE (d14_hau)-[:FATHER_OF]->(d15_nghiem)

CREATE
  (d16_khoi:Person
    {
      id: "P_D16",
      full_name: "Đinh Khôi",
      alias_name: "Đinh Phúc Cần",
      gender: "MALE",
      generation: 16,
      is_alive: false,
      title: "Tự Phúc Cần",
      lunar_death_day: "27/03",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography: "Tổ Phái 3 đời thứ 16, duy trì dòng dõi trực hệ tại quê nhà.",
      note: "Mộ để tại Đường Vuông xứ Bà Lễ, xã Chi Lăng."
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
      note: "Mộ ban đầu ở làng Tuộc, sau chuyển về xã Chi Lăng."
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
CREATE (d15_nghiem)-[:FATHER_OF]->(d16_khoi)
CREATE (d15_nghiem)-[:FATHER_OF]->(d16_do)
CREATE (d16_khoi)-[:MARRIED_TO {marriage_order: 1}]->(d16_khoi_w)

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
        "Tổ chung sinh ra 3 Ngành của Phái 3 (Ngành 1 Đinh Phúc Trực, Ngành 2 Đinh Danh Già, Ngành 3 Đinh Danh Côn).",
      note:
        "Mộ táng chung cùng vợ tại ruộng Chùa sau Vượt, xứ Đồng Chung (Mộ Tổ Đồng Chung)."
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
      note: "Mộ táng chung cùng Cụ tại Mộ Tổ Đồng Chung."
    })
CREATE (d16_khoi)-[:FATHER_OF]->(d17_luat)
CREATE (d16_khoi_w)-[:MOTHER_OF]->(d17_luat)
CREATE (d17_luat)-[:MARRIED_TO {marriage_order: 1}]->(d17_hien)

// ==============================================================================
// 4. ĐỜI 18 & 19: PHÂN 3 NGÀNH (ĐA THÊ & ĐỔI ĐỆM ĐINH DANH)
// ==============================================================================
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
      note: "Mộ để tại đường Con Thổ, xứ Bà Lễ, xã Chi Lăng."
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
      hometown: "Xã Ỷ Đốn, Thái Bình"
    })

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
      note: "Sinh 1 con trai là Đinh Danh Thịnh, sau đó ngành này tuyệt tự."
    })

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
      note: "Mộ để trong vườn chùa Phúc Lâm (chùa Đún), xã Chi Lăng."
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
      note: "Mộ để tại đường Vuông sau Vượt, hướng ra đồng xã Chi Lăng."
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
      note: "Không rõ phần mộ và ngày giỗ."
    })

CREATE (d17_luat)-[:FATHER_OF]->(d18_truc)
CREATE (d17_luat)-[:FATHER_OF]->(d18_gia)
CREATE (d17_luat)-[:FATHER_OF]->(d18_con)
CREATE (d17_hien)-[:MOTHER_OF]->(d18_con)
CREATE (d18_truc)-[:MARRIED_TO {marriage_order: 1}]->(d18_truc_w)
CREATE
  (d18_con)-[:MARRIED_TO {marriage_order: 1, title: "Chính thất (Bà Cả)"}]->
  (d18_baCa)
CREATE
  (d18_con)-[:MARRIED_TO {marriage_order: 2, title: "Thứ thất (Bà Hai)"}]->
  (d18_baHai)

// --- ĐỜI 19 ---
CREATE
  (d19_khuong:Person
    {
      id: "P_D19_KHUONG",
      full_name: "Đinh Danh Khương",
      alias_name: "Phúc Bình",
      gender: "MALE",
      generation: 19,
      is_alive: false,
      title: "Xã Sử (Khởi tổ Chi 1, 2, 3)",
      lunar_death_day: "08/03",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Tuất. Làm quan chức Xã Sử trong làng, tính tình thanh liêm, nhà nghèo. Mất vì bệnh tả vào tháng 5 năm Quý Mão (1903).",
      note: "Mộ để giữa Đường Vuông, xứ Bà Lễ, xã Chi Lăng."
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
      note: "Mộ để tại đường Con Rắn sau Vượt, xứ Đồng Chung."
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
CREATE (d19_khuong)-[:MARRIED_TO {marriage_order: 1}]->(d19_may)

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
        "Con bà thứ Từ Thuận. Sinh được 3 con trai: Nghịch (mất nhỏ), Nịnh, Liệu.",
      note: "Mộ để tại cạnh phía đông Đường Vuông sau Vượt, xã Chi Lăng."
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
CREATE (d19_duong)-[:MARRIED_TO {marriage_order: 1}]->(d19_duong_w)

// ==============================================================================
// 5. ĐỜI 20 (CẢ DÂU VÀ RỂ - GỐC GÁC & TIỂU SỬ)
// ==============================================================================
CREATE
  (d20_khi:Person
    {
      id: "P_D20_KHI",
      full_name: "Đinh Danh Khì",
      alias_name: "Pháp Bảo",
      gender: "MALE",
      generation: 20,
      is_alive: false,
      title: "Khởi tổ Chi 1",
      birth_year: 1849,
      lunar_death_day: "03/05",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Kỷ Dậu (1849). Tính tình liêm khiết, được dân làng quý mến bầu làm Xã Sử nhưng từ chối không nhận vì không muốn khao vọng phiền dân. Mất ngày 3/5 Nhâm Thìn (1892), thọ 45 tuổi.",
      note: "Mộ táng chung cùng vợ tại ruộng Đầu Cừ, xứ Bà Lễ, xã Chi Lăng."
    })
CREATE
  (d20_hien_w:Person
    {
      id: "P_D20_KHI_W",
      full_name: "Nguyễn Thị Hiện",
      title: "Hiệu Từ Liên",
      gender: "FEMALE",
      in_law: true,
      generation: 20,
      is_alive: false,
      birth_year: 1857,
      lunar_death_day: "14/10",
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      note:
        "Tuổi Đinh Tỵ (1857). Mộ táng chung cùng chồng tại Đầu Cừ, xứ Bà Lễ."
    })
CREATE (d19_khuong)-[:FATHER_OF]->(d20_khi)
CREATE (d19_may)-[:MOTHER_OF]->(d20_khi)
CREATE (d20_khi)-[:MARRIED_TO {marriage_order: 1}]->(d20_hien_w)

CREATE
  (d20_bach:Person
    {
      id: "P_D20_BACH",
      full_name: "Đinh Danh Bách",
      alias_name: "Phúc Mai",
      gender: "MALE",
      generation: 20,
      is_alive: false,
      title: "Khởi tổ Chi 2",
      birth_year: 1852,
      lunar_death_day: "23/12",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Nhâm Tý (1852). Mất ngày 23/12 Mậu Thìn (1928), thọ 77 tuổi. Sinh được 3 trai 3 gái.",
      note: "Mộ để tại xứ Đồng Chung, xã Chi Lăng."
    })
CREATE
  (d20_nhon:Person
    {
      id: "P_D20_BACH_W",
      full_name: "Nguyễn Thị Nhớn",
      title: "Hiệu Từ Kiệm",
      gender: "FEMALE",
      in_law: true,
      generation: 20,
      is_alive: false,
      birth_year: 1866,
      lunar_death_day: "23/12",
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      note: "Tuổi Bính Dần (1866). Mộ tại xã Chi Lăng."
    })
CREATE (d19_khuong)-[:FATHER_OF]->(d20_bach)
CREATE (d19_may)-[:MOTHER_OF]->(d20_bach)
CREATE (d20_bach)-[:MARRIED_TO {marriage_order: 1}]->(d20_nhon)

CREATE
  (d20_hop:Person
    {
      id: "P_D20_HOP",
      full_name: "Đinh Thị Hợp",
      gender: "FEMALE",
      generation: 20,
      is_alive: false,
      birth_year: 1863,
      lunar_death_day: "23/12",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Quý Hợi (1863). Mất 23 Chạp Giáp Thân (1944), thọ 82 tuổi. Lấy ông Lý Trưởng Phạm Đình Bích ở làng Phươn, sinh được 5 con trai.",
      note: "Con cháu sinh sống tại làng Phươn, xã Hòa Bình, Hưng Hà."
    })
CREATE
  (d20_bich_r:Person
    {
      id: "P_D20_HOP_H",
      full_name: "Phạm Đình Bích",
      gender: "MALE",
      in_law: true,
      generation: 20,
      is_alive: false,
      title: "Lý Trưởng xã Ỷ Đốn",
      hometown: "Làng Phươn, xã Hòa Bình, huyện Hưng Hà, Thái Bình"
    })
CREATE (d19_khuong)-[:FATHER_OF]->(d20_hop)
CREATE (d19_may)-[:MOTHER_OF]->(d20_hop)
CREATE (d20_bich_r)-[:MARRIED_TO {marriage_order: 1}]->(d20_hop)

CREATE
  (d20_duc:Person
    {
      id: "P_D20_DUC",
      full_name: "Đinh Danh Dục",
      alias_name: "Phúc Cao",
      gender: "MALE",
      generation: 20,
      is_alive: false,
      birth_year: 1866,
      lunar_death_day: "12/03",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Bính Dần (1866). Làm thầy cúng, giữ việc cúng tế ở một số chùa tại thị xã Hải Dương. Có 2 bà vợ.",
      note:
        "Có con trai là Đinh Danh Thật (bị giặc Pháp bắn năm 1950) nhưng không có cháu trai nối dõi."
    })
CREATE
  (d20_tuong_w:Person
    {
      id: "P_D20_DUC_W1",
      full_name: "Nguyễn Thị Tường",
      title: "Bà Cả (Từ Ái)",
      gender: "FEMALE",
      in_law: true,
      generation: 20,
      is_alive: false,
      lunar_death_day: "16/09",
      hometown: "Thị xã Hải Dương"
    })
CREATE
  (d20_duc_w2:Person
    {
      id: "P_D20_DUC_W2",
      full_name: "Bà Hai cụ Dục",
      gender: "FEMALE",
      in_law: true,
      generation: 20,
      is_alive: false,
      hometown: "Thị xã Hải Dương"
    })
CREATE (d19_khuong)-[:FATHER_OF]->(d20_duc)
CREATE (d19_may)-[:MOTHER_OF]->(d20_duc)
CREATE
  (d20_duc)-[:MARRIED_TO {marriage_order: 1, title: "Bà Cả"}]->(d20_tuong_w)
CREATE
  (d20_duc)-[:MARRIED_TO {marriage_order: 2, title: "Bà Hai"}]->(d20_duc_w2)

CREATE
  (d20_giang:Person
    {
      id: "P_D20_GIANG",
      full_name: "Đinh Danh Giảng",
      gender: "MALE",
      generation: 20,
      is_alive: false,
      title: "Khởi tổ Chi 3",
      birth_year: 1869,
      lunar_death_day: "17/07",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Kỷ Tỵ (1869). Tham gia phong trào khởi nghĩa Cần Vương chống Pháp của Bang Tốn (làng Phươn). Mất ngày 17/7 Nhâm Thìn (1952), thọ 84 tuổi.",
      note: "Mộ để cạnh phía bắc Đường Vuông, xứ Bà Lễ, xã Chi Lăng."
    })
CREATE
  (d20_thu:Person
    {
      id: "P_D20_GIANG_W",
      full_name: "Nguyễn Thị Thu",
      title: "Hiệu Từ Ân",
      gender: "FEMALE",
      in_law: true,
      generation: 20,
      is_alive: false,
      birth_year: 1874,
      lunar_death_day: "01/06",
      hometown: "Làng Đún Ngoại, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Giáp Tuất (1874), họ Nguyễn Văn cùng làng. Mất ngày 01/6 Ất Hợi (1935), thọ 62 tuổi.",
      note: "Mộ để cạnh đường ruộng đi ra đường Chùa, Đầu Cừ, xứ Bà Lễ."
    })
CREATE (d19_khuong)-[:FATHER_OF]->(d20_giang)
CREATE (d19_may)-[:MOTHER_OF]->(d20_giang)
CREATE (d20_giang)-[:MARRIED_TO {marriage_order: 1}]->(d20_thu)

CREATE
  (d20_lieu:Person
    {
      id: "P_D20_LIEU",
      full_name: "Đinh Danh Liệu",
      gender: "MALE",
      generation: 20,
      is_alive: false,
      title: "Khởi tổ Chi 4",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Ra đi ngày 10/2 năm Pháp đánh Lạng Sơn, sau đó không rõ tin tức phần mộ.",
      note: "Vợ là Hoàng Thị Duyên ở nhà nuôi 2 con trai (Liêm, Đỗ)."
    })
CREATE
  (d20_duyen:Person
    {
      id: "P_D20_LIEU_W",
      full_name: "Hoàng Thị Duyên",
      gender: "FEMALE",
      in_law: true,
      generation: 20,
      is_alive: false,
      lunar_death_day: "21/02",
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      biography: "Mất ngày 21/02 Nhâm Tý (1972).",
      note: "Mộ để tại Đầu Cừ, xứ Bà Lễ, xã Chi Lăng."
    })
CREATE (d19_duong)-[:FATHER_OF]->(d20_lieu)
CREATE (d20_lieu)-[:MARRIED_TO {marriage_order: 1}]->(d20_duyen)

// ==============================================================================
// 6. TIỂU SỬ, QUÊ QUÁN ĐỜI 21 ĐẾN 24 (4 CHI LỚN)
// ==============================================================================

// ------------------------------------------------------------------------------
// CHI 1 (CHI TRƯỞNG - HÀ NỘI)
// ------------------------------------------------------------------------------
CREATE
  (d21_dung:Person
    {
      id: "P_D21_DUNG",
      full_name: "Đinh Danh Dụng",
      alias_name: "Pháp Chính",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      title: "Tác giả bản gốc chữ Hán Tộc phả",
      birth_year: 1877,
      lunar_death_day: "03/10",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Đinh Sửu (1877). Tham gia phong trào Cần Vương của ông Đốc Nhưỡng chống Pháp. Khi phong trào tan, ra thị xã Hải Dương làm ăn và tham gia cúng lễ che giấu thân phận. Khởi công sưu tầm ghi chép bản gốc chữ Hán Tộc phả Ngành 3. Mất 3/10 Ất Hợi (1935), thọ 59 tuổi.",
      note: "Mộ để tại núi Voi, Tiên Hội, An Lão, Hải Phòng."
    })
CREATE
  (d21_san:Person
    {
      id: "P_D21_DUNG_W1",
      full_name: "Nguyễn Thị San",
      title: "Bà Cả (Từ Nhàn)",
      birth_year: 1886,
      lunar_death_day: "08/06",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d21_y:Person
    {
      id: "P_D21_DUNG_W2",
      full_name: "Đào Thị Ý",
      title: "Bà Kế (Diệu Thành)",
      birth_year: 1891,
      lunar_death_day: "12/10",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      hometown: "Tiên Hội, An Lão, Hải Phòng"
    })
CREATE (d20_khi)-[:FATHER_OF]->(d21_dung)
CREATE (d20_hien_w)-[:MOTHER_OF]->(d21_dung)
CREATE (d21_dung)-[:MARRIED_TO {marriage_order: 1, title: "Bà Cả"}]->(d21_san)
CREATE (d21_dung)-[:MARRIED_TO {marriage_order: 2, title: "Bà Kế"}]->(d21_y)

CREATE
  (d22_dong:Person
    {
      id: "P_D22_DONG",
      full_name: "Đinh Văn Đông",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      title: "Cử nhân Tài chính, Chuyên viên Bộ Tài chính, Biên soạn Tộc phả",
      birth_year: 1910,
      lunar_death_day: "09/04",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Canh Tuất (1910). Cử nhân Tài chính, Đảng viên ĐCSVN. Tinh thông chữ Hán, có công rất lớn trong việc biên soạn bộ Đinh Tộc Thế Phả và đề xuất công nhận di tích lịch sử Từ đường họ Đinh. Mất ngày 9/4 Canh Ngọ (1990), thọ 80 tuổi.",
      note: "Cư trú tại Hà Nội. Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (d22_thoa:Person
    {
      id: "P_D22_DONG_W",
      full_name: "Nguyễn Thị Thoa",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      birth_year: 1934,
      hometown: "Huyện Vũ Thư, tỉnh Thái Bình",
      biography: "Đảng viên ĐCSVN. Cùng chồng sinh sống tại TP Hà Nội.",
      note: "Mộ tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (d22_hoai:Person
    {
      id: "P_D22_HOAI",
      full_name: "Đinh Hoài",
      alias_name: "Đinh Xuân Hải",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      title: "PGS.TS Kinh tế, Vụ trưởng Bộ KHCN&MT",
      birth_year: 1932,
      lunar_death_day: "26/02",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Nhâm Thân (1932). Đảng viên ĐCSVN, tham gia kháng chiến chống Pháp, Chủ nhiệm bộ môn ĐH Bách Khoa Hà Nội, Vụ trưởng Vụ KH-TC Bộ Khoa học Công nghệ và Môi trường. Tiếp tục biên soạn hoàn thành bộ Tộc phả năm 1999. Mất 26/02 Đinh Dậu (2017), thọ 86 tuổi.",
      note: "Mộ để tại nghĩa trang Kỳ Sơn, Hòa Bình."
    })
CREATE
  (d22_tam_w:Person
    {
      id: "P_D22_HOAI_W",
      full_name: "Nguyễn Thị Tâm",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      title:
        "Anh hùng Lao động, Ủy viên TW Đảng Khóa 6-7, Giám đốc Dệt Minh Khai",
      birth_year: 1941,
      hometown: "Huyện Mỹ Văn, tỉnh Hưng Yên",
      biography:
        "Tuổi Tân Tỵ (1941). Kỹ sư Dệt, Bí thư Quận ủy Ba Đình, Phó Ban Tài chính Quản trị Trung ương Đảng.",
      note: "Cư trú tại TP Hà Nội."
    })
CREATE (d21_dung)-[:FATHER_OF]->(d22_dong)
CREATE (d21_dung)-[:FATHER_OF]->(d22_hoai)
CREATE (d21_y)-[:MOTHER_OF]->(d22_dong)
CREATE (d21_y)-[:MOTHER_OF]->(d22_hoai)
CREATE (d22_dong)-[:MARRIED_TO {marriage_order: 1}]->(d22_thoa)
CREATE (d22_hoai)-[:MARRIED_TO {marriage_order: 1}]->(d22_tam_w)

CREATE
  (d23_hau:Person
    {
      id: "P_D23_HAU",
      full_name: "Đinh Gia Hậu",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Hà Nội",
      title: "Cử nhân Kinh tế, Phó TGĐ Công ty Thực phẩm miền Bắc",
      birth_year: 1942,
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Nhâm Ngọ (1942). Đảng viên ĐCSVN. Giảng viên ĐH Thương Mại, Trưởng phòng Tổ chức Cán bộ - Bộ Thương Mại.",
      note: "Cư trú tại phường Vĩnh Tuy, quận Hai Bà Trưng, Hà Nội."
    })
CREATE
  (d23_hung1:Person
    {
      id: "P_D23_HUNG1",
      full_name: "Đinh Quốc Hùng",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Hà Nội",
      title: "Cử nhân Kinh tế, Đại diện Chi 1 biên soạn tộc phả",
      birth_year: 1975,
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Ất Mão (1975). Cán bộ Tổng Công ty Xuất nhập khẩu Xây dựng (Bộ Xây dựng). Đại diện Chi 1 thu thập thông tin phả hệ.",
      note: "Vợ là Trần Thị Bích Hà, quê Hà Nội."
    })
CREATE (d22_hoai)-[:FATHER_OF]->(d23_hung1)
CREATE (d22_tam_w)-[:MOTHER_OF]->(d23_hung1)

// Con gái Chi 1 lấy chồng
CREATE
  (d24_phuong:Person
    {
      id: "P_D24_PHUONG",
      full_name: "Đinh Thị Lan Phương",
      birth_year: 1971,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      title: "Cử nhân Kinh tế, Bộ Công Thương",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d24_tue_r:Person
    {
      id: "P_D24_TUE_R",
      full_name: "Lê Minh Tuệ",
      birth_year: 1971,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hà Nội"
    })
CREATE (d23_hau)-[:FATHER_OF]->(d24_phuong)
CREATE (d24_tue_r)-[:MARRIED_TO {marriage_order: 1}]->(d24_phuong)

// ------------------------------------------------------------------------------
// CHI 2 (TP. HẢI DƯƠNG)
// ------------------------------------------------------------------------------
CREATE
  (d21_nham:Person
    {
      id: "P_D21_NHAM",
      full_name: "Đinh Danh Nhâm",
      alias_name: "Phúc Cầm",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      title: "Khởi đầu Chi 2",
      birth_year: 1887,
      lunar_death_day: "14/02",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Đinh Hợi (1887). Mất 14/2 Bính Tuất (1946), thọ 59 tuổi. Di cư ra TP Hải Dương lập nghiệp.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (d22_sang:Person
    {
      id: "P_D22_SANG",
      full_name: "Đinh Văn Sáng",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      title: "Thượng úy Quân đội, Đảng viên ĐCSVN",
      birth_year: 1928,
      lunar_death_day: "16/09",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Mậu Thìn (1928). Bộ đội kháng chiến chống Pháp, Thượng úy quân đội nghỉ hưu. Mất ngày 16/9 Canh Dần (2010), thọ 82 tuổi.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (d22_yen_w:Person
    {
      id: "P_D22_SANG_W",
      full_name: "Hoàng Thị Yến",
      birth_year: 1926,
      lunar_death_day: "21/02",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương"
    })
CREATE
  (d23_sao:Person
    {
      id: "P_D23_SAO",
      full_name: "Đinh Văn Sao",
      gender: "MALE",
      generation: 23,
      is_alive: false,
      title: "Kỹ sư Điện lực, Trưởng Chi 2",
      birth_year: 1959,
      lunar_death_day: "14/07",
      hometown: "TP Hải Dương",
      biography:
        "Tuổi Kỷ Hợi (1959). Đảng viên ĐCSVN, Kỹ sư Điện lực Quảng Ninh. Mất ngày 14/8/2019 (14/7 Kỷ Hợi).",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE (d21_nham)-[:FATHER_OF]->(d22_sang)
CREATE (d22_sang)-[:FATHER_OF]->(d23_sao)
CREATE (d22_sang)-[:MARRIED_TO {marriage_order: 1}]->(d22_yen_w)

// Rể Chi 2:
CREATE
  (d22_mui_f:Person
    {
      id: "P_D22_MUI_F",
      full_name: "Đinh Thị Múi",
      birth_year: 1925,
      lunar_death_day: "01/06",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương"
    })
CREATE
  (d22_thach_r:Person
    {
      id: "P_D22_THACH_R",
      full_name: "Nguyễn Kim Thạch",
      birth_year: 1923,
      lunar_death_day: "06/04",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương"
    })
CREATE (d22_thach_r)-[:MARRIED_TO {marriage_order: 1}]->(d22_mui_f)

// ------------------------------------------------------------------------------
// CHI 3 (XÃ CHI LĂNG - QUÊ NHÀ)
// ------------------------------------------------------------------------------
CREATE
  (d21_kien:Person
    {
      id: "P_D21_KIEN",
      full_name: "Đinh Danh Kiền",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      birth_year: 1903,
      lunar_death_day: "21/11",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Quý Mão (1903). Học chữ Hán 10 năm từ nhỏ, gia cảnh thanh bạch, thường cùng các bậc cha chú ra Hải Dương cúng lễ việc họ. Mất ngày 21/11 Quý Sửu (1973), thọ 71 tuổi.",
      note: "Mộ để cạnh bờ ruộng phía nam Đường Vuông, xứ Bà Lễ."
    })
CREATE
  (d21_phuong_k:Person
    {
      id: "P_D21_KIEN_W",
      full_name: "Nguyễn Thị Phương",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      birth_year: 1907,
      lunar_death_day: "17/11",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography: "Tuổi Mậu Thìn (1907), họ Nguyễn Đình cùng làng.",
      note: "Mộ giữa đường Con Nhạn, xứ Bà Lễ."
    })
CREATE (d20_giang)-[:FATHER_OF]->(d21_kien)
CREATE (d20_thu)-[:MOTHER_OF]->(d21_kien)
CREATE (d21_kien)-[:MARRIED_TO {marriage_order: 1}]->(d21_phuong_k)

CREATE
  (d22_nha:Person
    {
      id: "P_D22_NHA",
      full_name: "Đinh Danh Nhã",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      title: "Chủ tịch xã Chi Lăng (1955)",
      birth_year: 1930,
      lunar_death_day: "09/10",
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày Thanh minh Canh Ngọ (1930). Du kích liên lạc trong kháng chiến chống Pháp, Chủ tịch xã Chi Lăng năm 1955, Đảng viên ĐCSVN. Được tặng Huy chương Kháng chiến chống Pháp hạng nhì, Huân chương Kháng chiến chống Mỹ hạng nhì. Mất 9/10 Mậu Ngọ (1988), thọ 59 tuổi.",
      note: "Mộ để giữa đường Chè Lẽ (đường Voi Phục) sau chùa Đún."
    })
CREATE
  (d22_de:Person
    {
      id: "P_D22_NHA_W",
      full_name: "Vũ Thị Dề",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      birth_year: 1935,
      hometown: "Xóm Chùa, thôn Thống Nhất, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Bính Tý (1935), họ Vũ Đức, mẹ là người họ Đinh Danh (Phái 1).",
      note: "Cư trú tại xã Chi Lăng."
    })
CREATE (d21_kien)-[:FATHER_OF]->(d22_nha)
CREATE (d21_phuong_k)-[:MOTHER_OF]->(d22_nha)
CREATE (d22_nha)-[:MARRIED_TO {marriage_order: 1}]->(d22_de)

CREATE
  (d23_vung:Person
    {
      id: "P_D23_VUNG",
      full_name: "Đinh Danh Vùng",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Hà Nội",
      title: "Thượng tá Biên phòng, Chủ biên Tộc phả 2025",
      birth_year: 1955,
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 3/2 Ất Mùi (1955). Đảng viên ĐCSVN, Thượng tá cán bộ ngành Hậu cần Kỹ thuật - Bộ Tư lệnh Bộ đội Biên phòng (1972-2009). Chủ biên tổng hợp, hiệu đính bộ Gia phả Ngành 3 Phái 3 năm 2025.",
      note:
        "Chuyển lên cư trú tại phường Vĩnh Tuy, quận Hai Bà Trưng, Hà Nội từ năm 1998."
    })
CREATE
  (d23_che:Person
    {
      id: "P_D23_VUNG_W",
      full_name: "Nguyễn Thị Chè",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      birth_year: 1958,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      biography: "Sinh ngày 01/10 Mậu Tuất (1958), họ Nguyễn Đình cùng xã.",
      note: "Cư trú tại quận Hai Bà Trưng, Hà Nội."
    })
CREATE (d22_nha)-[:FATHER_OF]->(d23_vung)
CREATE (d22_de)-[:MOTHER_OF]->(d23_vung)
CREATE (d23_vung)-[:MARRIED_TO {marriage_order: 1}]->(d23_che)

CREATE
  (d24_thanh3:Person
    {
      id: "P_D24_THANH3",
      full_name: "Đinh Danh Thành",
      gender: "MALE",
      generation: 24,
      is_alive: true,
      current_residence: "Hà Nội",
      title: "Thượng tá, ThS Biên phòng, Phó Trưởng phòng Bộ Tham mưu BĐBP",
      birth_year: 1979,
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 12/01/1979 (14/12 Mậu Ngọ). Đảng viên ĐCSVN, Thạc sĩ Biên phòng, Thượng tá, nguyên giảng viên Học viện Biên phòng, hiện là Phó Trưởng phòng thuộc Bộ Tham mưu - BTL Bộ đội Biên phòng.",
      note: "Cư trú tại TP Hà Nội."
    })
CREATE
  (d24_giang_w:Person
    {
      id: "P_D24_THANH3_W",
      full_name: "Nguyễn Thu Giang",
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      birth_year: 1979,
      hometown: "Phường Khương Thượng, quận Đống Đa, Hà Nội",
      biography:
        "Sinh 04/10/1979 (Kỷ Mùi), gốc họ Nguyễn Đình. Cử nhân Kinh tế, Kế toán.",
      note: "Cư trú tại Hà Nội."
    })
CREATE (d23_vung)-[:FATHER_OF]->(d24_thanh3)
CREATE (d23_che)-[:MOTHER_OF]->(d24_thanh3)
CREATE (d24_thanh3)-[:MARRIED_TO {marriage_order: 1}]->(d24_giang_w)

CREATE
  (d24_cuong:Person
    {
      id: "P_D24_CUONG",
      full_name: "Đinh Danh Cường",
      birth_year: 1982,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      title: "CĐ Tài chính Kế toán"
    })
CREATE
  (d24_yen_cuong:Person
    {
      id: "P_D24_CUONG_W",
      full_name: "Dương Thị Yến",
      birth_year: 1988,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Xã Long Đống, huyện Bắc Sơn, Lạng Sơn",
      title: "Cử nhân Kinh tế Đối ngoại, ĐH Ngoại Giao"
    })
CREATE (d23_vung)-[:FATHER_OF]->(d24_cuong)
CREATE (d24_cuong)-[:MARRIED_TO {marriage_order: 1}]->(d24_yen_cuong)

CREATE
  (d24_phuc:Person
    {
      id: "P_D24_PHUC",
      full_name: "Đinh Xuân Phúc",
      birth_year: 1992,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      current_residence: "Hà Nội",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      title: "Cử nhân Ngân hàng"
    })
CREATE
  (d24_thu_phuc:Person
    {
      id: "P_D24_PHUC_W",
      full_name: "Nguyễn Thị Anh Thư",
      birth_year: 1995,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Quê gốc Hà Tĩnh, nhà tại TP Hạ Long, Quảng Ninh",
      title: "Kỹ sư ĐH Kiến trúc Hà Nội"
    })
CREATE (d23_vung)-[:FATHER_OF]->(d24_phuc)
CREATE (d24_phuc)-[:MARRIED_TO {marriage_order: 1}]->(d24_thu_phuc)

// Rể Chi 3:
CREATE
  (d24_luot:Person
    {
      id: "P_D24_LUOT",
      full_name: "Đinh Thị Lượt",
      title: "Tiến sỹ Điều dưỡng, BV Nội tiết TW",
      birth_year: 1986,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d24_tri_r:Person
    {
      id: "P_D24_TRI_R",
      full_name: "Đinh Đức Trí",
      title: "ThS Kinh tế, Ban Dự án Hoàng Mai",
      birth_year: 1981,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Tỉnh Ninh Bình"
    })
CREATE (d24_tri_r)-[:MARRIED_TO {marriage_order: 1}]->(d24_luot)

CREATE
  (d24_hanh_m:Person
    {
      id: "P_D24_HANH_M",
      full_name: "Đinh Thị Hạnh",
      birth_year: 1989,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d24_khiem_r:Person
    {
      id: "P_D24_KHIEM_R",
      full_name: "Nguyễn Xuân Khiêm",
      title: "Sĩ quan Công binh Quân khu 3",
      birth_year: 1982,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Huyện Cẩm Giàng, Hải Dương"
    })
CREATE (d24_khiem_r)-[:MARRIED_TO {marriage_order: 1}]->(d24_hanh_m)

// ------------------------------------------------------------------------------
// CHI 4 (LAI CHÂU - ĐIỆN BIÊN - ĐẮK NÔNG)
// ------------------------------------------------------------------------------
CREATE
  (d21_liem:Person
    {
      id: "P_D21_LIEM",
      full_name: "Đinh Danh Liêm",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      title: "Khai hoang kinh tế mới Tây Bắc (1964)",
      birth_year: 1906,
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Bính Ngọ (1906). Năm 1964 đưa cả gia đình rời quê hương Chi Lăng lên khai hoang xây dựng vùng kinh tế mới tại huyện Sìn Hồ, tỉnh Lai Châu. Mất ngày 08/7/1994, thọ 88 tuổi.",
      note: "Mộ để tại nghĩa trang Bản Khá, phường Nam Thanh, TP Điện Biên Phủ."
    })
CREATE
  (d21_han:Person
    {
      id: "P_D21_LIEM_W",
      full_name: "Nguyễn Thị Hân",
      birth_year: 1923,
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE (d20_lieu)-[:FATHER_OF]->(d21_liem)
CREATE (d21_liem)-[:MARRIED_TO {marriage_order: 1}]->(d21_han)

CREATE
  (d22_phuong:Person
    {
      id: "P_D22_PHUONG",
      full_name: "Đinh Danh Phương",
      gender: "MALE",
      generation: 22,
      is_alive: true,
      current_residence: "Lai Châu",
      title: "Cán bộ hưu trí, Đại diện Chi 4",
      birth_year: 1953,
      hometown: "Thôn Trần Phú, xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Quý Tỵ (1953). Đảng viên ĐCSVN, cán bộ nghỉ hưu tại xã Sà Dề Phìn, huyện Sìn Hồ, tỉnh Lai Châu. Cùng ông Toàn đại diện Chi 4 cung cấp tư liệu gia phả.",
      note: "Cư trú tại xã Sà Dề Phìn, Sìn Hồ, Lai Châu."
    })
CREATE
  (d22_mai_p:Person
    {
      id: "P_D22_PHUONG_W",
      full_name: "Đỗ Thị Mai",
      birth_year: 1953,
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      hometown: "Xã Lô Giang, huyện Đông Hưng, Thái Bình"
    })
CREATE (d21_liem)-[:FATHER_OF]->(d22_phuong)
CREATE (d21_han)-[:MOTHER_OF]->(d22_phuong)
CREATE (d22_phuong)-[:MARRIED_TO {marriage_order: 1}]->(d22_mai_p)

CREATE
  (d22_tu:Person
    {
      id: "P_D22_TU",
      full_name: "Đinh Danh Tư",
      gender: "MALE",
      generation: 22,
      is_alive: true,
      current_residence: "Lai Châu",
      title: "Chủ tịch Hội Nông dân xã Sà Dề Phìn (1995-2010)",
      birth_year: 1957,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d22_hien_tu:Person
    {
      id: "P_D22_TU_W",
      full_name: "Vũ Thị Hiên",
      birth_year: 1962,
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      hometown: "Xã An Mỹ, huyện Quỳnh Phụ, Thái Bình"
    })
CREATE (d21_liem)-[:FATHER_OF]->(d22_tu)
CREATE (d22_tu)-[:MARRIED_TO {marriage_order: 1}]->(d22_hien_tu)

CREATE
  (d23_hung4:Person
    {
      id: "P_D23_HUNG4",
      full_name: "Đinh Danh Hùng",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Lai Châu",
      title: "Phó Trưởng phòng Quản trị Tài vụ - VP UBND tỉnh Lai Châu",
      birth_year: 1972,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 22/12/1972. Đảng viên ĐCSVN, trình độ Đại học, công tác tại Văn phòng UBND tỉnh Lai Châu."
    })
CREATE
  (d23_giang_h:Person
    {
      id: "P_D23_HUNG4_W",
      full_name: "Nguyễn Trà Giang",
      birth_year: 1983,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      title: "Phó Hiệu trưởng Mầm non Lậm Cần",
      hometown: "Tỉnh Lai Châu"
    })
CREATE (d22_phuong)-[:FATHER_OF]->(d23_hung4)
CREATE (d22_mai_p)-[:MOTHER_OF]->(d23_hung4)
CREATE (d23_hung4)-[:MARRIED_TO {marriage_order: 1}]->(d23_giang_h)

CREATE
  (d23_toan:Person
    {
      id: "P_D23_TOAN",
      full_name: "Đinh Danh Toàn",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Lai Châu",
      title: "ThS Sinh học, Giáo viên THPT Sìn Hồ",
      birth_year: 1986,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 26/01/1986 (Bính Dần). Đảng viên ĐCSVN, Thạc sĩ Sinh học thực nghiệm, giáo viên trường THPT Sìn Hồ. Đại diện Chi 4 phối hợp tổng hợp gia phả.",
      note: "Cư trú tại thị trấn Sìn Hồ, Lai Châu."
    })
CREATE
  (d23_ngoc_toan:Person
    {
      id: "P_D23_TOAN_W",
      full_name: "Nguyễn Thị Ngọc",
      birth_year: 1994,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      title: "Giáo viên Ngữ văn",
      hometown: "Huyện Hoa Lư, tỉnh Ninh Bình"
    })
CREATE (d22_tu)-[:FATHER_OF]->(d23_toan)
CREATE (d22_hien_tu)-[:MOTHER_OF]->(d23_toan)
CREATE (d23_toan)-[:MARRIED_TO {marriage_order: 1}]->(d23_ngoc_toan)

// ==============================================================================
// 7. THẾ HỆ ĐỜI THỨ 25 (HẬU DUỆ CỦA ĐỜI 24)
// ==============================================================================

// --- CHI 2 (TP. HẢI DƯƠNG) ---
CREATE
  (d25_long:Person
    {
      id: "P_D25_LONG",
      full_name: "Đinh Gia Long",
      birth_year: 2024,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (d25_quang:Person
    {
      id: "P_D25_QUANG",
      full_name: "Đinh Anh Quang",
      birth_year: 2011,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (d25_minh_qa:Person
    {
      id: "P_D25_MINH_QA",
      full_name: "Đinh Anh Minh",
      birth_year: 2011,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (d25_phuc_qa:Person
    {
      id: "P_D25_PHUC_QA",
      full_name: "Đinh Anh Phúc",
      birth_year: 2019,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (d25_nhi:Person
    {
      id: "P_D25_NHI",
      full_name: "Đinh Bảo Nhi",
      birth_year: 2014,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (d25_han:Person
    {
      id: "P_D25_HAN",
      full_name: "Đinh Bảo Hân",
      birth_year: 2021,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (d24_binh_thanh:Person
    {
      id: "P_D24_BINH_T",
      full_name: "Đinh Thanh Bình",
      birth_year: 1993,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (d24_lan_binh:Person
    {
      id: "P_D24_BINH_W",
      full_name: "Lê Thị Tuyết Lan",
      birth_year: 1995,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (d24_binh_thanh)-[:MARRIED_TO {marriage_order: 1}]->(d24_lan_binh)
CREATE (d24_binh_thanh)-[:FATHER_OF]->(d25_long)
CREATE (d24_lan_binh)-[:MOTHER_OF]->(d25_long)
CREATE (d23_sao)-[:FATHER_OF]->(d24_binh_thanh)

CREATE
  (d24_quyen_anh:Person
    {
      id: "P_D24_QUYEN_A",
      full_name: "Đinh Quyền Anh",
      birth_year: 1983,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (d24_chi_w:Person
    {
      id: "P_D24_QUYEN_W",
      full_name: "Phạm Thị Kim Chi",
      birth_year: 1984,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (d24_quyen_anh)-[:MARRIED_TO {marriage_order: 1}]->(d24_chi_w)
CREATE (d24_quyen_anh)-[:FATHER_OF]->(d25_quang)
CREATE (d24_quyen_anh)-[:FATHER_OF]->(d25_minh_qa)
CREATE (d24_quyen_anh)-[:FATHER_OF]->(d25_phuc_qa)
CREATE (d24_chi_w)-[:MOTHER_OF]->(d25_quang)
CREATE (d24_chi_w)-[:MOTHER_OF]->(d25_minh_qa)
CREATE (d24_chi_w)-[:MOTHER_OF]->(d25_phuc_qa)

CREATE
  (d24_sinh:Person
    {
      id: "P_D24_SINH",
      full_name: "Đinh Danh Sinh",
      birth_year: 1982,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (d24_loan_sinh:Person
    {
      id: "P_D24_SINH_W",
      full_name: "Nguyễn Thị Hương Loan",
      birth_year: 1992,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (d24_sinh)-[:MARRIED_TO {marriage_order: 1}]->(d24_loan_sinh)
CREATE (d24_sinh)-[:FATHER_OF]->(d25_nhi)
CREATE (d24_sinh)-[:FATHER_OF]->(d25_han)
CREATE (d24_loan_sinh)-[:MOTHER_OF]->(d25_nhi)
CREATE (d24_loan_sinh)-[:MOTHER_OF]->(d25_han)

// --- CHI 3 (XÃ CHI LĂNG - QUÊ NHÀ) ---
CREATE
  (d25_ha:Person
    {
      id: "P_D25_HA",
      full_name: "Đinh Thu Hà",
      birth_year: 2009,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Chi Lăng"
    })
CREATE
  (d25_nguyen:Person
    {
      id: "P_D25_NGUYEN",
      full_name: "Đinh Phúc Nguyên",
      birth_year: 2011,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Chi Lăng"
    })
CREATE (d24_thanh3)-[:FATHER_OF]->(d25_ha)
CREATE (d24_thanh3)-[:FATHER_OF]->(d25_nguyen)
CREATE (d24_giang_w)-[:MOTHER_OF]->(d25_ha)
CREATE (d24_giang_w)-[:MOTHER_OF]->(d25_nguyen)

CREATE
  (d25_ngan:Person
    {
      id: "P_D25_NGAN",
      full_name: "Đinh Thị Kim Ngân",
      birth_year: 2012,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Lạng Sơn"
    })
CREATE
  (d25_dat:Person
    {
      id: "P_D25_DAT",
      full_name: "Đinh Tấn Đạt",
      birth_year: 2017,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Lạng Sơn"
    })
CREATE (d24_cuong)-[:FATHER_OF]->(d25_ngan)
CREATE (d24_cuong)-[:FATHER_OF]->(d25_dat)
CREATE (d24_yen_cuong)-[:MOTHER_OF]->(d25_ngan)
CREATE (d24_yen_cuong)-[:MOTHER_OF]->(d25_dat)

CREATE
  (d25_linh_xp:Person
    {
      id: "P_D25_LINH_XP",
      full_name: "Đinh Thị Khánh Linh",
      birth_year: 2021,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Quảng Ninh"
    })
CREATE
  (d25_hung_xp:Person
    {
      id: "P_D25_HUNG_XP",
      full_name: "Đinh Phúc Hưng",
      birth_year: 2024,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Quảng Ninh"
    })
CREATE (d24_phuc)-[:FATHER_OF]->(d25_linh_xp)
CREATE (d24_phuc)-[:FATHER_OF]->(d25_hung_xp)
CREATE (d24_thu_phuc)-[:MOTHER_OF]->(d25_linh_xp)
CREATE (d24_thu_phuc)-[:MOTHER_OF]->(d25_hung_xp)

CREATE
  (d25_khoi_h:Person
    {
      id: "P_D25_KHOI_H",
      full_name: "Đinh Minh Khôi",
      birth_year: 2024,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Chi Lăng"
    })
CREATE
  (d24_hung_m:Person
    {
      id: "P_D24_HUNG_M",
      full_name: "Đinh Danh Hùng",
      birth_year: 1997,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      title: "Cử nhân Điều dưỡng, BV Nội tiết TW",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d24_hang_hung:Person
    {
      id: "P_D24_HUNG_MW",
      full_name: "Nguyễn Minh Hằng",
      birth_year: 1999,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Phường Vạn Phúc, quận Hà Đông, Hà Nội"
    })
CREATE (d24_hung_m)-[:MARRIED_TO {marriage_order: 1}]->(d24_hang_hung)
CREATE (d24_hung_m)-[:FATHER_OF]->(d25_khoi_h)
CREATE (d24_hang_hung)-[:MOTHER_OF]->(d25_khoi_h)

CREATE
  (d25_tuan_v:Person
    {
      id: "P_D25_TUAN_V",
      full_name: "Đinh Danh Tuấn",
      birth_year: 2022,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Thái Bình"
    })
CREATE
  (d24_vu:Person
    {
      id: "P_D24_VU",
      full_name: "Đinh Danh Vũ",
      birth_year: 1989,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      title: "Đại úy BĐBP Thái Bình",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d24_ha_vu:Person
    {
      id: "P_D24_VU_W",
      full_name: "Hoàng Thị Hà",
      birth_year: 1997,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Phường Bồ Xuyên, TP Thái Bình"
    })
CREATE (d24_vu)-[:MARRIED_TO {marriage_order: 1}]->(d24_ha_vu)
CREATE (d24_vu)-[:FATHER_OF]->(d25_tuan_v)
CREATE (d24_ha_vu)-[:MOTHER_OF]->(d25_tuan_v)

CREATE
  (d25_minh_p:Person
    {
      id: "P_D25_MINH_P",
      full_name: "Đinh Quang Minh",
      birth_year: 2013,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d25_nhu_p:Person
    {
      id: "P_D25_NHU_P",
      full_name: "Đinh Gia Như",
      birth_year: 2012,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d25_han_p:Person
    {
      id: "P_D25_HAN_P",
      full_name: "Đinh Gia Hân",
      birth_year: 2015,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d25_linh_p:Person
    {
      id: "P_D25_LINH_P",
      full_name: "Đinh Gia Linh",
      birth_year: 2019,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d24_phong_phoi:Person
    {
      id: "P_D24_PHONG_P",
      full_name: "Đinh Danh Phong",
      birth_year: 1992,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d24_gam_w:Person
    {
      id: "P_D24_GAM_W",
      full_name: "Đinh Thị Gấm",
      title: "Vợ trước",
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Thái Bình"
    })
CREATE
  (d24_cuc_w:Person
    {
      id: "P_D24_CUC_W",
      full_name: "Nguyễn Thị Cúc",
      title: "Vợ sau",
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Thái Bình"
    })
CREATE
  (d24_phong_phoi)-[:MARRIED_TO {marriage_order: 1, title: "Vợ trước"}]->
  (d24_gam_w)
CREATE
  (d24_phong_phoi)-[:MARRIED_TO {marriage_order: 2, title: "Vợ sau"}]->
  (d24_cuc_w)
CREATE (d24_phong_phoi)-[:FATHER_OF]->(d25_minh_p)
CREATE (d24_gam_w)-[:MOTHER_OF]->(d25_minh_p)
CREATE (d24_phong_phoi)-[:FATHER_OF]->(d25_nhu_p)
CREATE (d24_cuc_w)-[:MOTHER_OF]->(d25_nhu_p)
CREATE (d24_phong_phoi)-[:FATHER_OF]->(d25_han_p)
CREATE (d24_cuc_w)-[:MOTHER_OF]->(d25_han_p)
CREATE (d24_phong_phoi)-[:FATHER_OF]->(d25_linh_p)
CREATE (d24_cuc_w)-[:MOTHER_OF]->(d25_linh_p)

// --- CHI 4 (LAI CHÂU - ĐIỆN BIÊN) ---
CREATE
  (d25_anh_t:Person
    {
      id: "P_D25_ANH_T",
      full_name: "Đinh Đức Anh",
      birth_year: 2015,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Lai Châu / Ninh Bình"
    })
CREATE
  (d25_ha_t:Person
    {
      id: "P_D25_HA_T",
      full_name: "Đinh Ngân Hà",
      birth_year: 2020,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Lai Châu / Ninh Bình"
    })
CREATE
  (d25_phuc_t:Person
    {
      id: "P_D25_PHUC_T",
      full_name: "Đinh Danh Phúc",
      birth_year: 2022,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Lai Châu / Ninh Bình"
    })
CREATE (d23_toan)-[:FATHER_OF]->(d25_anh_t)
CREATE (d23_toan)-[:FATHER_OF]->(d25_ha_t)
CREATE (d23_toan)-[:FATHER_OF]->(d25_phuc_t)
CREATE (d23_ngoc_toan)-[:MOTHER_OF]->(d25_anh_t)
CREATE (d23_ngoc_toan)-[:MOTHER_OF]->(d25_ha_t)
CREATE (d23_ngoc_toan)-[:MOTHER_OF]->(d25_phuc_t)

CREATE
  (d25_thang_b:Person
    {
      id: "P_D25_THANG_B",
      full_name: "Đinh Gia Thăng",
      birth_year: 2016,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Lai Châu / Hà Nam"
    })
CREATE
  (d25_thao_b:Person
    {
      id: "P_D25_THAO_B",
      full_name: "Đinh Thị Thảo",
      birth_year: 2023,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Lai Châu / Hà Nam"
    })
CREATE
  (d23_binh_p:Person
    {
      id: "P_D23_BINH_P",
      full_name: "Đinh Danh Bình",
      birth_year: 1975,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (d23_tham_w:Person
    {
      id: "P_D23_BINH_W",
      full_name: "Nguyễn Thị Thắm",
      birth_year: 1980,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "Xã Nhân Khang, huyện Lý Nhân, Hà Nam"
    })
CREATE (d23_binh_p)-[:MARRIED_TO {marriage_order: 1}]->(d23_tham_w)
CREATE (d23_binh_p)-[:FATHER_OF]->(d25_thang_b)
CREATE (d23_binh_p)-[:FATHER_OF]->(d25_thao_b)
CREATE (d23_tham_w)-[:MOTHER_OF]->(d25_thang_b)
CREATE (d23_tham_w)-[:MOTHER_OF]->(d25_thao_b)

CREATE
  (d25_tam_q:Person
    {
      id: "P_D25_TAM_Q",
      full_name: "Đinh Thị Tâm",
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Lai Châu"
    })
CREATE
  (d25_nghia_q:Person
    {
      id: "P_D25_NGHIA_Q",
      full_name: "Đinh Danh Nghĩa",
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Lai Châu"
    })
CREATE
  (d23_quyet:Person
    {
      id: "P_D23_QUYET",
      full_name: "Đinh Danh Quyết",
      birth_year: 1980,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      hometown: "Lai Châu"
    })
CREATE
  (d23_chuyen_w:Person
    {
      id: "P_D23_QUYET_W",
      full_name: "Lù Thị Chuyên",
      birth_year: 1988,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "Lai Châu"
    })
CREATE (d23_quyet)-[:MARRIED_TO {marriage_order: 1}]->(d23_chuyen_w)
CREATE (d23_quyet)-[:FATHER_OF]->(d25_tam_q)
CREATE (d23_quyet)-[:FATHER_OF]->(d25_nghia_q)
CREATE (d23_chuyen_w)-[:MOTHER_OF]->(d25_tam_q)
CREATE (d23_chuyen_w)-[:MOTHER_OF]->(d25_nghia_q)

CREATE
  (d25_quan_th:Person
    {
      id: "P_D25_QUAN_TH",
      full_name: "Đinh Danh Quân",
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Lai Châu"
    })
CREATE
  (d23_thanh4:Person
    {
      id: "P_D23_THANH4",
      full_name: "Đinh Danh Thành",
      birth_year: 1985,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      hometown: "Lai Châu"
    })
CREATE
  (d23_lan_anh:Person
    {
      id: "P_D23_THANH4_W",
      full_name: "Nguyễn Lan Anh",
      birth_year: 1988,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "Lai Châu"
    })
CREATE (d23_thanh4)-[:MARRIED_TO {marriage_order: 1}]->(d23_lan_anh)
CREATE (d23_thanh4)-[:FATHER_OF]->(d25_quan_th)
CREATE (d23_lan_anh)-[:MOTHER_OF]->(d25_quan_th);