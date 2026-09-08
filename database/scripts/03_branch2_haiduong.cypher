// ==============================================================================
// PHẦN 3: CHI 2 (TP. HẢI DƯƠNG)
// Nhánh Cụ Đinh Danh Bách -> Cụ Nhâm, Cụ Ngà, Cụ Muôn -> Đời 22, 23, 24, 25
// ==============================================================================
// ==============================================================================
// 1. TẠO CỤ KHỞI TỔ CHI 2 (ĐỜI 20) & CÁC NHÁNH ĐỒNG ĐỜI (HỢP, DỤC) NỐI VỚI ĐỜI 19
// ==============================================================================
CREATE
  (b2_d20_bach:Person
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
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Nhâm Tý (1852). Mất ngày 23/12 năm Mậu Thìn (1928), thọ 77 tuổi. Sinh được 3 trai 3 gái.",
      note: "Mộ để tại xứ Đồng Chung, xã Chi Lăng."
    })
CREATE
  (b2_d20_nhon:Person
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
      hometown: "Xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      note: "Tuổi Bính Dần (1866). Mộ tại xã Chi Lăng."
    })

CREATE
  (b2_d20_hop:Person
    {
      id: "P_D20_HOP",
      full_name: "Đinh Thị Hợp",
      gender: "FEMALE",
      generation: 20,
      is_alive: false,
      birth_year: 1863,
      lunar_death_day: "23/12",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Quý Hợi (1863). Mất 23 Chạp Giáp Thân (1944), thọ 82 tuổi. Lấy ông Lý Trưởng Phạm Đình Bích ở làng Phươn, sinh được 5 con trai.",
      note: "Con cháu sinh sống tại làng Phươn, xã Hòa Bình, Hưng Hà."
    })
CREATE
  (b2_d20_bich_r:Person
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

CREATE
  (b2_d20_duc:Person
    {
      id: "P_D20_DUC",
      full_name: "Đinh Danh Dục",
      alias_name: "Phúc Cao",
      gender: "MALE",
      generation: 20,
      is_alive: false,
      birth_year: 1866,
      lunar_death_day: "12/03",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Bính Dần (1866). Làm thầy cúng, giữ việc cúng tế ở một số chùa tại thị xã Hải Dương. Có 2 bà vợ.",
      note:
        "Có con trai là Đinh Danh Thật (bị giặc Pháp bắn năm 1950) nhưng không có cháu trai nối dõi."
    })
CREATE
  (b2_d20_tuong_w:Person
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
  (b2_d20_duc_w2:Person
    {
      id: "P_D20_DUC_W2",
      full_name: "Bà Hai cụ Dục",
      gender: "FEMALE",
      in_law: true,
      generation: 20,
      is_alive: false,
      hometown: "Thị xã Hải Dương"
    })

WITH b2_d20_bach, b2_d20_nhon, b2_d20_hop, b2_d20_bich_r, b2_d20_duc, b2_d20_tuong_w, b2_d20_duc_w2
MATCH (d19_khuong:Person {id: "P_D19_KHUONG"})
MATCH (d19_may:Person {id: "P_D19_KHUONG_W"})
CREATE (d19_khuong)-[:FATHER_OF]->(b2_d20_bach)
CREATE (d19_khuong)-[:FATHER_OF]->(b2_d20_hop)
CREATE (d19_khuong)-[:FATHER_OF]->(b2_d20_duc)
CREATE (d19_may)-[:MOTHER_OF]->(b2_d20_bach)
CREATE (d19_may)-[:MOTHER_OF]->(b2_d20_hop)
CREATE (d19_may)-[:MOTHER_OF]->(b2_d20_duc)
CREATE (b2_d20_bach)-[:MARRIED_TO {marriage_order: 1}]->(b2_d20_nhon)
CREATE (b2_d20_bich_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d20_hop)
CREATE (b2_d20_duc)-[:MARRIED_TO {marriage_order: 1, title: "Bà Cả"}]->(b2_d20_tuong_w)
CREATE (b2_d20_duc)-[:MARRIED_TO {marriage_order: 2, title: "Bà Hai"}]->(b2_d20_duc_w2)

// ==============================================================================
// 2. ĐỜI 21: CÁC CON CỦA CỤ ĐINH DANH BÁCH (3 TRAI, 3 GÁI)
// ==============================================================================

// 1. CỤ ĐINH DANH NHÂM (2 VỢ)
CREATE
  (b2_d21_nham:Person
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
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Đinh Hợi (1887). Mất ngày 14/2 năm Bính Tuất (1946), thọ 59 tuổi. Rời quê ra thị xã Hải Dương lập nghiệp. Có 2 bà vợ, sinh được 2 trai và 4 gái.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d21_nup_w:Person
    {
      id: "P_D21_NHAM_W1",
      full_name: "Nguyễn Thị Nụp",
      title: "Bà Cả",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      hometown: "TP Hải Dương",
      biography:
        "Chính thất của cụ Nhâm. Từ năm 1930 không rõ ở đâu. Sinh được 1 con gái, 1 con trai: Đinh Thị Mít, Đinh Danh Thông (Minh)."
    })
CREATE
  (b2_d21_dau_w:Person
    {
      id: "P_D21_NHAM_W2",
      full_name: "Nguyễn Thị Dậu",
      title: "Bà Thứ",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      lunar_death_day: "18/03",
      hometown: "TP Hải Dương",
      biography:
        "Thứ thất của cụ Nhâm. Mất ngày 18/3 năm Mậu Thìn (1988). Sinh được 1 con trai, 3 con gái: Đinh Văn Sáng, Đinh Thị Mùi, Đinh Thị Răm, Đinh Thị Nhuận.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })

// 2. CỤ ĐINH DANH NGÀ
CREATE
  (b2_d21_nga:Person
    {
      id: "P_D21_NGA",
      full_name: "Đinh Danh Ngà",
      alias_name: "Phúc Chân",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      birth_year: 1894,
      lunar_death_day: "18/04",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Giáp Ngọ (1894). Mất ngày 18/4 năm Đinh Mùi (1967), thọ 73 tuổi. Sinh được 5 con trai, 2 con gái.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d21_ty_w:Person
    {
      id: "P_D21_NGA_W",
      full_name: "Phạm Thị Tý",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      lunar_death_day: "21/04",
      hometown: "TP Hải Dương",
      biography: "Mất ngày 21/4 năm Kỷ Hợi (1989).",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })

// 3. CỤ ĐINH DANH MUÔN
CREATE
  (b2_d21_muon:Person
    {
      id: "P_D21_MUON",
      full_name: "Đinh Danh Muôn",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      birth_year: 1908,
      lunar_death_day: "03/02",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Mậu Thân (1908). Mất ngày 3/2 năm Bính Tuất (1946) tại TP Hải Phòng, thọ 38 tuổi.",
      note: "Không chép được phần mộ trong tộc phả."
    })
CREATE
  (b2_d21_tam_m_w:Person
    {
      id: "P_D21_MUON_W",
      full_name: "Phạm Thị Tâm",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      lunar_death_day: "04/12",
      hometown: "TP Hải Dương",
      biography:
        "Mất ngày 4/12 năm Giáp Thân (1944). Sinh được 1 con trai, 1 con gái: Đinh Danh Linh, Đinh Thị Nhật.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })

// 4. CÁC BÀ CON GÁI CỤ BÁCH
CREATE
  (b2_d21_bip:Person
    {
      id: "P_D21_BIP",
      full_name: "Đinh Thị Bịp",
      birth_year: 1889,
      gender: "FEMALE",
      generation: 21,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      note: "Tuổi Kỷ Sửu (1889)."
    })
CREATE
  (b2_d21_mam_r:Person
    {
      id: "P_D21_MAM_R",
      full_name: "Nguyễn Văn Mậm",
      gender: "MALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      hometown: "Làng Đún Ngoại, xã Chi Lăng, Hưng Hà, Thái Bình"
    })

CREATE
  (b2_d21_hoi:Person
    {
      id: "P_D21_HOI",
      full_name: "Đinh Thị Hợi",
      alias_name: "Khoan",
      birth_year: 1899,
      lunar_death_day: "08/03",
      gender: "FEMALE",
      generation: 21,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Kỷ Hợi (1899). Mất ngày 8/3 năm Ất Sửu (1985), thọ 86 tuổi. Chồng là Hoàng Văn Khoan người cùng làng.",
      note: "Mộ để tại xã Chi Lăng."
    })
CREATE
  (b2_d21_khoan_r:Person
    {
      id: "P_D21_KHOAN_R",
      full_name: "Hoàng Văn Khoan",
      gender: "MALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      hometown: "Thôn Quyết Tiến, xã Chi Lăng, Hưng Hà, Thái Bình"
    })

CREATE
  (b2_d21_teo:Person
    {
      id: "P_D21_TEO",
      full_name: "Đinh Thị Tèo",
      birth_year: 1906,
      gender: "FEMALE",
      generation: 21,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      note:
        "Tuổi Bính Ngọ (1906). Sau năm 1975 có người họ Đinh ở miền Nam về tìm họ nhưng chưa xác minh được."
    })

// Nối quan hệ Đời 21 Chi 2
CREATE (b2_d20_bach)-[:FATHER_OF]->(b2_d21_nham)
CREATE (b2_d20_bach)-[:FATHER_OF]->(b2_d21_nga)
CREATE (b2_d20_bach)-[:FATHER_OF]->(b2_d21_muon)
CREATE (b2_d20_bach)-[:FATHER_OF]->(b2_d21_bip)
CREATE (b2_d20_bach)-[:FATHER_OF]->(b2_d21_hoi)
CREATE (b2_d20_bach)-[:FATHER_OF]->(b2_d21_teo)
CREATE (b2_d20_nhon)-[:MOTHER_OF]->(b2_d21_nham)
CREATE (b2_d20_nhon)-[:MOTHER_OF]->(b2_d21_nga)
CREATE (b2_d20_nhon)-[:MOTHER_OF]->(b2_d21_muon)

CREATE
  (b2_d21_nham)-[:MARRIED_TO {marriage_order: 1, title: "Bà Cả"}]->
  (b2_d21_nup_w)
CREATE
  (b2_d21_nham)-[:MARRIED_TO {marriage_order: 2, title: "Bà Thứ"}]->
  (b2_d21_dau_w)
CREATE (b2_d21_nga)-[:MARRIED_TO {marriage_order: 1}]->(b2_d21_ty_w)
CREATE (b2_d21_muon)-[:MARRIED_TO {marriage_order: 1}]->(b2_d21_tam_m_w)
CREATE (b2_d21_mam_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d21_bip)
CREATE (b2_d21_khoan_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d21_hoi)

// ==============================================================================
// 3. ĐỜI 22: CON CÁI CÁC CỤ NHÂM, NGÀ, MUÔN
// ==============================================================================

// --- NHÁNH CỤ ĐINH DANH NHÂM ---
// Con Bà Cả:
CREATE
  (b2_d22_mit:Person
    {
      id: "P_D22_MIT",
      full_name: "Đinh Thị Mít",
      birth_year: 1917,
      lunar_death_day: "14/05",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      biography:
        "Tuổi Tân Tỵ (1917). Mất 14/5 Quý Sửu (1973), thọ 56 tuổi. Lấy ông Phạm Văn Tám sinh 1 trai 1 gái; lấy ông Nguyễn Văn Bế sinh 2 trai 3 gái.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d22_tam_r:Person
    {
      id: "P_D22_TAM_R",
      full_name: "Phạm Văn Tám",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d22_be_r:Person
    {
      id: "P_D22_BE_R",
      full_name: "Nguyễn Văn Bế",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d22_thong:Person
    {
      id: "P_D22_THONG",
      full_name: "Đinh Danh Thông",
      alias_name: "Minh",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      birth_year: 1920,
      lunar_death_day: "28/12",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Canh Thân (1920). Mất ngày 28/12 năm Ất Sửu (1985), thọ 65 tuổi. Sinh sống tại phố Lò Đúc, quận Hai Bà Trưng, Hà Nội.",
      note: "Mộ để tại nghĩa trang Yên Kỳ, Bất Bạt, Hà Tây."
    })
CREATE
  (b2_d22_suu_w:Person
    {
      id: "P_D22_THONG_W",
      full_name: "Nguyễn Thị Sửu",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      birth_year: 1923,
      hometown: "Phố Lò Đúc, Hai Bà Trưng, Hà Nội"
    })

CREATE (b2_d21_nham)-[:FATHER_OF]->(b2_d22_mit)
CREATE (b2_d21_nham)-[:FATHER_OF]->(b2_d22_thong)
CREATE (b2_d21_nup_w)-[:MOTHER_OF]->(b2_d22_mit)
CREATE (b2_d21_nup_w)-[:MOTHER_OF]->(b2_d22_thong)
CREATE
  (b2_d22_tam_r)-[:MARRIED_TO {marriage_order: 1, title: "Chồng trước"}]->
  (b2_d22_mit)
CREATE
  (b2_d22_be_r)-[:MARRIED_TO {marriage_order: 2, title: "Chồng kế"}]->
  (b2_d22_mit)
CREATE (b2_d22_thong)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_suu_w)

// Con Bà Thứ:
CREATE
  (b2_d22_sang:Person
    {
      id: "P_D22_SANG",
      full_name: "Đinh Văn Sáng",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      title: "Thượng úy Quân đội, Đảng viên ĐCSVN",
      birth_year: 1928,
      lunar_death_day: "16/09",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Mậu Thìn (1928). Bộ đội kháng chiến chống Pháp, Thượng úy quân đội nghỉ hưu, Đảng viên ĐCSVN. Mất ngày 16/9 Canh Dần (2010), thọ 82 tuổi.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d22_yen_sang_w:Person
    {
      id: "P_D22_SANG_W",
      full_name: "Hoàng Thị Yến",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      birth_year: 1926,
      lunar_death_day: "21/02",
      hometown: "TP Hải Dương",
      biography:
        "Tuổi Bính Dần (1926). Mất 21/2 Nhâm Dần (2022). Sinh được 3 con trai, 2 con gái: Sao, Trường, Thanh, Phương, Loan.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })

CREATE
  (b2_d22_mui:Person
    {
      id: "P_D22_MUI",
      full_name: "Đinh Thị Mùi",
      birth_year: 1931,
      lunar_death_day: "06/04",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note:
        "Tuổi Tân Mùi (1931). Mất 6/4 Tân Tỵ (2021). Mộ tại Sở Lẽ, Bình Hàn, TP Hải Dương."
    })
CREATE
  (b2_d22_nhi_r:Person
    {
      id: "P_D22_NHI_R",
      full_name: "Đinh Văn Nhị",
      birth_year: 1932,
      lunar_death_day: "29/04",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Tuổi Quý Dậu (1932). Mất 29/4 Giáp Dần (1974)."
    })

CREATE
  (b2_d22_ram:Person
    {
      id: "P_D22_RAM",
      full_name: "Đinh Thị Răm",
      birth_year: 1933,
      lunar_death_day: "04/06",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note:
        "Tuổi Quý Dậu (1933). Mất 4/6 Quý Sửu (1973), thọ 40 tuổi. Mộ tại Cầu Cương."
    })
CREATE
  (b2_d22_thuan_ram_r:Person
    {
      id: "P_D22_THUAN_R",
      full_name: "Nguyễn Văn Thuận",
      birth_year: 1940,
      lunar_death_day: "07/04",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Mất 7/4 Tân Tỵ (1997)."
    })

CREATE
  (b2_d22_nhuan:Person
    {
      id: "P_D22_NHUAN",
      full_name: "Đinh Thị Nhuận",
      birth_year: 1934,
      lunar_death_day: "28/08",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note:
        "Sinh ngày 08/3/1934 (Giáp Tuất). Mất 28/8 Đinh Dậu (2017). Mộ tại Cầu Cương."
    })
CREATE
  (b2_d22_nghiem_nhuan_r:Person
    {
      id: "P_D22_NGHIEM_R",
      full_name: "Bùi Văn Nghiêm",
      birth_year: 1924,
      lunar_death_day: "08/01",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Tuổi Giáp Tý (1924). Mất 8/1 Nhâm Dần (2022)."
    })

CREATE (b2_d21_nham)-[:FATHER_OF]->(b2_d22_sang)
CREATE (b2_d21_nham)-[:FATHER_OF]->(b2_d22_mui)
CREATE (b2_d21_nham)-[:FATHER_OF]->(b2_d22_ram)
CREATE (b2_d21_nham)-[:FATHER_OF]->(b2_d22_nhuan)
CREATE (b2_d21_dau_w)-[:MOTHER_OF]->(b2_d22_sang)
CREATE (b2_d21_dau_w)-[:MOTHER_OF]->(b2_d22_mui)
CREATE (b2_d21_dau_w)-[:MOTHER_OF]->(b2_d22_ram)
CREATE (b2_d21_dau_w)-[:MOTHER_OF]->(b2_d22_nhuan)
CREATE (b2_d22_sang)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_yen_sang_w)
CREATE (b2_d22_nhi_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_mui)
CREATE (b2_d22_thuan_ram_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_ram)
CREATE (b2_d22_nghiem_nhuan_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_nhuan)

// --- NHÁNH CỤ ĐINH DANH NGÀ ---
CREATE
  (b2_d22_mui_f:Person
    {
      id: "P_D22_MUI_F",
      full_name: "Đinh Thị Múi",
      birth_year: 1925,
      lunar_death_day: "01/06",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Mất 1/6 Giáp Thìn (2024), đại thọ 100 tuổi. Mộ tại Cầu Cương."
    })
CREATE
  (b2_d22_thach_r:Person
    {
      id: "P_D22_THACH_R",
      full_name: "Nguyễn Kim Thạch",
      birth_year: 1923,
      lunar_death_day: "06/04",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Mất 6/4 Canh Ngọ (1990). Mộ tại Cầu Cương."
    })

CREATE
  (b2_d22_cat:Person
    {
      id: "P_D22_CAT",
      full_name: "Đinh Danh Cát",
      alias_name: "Trực Bình",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      birth_year: 1929,
      lunar_death_day: "02/03",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Kỷ Tỵ (1929). Mất ngày 2/3 Canh Dần (1950), hưởng dương 24 tuổi, chưa có vợ. Cụ tránh giặc về quê, bị giặc Pháp sát hại khi đi càn qua xã Chi Lăng.",
      note: "Mộ để tại ruộng Chùa ở Đầu Cừ, xứ Bà Lễ, xã Chi Lăng."
    })

CREATE
  (b2_d22_tuong:Person
    {
      id: "P_D22_TUONG",
      full_name: "Đinh Danh Tường",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      birth_year: 1931,
      lunar_death_day: "18/01",
      hometown: "TP Hải Dương",
      biography:
        "Tuổi Tân Mùi (1931). Mất 18 tháng Giêng Kỷ Sửu (2009), thọ 78 tuổi. Có 2 bà vợ, sinh được 5 con trai, 2 con gái.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d22_xuan_w:Person
    {
      id: "P_D22_TUONG_W1",
      full_name: "Phạm Thị Xuân",
      title: "Vợ cả",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      birth_year: 1923,
      lunar_death_day: "03/06",
      hometown: "TP Hải Dương",
      biography:
        "Tuổi Quý Hợi (1923). Mất 3/6 Ất Sửu (1985). Sinh được 5 con trai, 2 con gái: Duyên, Vĩnh, Viễn, Giang, Sơn, Hồng, Chính.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d22_nguyet_tuong_w:Person
    {
      id: "P_D22_TUONG_W2",
      full_name: "Nguyễn Thị Nguyệt",
      title: "Vợ kế",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      birth_year: 1935,
      hometown: "TP Hải Dương",
      note: "Tuổi Ất Hợi (1935). Bà kế không có con."
    })

CREATE
  (b2_d22_van:Person
    {
      id: "P_D22_VAN",
      full_name: "Đinh Danh Vân",
      alias_name: "Trực Vinh",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      birth_year: 1933,
      lunar_death_day: "01/03",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Quý Dậu (1933). Mất ngày 1/3 Canh Dần (1950), hưởng dương 17 tuổi, chưa có vợ. Cùng anh trai tránh giặc về quê, bị giặc Pháp sát hại khi đi càn qua xã Chi Lăng.",
      note:
        "Mộ để tại ruộng Chùa ở Đầu Cừ, xứ Bà Lễ, xã Chi Lăng (táng chung cùng anh Đinh Danh Cát)."
    })

CREATE
  (b2_d22_tuu:Person
    {
      id: "P_D22_TUU",
      full_name: "Đinh Danh Tửu",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Mất khi mới 7 tuổi."
    })

CREATE
  (b2_d22_hoa:Person
    {
      id: "P_D22_HOA",
      full_name: "Đinh Danh Hòa",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      birth_year: 1938,
      lunar_death_day: "21/10",
      hometown: "TP Hải Dương",
      biography:
        "Mất ngày 21/10 Tân Mùi (1991), thọ 54 tuổi. Sinh được 2 con trai, 1 con gái: Hợp, Thủy, Thi.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d22_thu_hoa_w:Person
    {
      id: "P_D22_HOA_W",
      full_name: "Nguyễn Thị Thu",
      title: "Hiệu Diệu An",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      birth_year: 1945,
      lunar_death_day: "11/07",
      hometown: "TP Hải Dương",
      biography: "Sinh 25/3/1945. Mất 11/7 Giáp Thìn (2024), thọ 80 tuổi.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })

CREATE
  (b2_d22_tuyet_2:Person
    {
      id: "P_D22_TUYET_2",
      full_name: "Đinh Thị Tuyết",
      birth_year: 1946,
      gender: "FEMALE",
      generation: 22,
      is_alive: true,
      hometown: "TP Hải Dương",
      note: "Tuổi Bính Tuất (1946)."
    })
CREATE
  (b2_d22_lan_tuyet_r:Person
    {
      id: "P_D22_LAN_R",
      full_name: "Nguyễn Văn Lan",
      birth_year: 1940,
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE (b2_d21_nga)-[:FATHER_OF]->(b2_d22_mui_f)
CREATE (b2_d21_nga)-[:FATHER_OF]->(b2_d22_cat)
CREATE (b2_d21_nga)-[:FATHER_OF]->(b2_d22_tuong)
CREATE (b2_d21_nga)-[:FATHER_OF]->(b2_d22_van)
CREATE (b2_d21_nga)-[:FATHER_OF]->(b2_d22_tuu)
CREATE (b2_d21_nga)-[:FATHER_OF]->(b2_d22_hoa)
CREATE (b2_d21_nga)-[:FATHER_OF]->(b2_d22_tuyet_2)
CREATE (b2_d21_ty_w)-[:MOTHER_OF]->(b2_d22_tuong)
CREATE (b2_d21_ty_w)-[:MOTHER_OF]->(b2_d22_hoa)

CREATE (b2_d22_thach_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_mui_f)
CREATE
  (b2_d22_tuong)-[:MARRIED_TO {marriage_order: 1, title: "Vợ cả"}]->
  (b2_d22_xuan_w)
CREATE
  (b2_d22_tuong)-[:MARRIED_TO {marriage_order: 2, title: "Vợ kế"}]->
  (b2_d22_nguyet_tuong_w)
CREATE (b2_d22_hoa)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_thu_hoa_w)
CREATE (b2_d22_lan_tuyet_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_tuyet_2)

// --- NHÁNH CỤ ĐINH DANH MUÔN ---
CREATE
  (b2_d22_nhat:Person
    {
      id: "P_D22_NHAT",
      full_name: "Đinh Thị Nhật",
      birth_year: 1936,
      lunar_death_day: "15/02",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note:
        "Tuổi Bính Tý (1936). Mất 15/2 Nhâm Tuất (1982), thọ 46 tuổi. Mộ tại Cầu Cương."
    })
CREATE
  (b2_d22_ton_r:Person
    {
      id: "P_D22_TON_R",
      full_name: "Đinh Văn Tốn",
      birth_year: 1932,
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Tuổi Nhâm Thân (1932)."
    })

CREATE
  (b2_d22_linh:Person
    {
      id: "P_D22_LINH",
      full_name: "Đinh Danh Linh",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      birth_year: 1937,
      lunar_death_day: "26/03",
      hometown: "TP Hải Dương",
      biography:
        "Tuổi Đinh Sửu (1937). Mất 26/3 Quý Dậu (1993), thọ 56 tuổi. Sinh được 3 con trai, 5 con gái.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d22_hai_linh_w:Person
    {
      id: "P_D22_LINH_W",
      full_name: "Nguyễn Thị Hải",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      birth_year: 1939,
      hometown: "TP Hải Dương"
    })

CREATE (b2_d21_muon)-[:FATHER_OF]->(b2_d22_nhat)
CREATE (b2_d21_muon)-[:FATHER_OF]->(b2_d22_linh)
CREATE (b2_d21_tam_m_w)-[:MOTHER_OF]->(b2_d22_linh)
CREATE (b2_d22_ton_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_nhat)
CREATE (b2_d22_linh)-[:MARRIED_TO {marriage_order: 1}]->(b2_d22_hai_linh_w)

// ==============================================================================
// 4. ĐỜI 23: CON CÁI CÁC CỤ THÔNG, SÁNG, TƯỜNG, HÒA, LINH
// ==============================================================================

// --- CON CỤ ĐINH DANH THÔNG ---
CREATE
  (b2_d23_nga_thong:Person
    {
      id: "P_D23_NGA_2",
      full_name: "Đinh Thị Nga",
      birth_year: 1944,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "Phố Lò Đúc, Hai Bà Trưng, Hà Nội"
    })
CREATE
  (b2_d23_duc_r:Person
    {
      id: "P_D23_DUC_R",
      full_name: "Công Minh Đức",
      birth_year: 1941,
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hà Nội"
    })
CREATE (b2_d22_thong)-[:FATHER_OF]->(b2_d23_nga_thong)
CREATE (b2_d23_duc_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_nga_thong)

// --- CON CỤ ĐINH VĂN SÁNG ---
CREATE
  (b2_d23_sao:Person
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
        "Sinh 26/10/1959 (Kỷ Hợi). Kỹ sư Điện lực Quảng Ninh, Đảng viên ĐCSVN. Mất 14/8/2019 (14/7 Kỷ Hợi).",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d23_ha_sao_w:Person
    {
      id: "P_D23_SAO_W",
      full_name: "Bùi Thị Hạ",
      birth_year: 1965,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_truong:Person
    {
      id: "P_D23_TRUONG",
      full_name: "Đinh Văn Trường",
      birth_year: 1961,
      gender: "MALE",
      generation: 23,
      is_alive: false,
      note: "Mất năm 1965 khi còn nhỏ."
    })

CREATE
  (b2_d23_thanh:Person
    {
      id: "P_D23_THANH2",
      full_name: "Đinh Văn Thanh",
      gender: "MALE",
      generation: 23,
      is_alive: false,
      birth_year: 1962,
      lunar_death_day: "20/09",
      hometown: "TP Hải Dương",
      biography:
        "Sinh 19/11/1962 (Nhâm Dần). Đảng viên ĐCSVN. Mất 15/10/2022 (20/9 Nhâm Dần).",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b2_d23_hoan_thanh_w:Person
    {
      id: "P_D23_THANH2_W",
      full_name: "Vũ Thị Hoàn",
      birth_year: 1966,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_loan:Person
    {
      id: "P_D23_LOAN",
      full_name: "Đinh Thị Loan",
      birth_year: 1965,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_loi_r:Person
    {
      id: "P_D23_LOI_R",
      full_name: "Nguyễn Viết Lợi",
      birth_year: 1964,
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE (b2_d22_sang)-[:FATHER_OF]->(b2_d23_sao)
CREATE (b2_d22_sang)-[:FATHER_OF]->(b2_d23_truong)
CREATE (b2_d22_sang)-[:FATHER_OF]->(b2_d23_thanh)
CREATE (b2_d22_sang)-[:FATHER_OF]->(b2_d23_loan)
CREATE (b2_d22_yen_sang_w)-[:MOTHER_OF]->(b2_d23_sao)
CREATE (b2_d22_yen_sang_w)-[:MOTHER_OF]->(b2_d23_thanh)
CREATE (b2_d23_sao)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_ha_sao_w)
CREATE (b2_d23_thanh)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_hoan_thanh_w)
CREATE (b2_d23_loi_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_loan)

// --- CON CỤ ĐINH DANH TƯỜNG ---
CREATE
  (b2_d23_duyen:Person
    {
      id: "P_D23_DUYEN",
      full_name: "Đinh Thị Duyên",
      birth_year: 1952,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_vinh:Person
    {
      id: "P_D23_VINH",
      full_name: "Đinh Danh Vĩnh",
      birth_year: 1954,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "TP.HCM",
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_hao_vinh_w:Person
    {
      id: "P_D23_VINH_W",
      full_name: "Đỗ Thị Hảo",
      birth_year: 1957,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP.HCM"
    })

CREATE
  (b2_d23_vien:Person
    {
      id: "P_D23_VIEN",
      full_name: "Đinh Danh Viễn",
      birth_year: 1956,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Hải Dương",
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_thoa_vien_w:Person
    {
      id: "P_D23_VIEN_W",
      full_name: "Nguyễn Thị Thoa",
      birth_year: 1955,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_giang:Person
    {
      id: "P_D23_GIANG",
      full_name: "Đinh Danh Giang",
      birth_year: 1957,
      lunar_death_day: "14/06",
      gender: "MALE",
      generation: 23,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Mất 24/7/2002 (14/6 Nhâm Ngọ). Mộ tại Cầu Cương."
    })
CREATE
  (b2_d23_mai_giang_w:Person
    {
      id: "P_D23_GIANG_W",
      full_name: "Nguyễn Thị Mai",
      birth_year: 1959,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "CHLB Đức"
    })

CREATE
  (b2_d23_son:Person
    {
      id: "P_D23_SON",
      full_name: "Đinh Danh Sơn",
      birth_year: 1958,
      lunar_death_day: "22/10",
      gender: "MALE",
      generation: 23,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Mất 22/10 Bính Thân (2016). Mộ tại Cầu Cương."
    })
CREATE
  (b2_d23_thu_son_w:Person
    {
      id: "P_D23_SON_W",
      full_name: "Nguyễn Thị Thu",
      birth_year: 1964,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_hong_tuong:Person
    {
      id: "P_D23_HONG_T",
      full_name: "Đinh Thị Hồng",
      alias_name: "Liên",
      birth_year: 1959,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_hanh_r:Person
    {
      id: "P_D23_HANH_R",
      full_name: "Nguyễn Văn Hạnh",
      birth_year: 1954,
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_chinh:Person
    {
      id: "P_D23_CHINH",
      full_name: "Đinh Danh Chính",
      birth_year: 1963,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Hải Dương",
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_anh_chinh_w1:Person
    {
      id: "P_D23_CHINH_W1",
      full_name: "Phạm Vân Anh",
      title: "Vợ trước",
      birth_year: 1966,
      lunar_death_day: "04/11",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: false,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_oanh_chinh_w2:Person
    {
      id: "P_D23_CHINH_W2",
      full_name: "Phạm Thị Mai Oanh",
      title: "Vợ kế",
      birth_year: 1971,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE (b2_d22_tuong)-[:FATHER_OF]->(b2_d23_duyen)
CREATE (b2_d22_tuong)-[:FATHER_OF]->(b2_d23_vinh)
CREATE (b2_d22_tuong)-[:FATHER_OF]->(b2_d23_vien)
CREATE (b2_d22_tuong)-[:FATHER_OF]->(b2_d23_giang)
CREATE (b2_d22_tuong)-[:FATHER_OF]->(b2_d23_son)
CREATE (b2_d22_tuong)-[:FATHER_OF]->(b2_d23_hong_tuong)
CREATE (b2_d22_tuong)-[:FATHER_OF]->(b2_d23_chinh)
CREATE (b2_d22_xuan_w)-[:MOTHER_OF]->(b2_d23_vinh)
CREATE (b2_d22_xuan_w)-[:MOTHER_OF]->(b2_d23_vien)
CREATE (b2_d22_xuan_w)-[:MOTHER_OF]->(b2_d23_son)

CREATE (b2_d23_vinh)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_hao_vinh_w)
CREATE (b2_d23_vien)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_thoa_vien_w)
CREATE (b2_d23_giang)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_mai_giang_w)
CREATE (b2_d23_son)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_thu_son_w)
CREATE (b2_d23_hanh_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_hong_tuong)
CREATE
  (b2_d23_chinh)-[:MARRIED_TO {marriage_order: 1, title: "Vợ trước"}]->
  (b2_d23_anh_chinh_w1)
CREATE
  (b2_d23_chinh)-[:MARRIED_TO {marriage_order: 2, title: "Vợ kế"}]->
  (b2_d23_oanh_chinh_w2)

// --- CON CỤ ĐINH DANH HÒA ---
CREATE
  (b2_d23_hop:Person
    {
      id: "P_D23_HOP",
      full_name: "Đinh Danh Hợp",
      birth_year: 1972,
      lunar_death_day: "22/02",
      gender: "MALE",
      generation: 23,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Mất 22/2 Mậu Tuất (2022). Mộ tại Cầu Cương."
    })
CREATE
  (b2_d23_hang_hop_w:Person
    {
      id: "P_D23_HOP_W",
      full_name: "Nguyễn Thị Hằng",
      birth_year: 1973,
      lunar_death_day: "02/11",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: false,
      hometown: "TP Hải Dương",
      note: "Mất 2/11 Nhâm Dần (2022). Mộ tại Cầu Cương."
    })

CREATE
  (b2_d23_thuy_hoa:Person
    {
      id: "P_D23_THUY_H",
      full_name: "Đinh Thị Thủy",
      birth_year: 1976,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_thi:Person
    {
      id: "P_D23_THI",
      full_name: "Đinh Danh Thi",
      birth_year: 1979,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Hải Dương",
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_nguyen_thi_w:Person
    {
      id: "P_D23_THI_W",
      full_name: "Nguyễn Thị Nguyên",
      birth_year: 1981,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      title: "Đảng viên ĐCSVN, công tác tại địa phương",
      hometown: "TP Hải Dương"
    })

CREATE (b2_d22_hoa)-[:FATHER_OF]->(b2_d23_hop)
CREATE (b2_d22_hoa)-[:FATHER_OF]->(b2_d23_thuy_hoa)
CREATE (b2_d22_hoa)-[:FATHER_OF]->(b2_d23_thi)
CREATE (b2_d22_thu_hoa_w)-[:MOTHER_OF]->(b2_d23_hop)
CREATE (b2_d22_thu_hoa_w)-[:MOTHER_OF]->(b2_d23_thi)
CREATE (b2_d23_hop)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_hang_hop_w)
CREATE (b2_d23_thi)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_nguyen_thi_w)

// --- CON CỤ ĐINH DANH LINH ---
CREATE
  (b2_d23_ha_linh:Person
    {
      id: "P_D23_HA_L",
      full_name: "Đinh Thị Hà",
      birth_year: 1961,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_man_r:Person
    {
      id: "P_D23_MAN_R",
      full_name: "Đỗ Hòa Mẫn",
      birth_year: 1952,
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_lam_l:Person
    {
      id: "P_D23_LAM_L",
      full_name: "Đinh Danh Lâm",
      birth_year: 1964,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_ngan_lam_w:Person
    {
      id: "P_D23_LAM_W",
      full_name: "Cao Thị Ngân",
      birth_year: 1972,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_lai_linh:Person
    {
      id: "P_D23_LAI_L",
      full_name: "Đinh Thị Lại",
      birth_year: 1966,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_than_r:Person
    {
      id: "P_D23_THAN_R",
      full_name: "Nguyễn Ngọc Thản",
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_bich_linh:Person
    {
      id: "P_D23_BICH_L",
      full_name: "Đinh Thị Bích",
      birth_year: 1970,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_vinh_r:Person
    {
      id: "P_D23_VINH_R",
      full_name: "Lương Thế Vinh",
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_huyen_linh:Person
    {
      id: "P_D23_HUYEN_L",
      full_name: "Đinh Thị Huyền",
      birth_year: 1972,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_hai_r:Person
    {
      id: "P_D23_HAI_R",
      full_name: "Vũ Hồng Hải",
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_phuong_linh:Person
    {
      id: "P_D23_PHUONG_L",
      full_name: "Đinh Thị Phương",
      birth_year: 1976,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương / Hàn Quốc"
    })

CREATE
  (b2_d23_ma_lam:Person
    {
      id: "P_D23_MA_LAM",
      full_name: "Đinh Mã Lam",
      birth_year: 1978,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_men_lam_w:Person
    {
      id: "P_D23_MA_LAM_W",
      full_name: "Tăng Thị Mến",
      birth_year: 1986,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE
  (b2_d23_ma_long:Person
    {
      id: "P_D23_MA_LONG",
      full_name: "Đinh Mã Long",
      birth_year: 1980,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d23_quynh_long_w:Person
    {
      id: "P_D23_MA_LONG_W",
      full_name: "Đinh Thị Tú Quỳnh",
      birth_year: 1986,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE (b2_d22_linh)-[:FATHER_OF]->(b2_d23_ha_linh)
CREATE (b2_d22_linh)-[:FATHER_OF]->(b2_d23_lam_l)
CREATE (b2_d22_linh)-[:FATHER_OF]->(b2_d23_lai_linh)
CREATE (b2_d22_linh)-[:FATHER_OF]->(b2_d23_bich_linh)
CREATE (b2_d22_linh)-[:FATHER_OF]->(b2_d23_huyen_linh)
CREATE (b2_d22_linh)-[:FATHER_OF]->(b2_d23_phuong_linh)
CREATE (b2_d22_linh)-[:FATHER_OF]->(b2_d23_ma_lam)
CREATE (b2_d22_linh)-[:FATHER_OF]->(b2_d23_ma_long)

CREATE (b2_d23_man_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_ha_linh)
CREATE (b2_d23_lam_l)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_ngan_lam_w)
CREATE (b2_d23_than_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_lai_linh)
CREATE (b2_d23_vinh_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_bich_linh)
CREATE (b2_d23_hai_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_huyen_linh)
CREATE (b2_d23_ma_lam)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_men_lam_w)
CREATE (b2_d23_ma_long)-[:MARRIED_TO {marriage_order: 1}]->(b2_d23_quynh_long_w)

// ==============================================================================
// 5. ĐỜI 24: CÁC CHÁU NỘI NGOẠI CHI 2
// ==============================================================================

// --- CON ÔNG ĐINH VĂN SAO ---
CREATE
  (b2_d24_hang_sao:Person
    {
      id: "P_D24_HANG_S",
      full_name: "Đinh Thanh Hằng",
      birth_year: 1989,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_bang_r:Person
    {
      id: "P_D24_BANG_R",
      full_name: "Phạm Xuân Bằng",
      birth_year: 1985,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_hieu_sao:Person
    {
      id: "P_D24_HIEU_S",
      full_name: "Đinh Hải Hiếu",
      birth_year: 1994,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      title: "Đảng viên ĐCSVN",
      hometown: "TP Hải Dương"
    })
CREATE (b2_d23_sao)-[:FATHER_OF]->(b2_d24_hang_sao)
CREATE (b2_d23_sao)-[:FATHER_OF]->(b2_d24_hieu_sao)
CREATE (b2_d23_ha_sao_w)-[:MOTHER_OF]->(b2_d24_hang_sao)
CREATE (b2_d23_ha_sao_w)-[:MOTHER_OF]->(b2_d24_hieu_sao)
CREATE (b2_d24_bang_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d24_hang_sao)

// --- CON ÔNG ĐINH VĂN THANH ---
CREATE
  (b2_d24_nga_thanh:Person
    {
      id: "P_D24_NGA_T",
      full_name: "Đinh Thị Hằng Nga",
      birth_year: 1989,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_duc_r2:Person
    {
      id: "P_D24_DUC_R2",
      full_name: "Trương Công Đức",
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_binh_thanh:Person
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
  (b2_d24_lan_binh_w:Person
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

CREATE (b2_d23_thanh)-[:FATHER_OF]->(b2_d24_nga_thanh)
CREATE (b2_d23_thanh)-[:FATHER_OF]->(b2_d24_binh_thanh)
CREATE (b2_d23_hoan_thanh_w)-[:MOTHER_OF]->(b2_d24_nga_thanh)
CREATE (b2_d23_hoan_thanh_w)-[:MOTHER_OF]->(b2_d24_binh_thanh)
CREATE (b2_d24_duc_r2)-[:MARRIED_TO {marriage_order: 1}]->(b2_d24_nga_thanh)
CREATE
  (b2_d24_binh_thanh)-[:MARRIED_TO {marriage_order: 1}]->(b2_d24_lan_binh_w)

// --- CON ÔNG ĐINH DANH VĨNH ---
CREATE
  (b2_d24_quyen_anh:Person
    {
      id: "P_D24_QUYEN_A",
      full_name: "Đinh Quyền Anh",
      birth_year: 1983,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP.HCM"
    })
CREATE
  (b2_d24_chi_quyen_w:Person
    {
      id: "P_D24_QUYEN_W",
      full_name: "Phạm Thị Kim Chi",
      birth_year: 1984,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP.HCM"
    })
CREATE
  (b2_d24_kim_anh:Person
    {
      id: "P_D24_KIM_A",
      full_name: "Đinh Thị Kim Anh",
      birth_year: 1988,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP.HCM"
    })
CREATE
  (b2_d24_loc_r:Person
    {
      id: "P_D24_LOC_R",
      full_name: "Nguyễn Vinh Lộc",
      birth_year: 1984,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP.HCM"
    })

CREATE (b2_d23_vinh)-[:FATHER_OF]->(b2_d24_quyen_anh)
CREATE (b2_d23_vinh)-[:FATHER_OF]->(b2_d24_kim_anh)
CREATE (b2_d23_hao_vinh_w)-[:MOTHER_OF]->(b2_d24_quyen_anh)
CREATE (b2_d23_hao_vinh_w)-[:MOTHER_OF]->(b2_d24_kim_anh)
CREATE
  (b2_d24_quyen_anh)-[:MARRIED_TO {marriage_order: 1}]->(b2_d24_chi_quyen_w)
CREATE (b2_d24_loc_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d24_kim_anh)

// --- CON ÔNG ĐINH DANH VIỄN ---
CREATE
  (b2_d24_vu_vien:Person
    {
      id: "P_D24_VU_V",
      full_name: "Đinh Đoàn Vũ",
      birth_year: 1988,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_phuong_vien:Person
    {
      id: "P_D24_PHUONG_V",
      full_name: "Đinh Thúy Phương",
      birth_year: 1990,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_long_r:Person
    {
      id: "P_D24_LONG_R",
      full_name: "Trần Thanh Long",
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE (b2_d23_vien)-[:FATHER_OF]->(b2_d24_vu_vien)
CREATE (b2_d23_vien)-[:FATHER_OF]->(b2_d24_phuong_vien)
CREATE (b2_d23_thoa_vien_w)-[:MOTHER_OF]->(b2_d24_vu_vien)
CREATE (b2_d23_thoa_vien_w)-[:MOTHER_OF]->(b2_d24_phuong_vien)
CREATE (b2_d24_long_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d24_phuong_vien)

// --- CON ÔNG ĐINH DANH GIANG ---
CREATE
  (b2_d24_hang_giang:Person
    {
      id: "P_D24_HANG_G",
      full_name: "Đinh Mai Hằng",
      birth_year: 1996,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "CHLB Đức"
    })
CREATE (b2_d23_giang)-[:FATHER_OF]->(b2_d24_hang_giang)
CREATE (b2_d23_mai_giang_w)-[:MOTHER_OF]->(b2_d24_hang_giang)

// --- CON ÔNG ĐINH DANH SƠN ---
CREATE
  (b2_d24_sinh:Person
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
  (b2_d24_loan_sinh_w:Person
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
CREATE
  (b2_d24_huong_son:Person
    {
      id: "P_D24_HUONG_S",
      full_name: "Đinh Thị Thiên Hương",
      birth_year: 1985,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_tu_r:Person
    {
      id: "P_D24_TU_R",
      full_name: "Nguyễn Văn Tú",
      birth_year: 1983,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_hung_son:Person
    {
      id: "P_D24_HUNG_S",
      full_name: "Đinh Danh Hùng",
      birth_year: 1987,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_thao_hung_w:Person
    {
      id: "P_D24_HUNG_SW",
      full_name: "Vũ Thị Thảo",
      birth_year: 1990,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })

CREATE (b2_d23_son)-[:FATHER_OF]->(b2_d24_sinh)
CREATE (b2_d23_son)-[:FATHER_OF]->(b2_d24_huong_son)
CREATE (b2_d23_son)-[:FATHER_OF]->(b2_d24_hung_son)
CREATE (b2_d23_thu_son_w)-[:MOTHER_OF]->(b2_d24_sinh)
CREATE (b2_d23_thu_son_w)-[:MOTHER_OF]->(b2_d24_huong_son)
CREATE (b2_d23_thu_son_w)-[:MOTHER_OF]->(b2_d24_hung_son)
CREATE (b2_d24_sinh)-[:MARRIED_TO {marriage_order: 1}]->(b2_d24_loan_sinh_w)
CREATE (b2_d24_tu_r)-[:MARRIED_TO {marriage_order: 1}]->(b2_d24_huong_son)
CREATE (b2_d24_hung_son)-[:MARRIED_TO {marriage_order: 1}]->(b2_d24_thao_hung_w)

// --- CON ÔNG ĐINH DANH CHÍNH ---
CREATE
  (b2_d24_duong_chinh:Person
    {
      id: "P_D24_DUONG_C",
      full_name: "Đinh Thị Dương",
      birth_year: 1992,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_my_chinh:Person
    {
      id: "P_D24_MY_C",
      full_name: "Đinh Trà My",
      birth_year: 1998,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (b2_d23_chinh)-[:FATHER_OF]->(b2_d24_duong_chinh)
CREATE (b2_d23_chinh)-[:FATHER_OF]->(b2_d24_my_chinh)
CREATE (b2_d23_anh_chinh_w1)-[:MOTHER_OF]->(b2_d24_duong_chinh)
CREATE (b2_d23_oanh_chinh_w2)-[:MOTHER_OF]->(b2_d24_my_chinh)

// --- CON ÔNG ĐINH DANH HỢP ---
CREATE
  (b2_d24_phuong_hop:Person
    {
      id: "P_D24_PHUONG_H",
      full_name: "Đinh Thị Minh Phượng",
      birth_year: 1996,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (b2_d23_hop)-[:FATHER_OF]->(b2_d24_phuong_hop)
CREATE (b2_d23_hang_hop_w)-[:MOTHER_OF]->(b2_d24_phuong_hop)

// --- CON ÔNG ĐINH DANH THI ---
CREATE
  (b2_d24_ngoc_thi:Person
    {
      id: "P_D24_NGOC_T",
      full_name: "Đinh Thị Hồng Ngọc",
      birth_year: 2005,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      title: "Đảng viên ĐCSVN, Sinh viên Đại học",
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_thuy_thi:Person
    {
      id: "P_D24_THUY_T",
      full_name: "Đinh Thị Hồng Thúy",
      birth_year: 2007,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_van_thi:Person
    {
      id: "P_D24_VAN_T",
      full_name: "Đinh Thị Hồng Vân",
      birth_year: 2013,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_duy_thi:Person
    {
      id: "P_D24_DUY_T",
      full_name: "Đinh Đức Duy",
      birth_year: 2016,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (b2_d23_thi)-[:FATHER_OF]->(b2_d24_ngoc_thi)
CREATE (b2_d23_thi)-[:FATHER_OF]->(b2_d24_thuy_thi)
CREATE (b2_d23_thi)-[:FATHER_OF]->(b2_d24_van_thi)
CREATE (b2_d23_thi)-[:FATHER_OF]->(b2_d24_duy_thi)
CREATE (b2_d23_nguyen_thi_w)-[:MOTHER_OF]->(b2_d24_ngoc_thi)
CREATE (b2_d23_nguyen_thi_w)-[:MOTHER_OF]->(b2_d24_thuy_thi)
CREATE (b2_d23_nguyen_thi_w)-[:MOTHER_OF]->(b2_d24_van_thi)
CREATE (b2_d23_nguyen_thi_w)-[:MOTHER_OF]->(b2_d24_duy_thi)

// --- CON ÔNG ĐINH DANH LÂM, MÃ LAM, MÃ LONG ---
CREATE
  (b2_d24_phong_lam:Person
    {
      id: "P_D24_PHONG_L",
      full_name: "Đinh Danh Phong",
      alias_name: "Đinh Duy Phong",
      birth_year: 1995,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_mai_lam:Person
    {
      id: "P_D24_MAI_LAM",
      full_name: "Đinh Thị Mai",
      birth_year: 2006,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (b2_d23_lam_l)-[:FATHER_OF]->(b2_d24_phong_lam)
CREATE (b2_d23_lam_l)-[:FATHER_OF]->(b2_d24_mai_lam)
CREATE (b2_d23_ngan_lam_w)-[:MOTHER_OF]->(b2_d24_phong_lam)
CREATE (b2_d23_ngan_lam_w)-[:MOTHER_OF]->(b2_d24_mai_lam)

CREATE
  (b2_d24_son_ma:Person
    {
      id: "P_D24_SON_MA",
      full_name: "Đinh Tùng Sơn",
      birth_year: 2009,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_duong_ma:Person
    {
      id: "P_D24_DUONG_MA",
      full_name: "Đinh Tùng Dương",
      birth_year: 2011,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (b2_d23_ma_lam)-[:FATHER_OF]->(b2_d24_son_ma)
CREATE (b2_d23_ma_lam)-[:FATHER_OF]->(b2_d24_duong_ma)
CREATE (b2_d23_men_lam_w)-[:MOTHER_OF]->(b2_d24_son_ma)
CREATE (b2_d23_men_lam_w)-[:MOTHER_OF]->(b2_d24_duong_ma)

CREATE
  (b2_d24_mai_long:Person
    {
      id: "P_D24_MAI_L",
      full_name: "Đinh Thị Hoàng Mai",
      birth_year: 2010,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_anh_long:Person
    {
      id: "P_D24_ANH_L",
      full_name: "Đinh Ngọc Anh",
      birth_year: 2017,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE
  (b2_d24_dung_long:Person
    {
      id: "P_D24_DUNG_L",
      full_name: "Đinh Trung Dũng",
      birth_year: 2020,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (b2_d23_ma_long)-[:FATHER_OF]->(b2_d24_mai_long)
CREATE (b2_d23_ma_long)-[:FATHER_OF]->(b2_d24_anh_long)
CREATE (b2_d23_ma_long)-[:FATHER_OF]->(b2_d24_dung_long)
CREATE (b2_d23_quynh_long_w)-[:MOTHER_OF]->(b2_d24_mai_long)
CREATE (b2_d23_quynh_long_w)-[:MOTHER_OF]->(b2_d24_anh_long)
CREATE (b2_d23_quynh_long_w)-[:MOTHER_OF]->(b2_d24_dung_long)

// ==============================================================================
// 6. ĐỜI 25: HẬU DUỆ ĐỜI THỨ 25 CỦA CHI 2
// ==============================================================================

// --- CON ÔNG ĐINH THANH BÌNH ---
CREATE
  (b2_d25_long:Person
    {
      id: "P_D25_LONG",
      full_name: "Đinh Gia Long",
      birth_year: 2024,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (b2_d24_binh_thanh)-[:FATHER_OF]->(b2_d25_long)
CREATE (b2_d24_lan_binh_w)-[:MOTHER_OF]->(b2_d25_long)

// --- CON ÔNG ĐINH QUYỀN ANH ---
CREATE
  (b2_d25_quang:Person
    {
      id: "P_D25_QUANG",
      full_name: "Đinh Anh Quang",
      birth_year: 2011,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "TP.HCM"
    })
CREATE
  (b2_d25_minh_qa:Person
    {
      id: "P_D25_MINH_QA",
      full_name: "Đinh Anh Minh",
      birth_year: 2011,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "TP.HCM"
    })
CREATE
  (b2_d25_phuc_qa:Person
    {
      id: "P_D25_PHUC_QA",
      full_name: "Đinh Anh Phúc",
      birth_year: 2019,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "TP.HCM"
    })
CREATE (b2_d24_quyen_anh)-[:FATHER_OF]->(b2_d25_quang)
CREATE (b2_d24_quyen_anh)-[:FATHER_OF]->(b2_d25_minh_qa)
CREATE (b2_d24_quyen_anh)-[:FATHER_OF]->(b2_d25_phuc_qa)
CREATE (b2_d24_chi_quyen_w)-[:MOTHER_OF]->(b2_d25_quang)
CREATE (b2_d24_chi_quyen_w)-[:MOTHER_OF]->(b2_d25_minh_qa)
CREATE (b2_d24_chi_quyen_w)-[:MOTHER_OF]->(b2_d25_phuc_qa)

// --- CON ÔNG ĐINH DANH SINH ---
CREATE
  (b2_d25_nhi:Person
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
  (b2_d25_han:Person
    {
      id: "P_D25_HAN",
      full_name: "Đinh Bảo Hân",
      birth_year: 2021,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Hải Dương"
    })
CREATE (b2_d24_sinh)-[:FATHER_OF]->(b2_d25_nhi)
CREATE (b2_d24_sinh)-[:FATHER_OF]->(b2_d25_han)
CREATE (b2_d24_loan_sinh_w)-[:MOTHER_OF]->(b2_d25_nhi)
CREATE (b2_d24_loan_sinh_w)-[:MOTHER_OF]->(b2_d25_han);