// ==============================================================================
// PHẦN 5: CHI 4 (KHAI HOANG TÂY BẮC: LAI CHÂU - ĐIỆN BIÊN - ĐẮK NÔNG)
// Nhánh Cụ Đinh Danh Liệu -> Cụ Liêm, Cụ Đỗ -> Đời 22, 23, 24, 25
// ==============================================================================
// ==============================================================================
// 1. TẠO CỤ KHỞI TỔ CHI 4 (ĐỜI 20) & NỐI VỚI ĐỜI 19 (CỤ DƯƠNG & BÀ DÂU)
// ==============================================================================
CREATE
  (b4_d20_lieu:Person
    {
      id: "P_D20_LIEU",
      full_name: "Đinh Danh Liệu",
      gender: "MALE",
      generation: 20,
      is_alive: false,
      title: "Khởi tổ Chi 4",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Ra đi ngày 10/2 năm Pháp đánh Lạng Sơn, sau đó không rõ tin tức phần mộ.",
      note: "Vợ là Hoàng Thị Duyên ở nhà nuôi 2 con trai (Liêm, Đỗ)."
    })
CREATE
  (b4_d20_duyen:Person
    {
      id: "P_D20_LIEU_W",
      full_name: "Hoàng Thị Duyên",
      gender: "FEMALE",
      in_law: true,
      generation: 20,
      is_alive: false,
      lunar_death_day: "21/02",
      hometown: "Xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography: "Mất ngày 21/02 Nhâm Tý (1972).",
      note: "Mộ để tại Đầu Cừ, xứ Bà Lễ, xã Chi Lăng."
    })

WITH b4_d20_lieu, b4_d20_duyen
MATCH (d19_duong:Person {id: "P_D19_DUONG"})
MATCH (d19_duong_w:Person {id: "P_D19_DUONG_W"})
CREATE (d19_duong)-[:FATHER_OF]->(b4_d20_lieu)
CREATE (d19_duong_w)-[:MOTHER_OF]->(b4_d20_lieu)
CREATE (b4_d20_lieu)-[:MARRIED_TO {marriage_order: 1}]->(b4_d20_duyen)

// ==============================================================================
// 2. ĐỜI 21: CÁC CON CỦA CỤ ĐINH DANH LIỆU (2 TRAI, 1 GÁI)
// ==============================================================================

// --- 1. CỤ ĐINH DANH LIÊM ---
CREATE
  (b4_d21_liem:Person
    {
      id: "P_D21_LIEM",
      full_name: "Đinh Danh Liêm",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      title: "Khai hoang kinh tế mới Tây Bắc (1964)",
      birth_year: 1906,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Bính Ngọ (1906). Năm 1964 đưa cả gia đình rời quê hương Chi Lăng lên khai hoang xây dựng vùng kinh tế mới tại huyện Sìn Hồ, tỉnh Lai Châu. Mất ngày 08/7/1994, thọ 88 tuổi. Sinh được 5 con trai, 1 con gái: Chiến, Phương, Cúc, Tư, Năm, Sáu.",
      note: "Mộ để tại nghĩa trang Bản Khá, phường Nam Thanh, TP Điện Biên Phủ."
    })
CREATE
  (b4_d21_han_w:Person
    {
      id: "P_D21_LIEM_W",
      full_name: "Nguyễn Thị Hân",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      birth_year: 1923,
      hometown: "Xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Quý Hợi (1923). Cùng chồng và các con lên Tây Bắc xây dựng kinh tế mới. Mất ngày 25/11/2007, thọ 86 tuổi.",
      note: "Mộ để tại nghĩa trang Bản Khá, phường Nam Thanh, TP Điện Biên Phủ."
    })

// --- 2. CỤ ĐINH DANH ĐỖ ---
CREATE
  (b4_d21_do:Person
    {
      id: "P_D21_DO",
      full_name: "Đinh Danh Đỗ",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      lunar_death_day: "16/11",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Mất ngày 16 tháng 11 Âm lịch. Sinh được 2 con gái: Khoai, Lụa.",
      note: "Mộ để tại xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình."
    })
CREATE
  (b4_d21_gai_do_w:Person
    {
      id: "P_D21_DO_W",
      full_name: "Nguyễn Thị Gái",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      lunar_death_day: "06/12",
      hometown: "Xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Mất ngày 06 tháng 12 Âm lịch. Cùng gia đình đi xây dựng kinh tế mới ở vùng Tây Bắc.",
      note:
        "Mộ để tại nghĩa trang Khe Chít, phường Noong Bua, TP Điện Biên Phủ."
    })

// --- 3. BÀ ĐINH THỊ GÁI ---
CREATE
  (b4_d21_gai_lieu:Person
    {
      id: "P_D21_GAI_L",
      full_name: "Đinh Thị Gái",
      gender: "FEMALE",
      generation: 21,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Lấy chồng người xã Hòa Bình, huyện Thường Tín, TP Hà Nội. Sinh được 2 con trai là Sơn và Thủy."
    })

CREATE (b4_d20_lieu)-[:FATHER_OF]->(b4_d21_liem)
CREATE (b4_d20_lieu)-[:FATHER_OF]->(b4_d21_do)
CREATE (b4_d20_lieu)-[:FATHER_OF]->(b4_d21_gai_lieu)
CREATE (b4_d20_duyen)-[:MOTHER_OF]->(b4_d21_liem)
CREATE (b4_d20_duyen)-[:MOTHER_OF]->(b4_d21_do)
CREATE (b4_d20_duyen)-[:MOTHER_OF]->(b4_d21_gai_lieu)

CREATE (b4_d21_liem)-[:MARRIED_TO {marriage_order: 1}]->(b4_d21_han_w)
CREATE (b4_d21_do)-[:MARRIED_TO {marriage_order: 1}]->(b4_d21_gai_do_w)

// ==============================================================================
// 3. ĐỜI 22: CON CÁI CÁC CỤ LIÊM VÀ ĐỖ
// ==============================================================================

// --- CON CỤ ĐINH DANH LIÊM (5 TRAI, 1 GÁI) ---
// 1. Ông Đinh Danh Chiến
CREATE
  (b4_d22_chien:Person
    {
      id: "P_D22_CHIEN",
      full_name: "Đinh Danh Chiến",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      birth_year: 1946,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Bính Tuất (1946). Mất ngày 02 tháng 10 năm 1984. Sinh được 3 con trai, 2 con gái: Thắng, Huế, Quyết, Thương (Hợi), Thành.",
      note: "Mộ để tại nghĩa trang Bản Khá, phường Nam Thanh, TP Điện Biên Phủ."
    })
CREATE
  (b4_d22_thin_w:Person
    {
      id: "P_D22_CHIEN_W",
      full_name: "Nguyễn Thị Thìn",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      birth_year: 1952,
      hometown: "Làng Kênh, xã Tây Đô, huyện Hưng Hà, tỉnh Thái Bình",
      note: "Cư trú tại tỉnh Điện Biên."
    })

// 2. Ông Đinh Danh Phương
CREATE
  (b4_d22_phuong:Person
    {
      id: "P_D22_PHUONG",
      full_name: "Đinh Danh Phương",
      gender: "MALE",
      generation: 22,
      is_alive: true,
      current_residence: "Lai Châu",
      title: "Cán bộ hưu trí, Đảng viên ĐCSVN, Đại diện Chi 4",
      birth_year: 1953,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Quý Tỵ (1953). Đảng viên ĐCSVN, cán bộ nghỉ hưu tại xã Sà Dề Phìn, huyện Sìn Hồ, tỉnh Lai Châu. Là người cao niên đại diện Chi 4 thu thập thông tin phả hệ. Sinh được 2 con trai, 2 con gái: Hùng, Bình, Thanh, Thủy.",
      note: "Cư trú tại xã Sà Dề Phìn, Sìn Hồ, Lai Châu."
    })
CREATE
  (b4_d22_mai_p_w:Person
    {
      id: "P_D22_PHUONG_W",
      full_name: "Đỗ Thị Mai",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      birth_year: 1953,
      hometown: "Xã Lô Giang, huyện Đông Hưng, tỉnh Thái Bình",
      biography:
        "Sinh ngày 10/02/1953 (Quý Tỵ), quê xã Lô Giang (vùng đất cổ phái 2 họ Đinh). Cư trú tại Sà Dề Phìn, Sìn Hồ, Lai Châu."
    })

// 3. Bà Đinh Thị Cúc
CREATE
  (b4_d22_cuc_l:Person
    {
      id: "P_D22_CUC_L",
      full_name: "Đinh Thị Cúc",
      birth_year: 1956,
      gender: "FEMALE",
      generation: 22,
      is_alive: true,
      title: "Giáo viên nghỉ hưu",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 22/10/1956 (Bính Thân), giáo viên nghỉ hưu. Sinh được 1 con trai, 1 con gái: Nguyễn Thị Nhung, Nguyễn Văn Quang.",
      note: "Cư trú tại Tổ 5, phường Nam Thanh, TP Điện Biên Phủ."
    })
CREATE
  (b4_d22_cuc_r:Person
    {
      id: "P_D22_CUC_R",
      full_name: "Ông Rể họ Nguyễn (Điện Biên)",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      hometown: "Tỉnh Điện Biên"
    })

// 4. Ông Đinh Danh Tư
CREATE
  (b4_d22_tu:Person
    {
      id: "P_D22_TU",
      full_name: "Đinh Danh Tư",
      gender: "MALE",
      generation: 22,
      is_alive: true,
      current_residence: "Lai Châu",
      title:
        "Chủ tịch Hội Nông dân xã Sà Dề Phìn (1995 - 2010), Đảng viên ĐCSVN",
      birth_year: 1957,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh ngày 04/6/1957 (Đinh Dậu). Đảng viên ĐCSVN, nguyên Chủ tịch Hội Nông dân tập thể xã Sà Dề Phìn (1995 - 2010). Sinh được 1 con trai, 2 con gái: Hiền, Huệ, Toàn.",
      note: "Cư trú tại xã Sà Dề Phìn, Sìn Hồ, Lai Châu."
    })
CREATE
  (b4_d22_hien_tu_w:Person
    {
      id: "P_D22_TU_W",
      full_name: "Vũ Thị Hiên",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      birth_year: 1962,
      hometown: "Xã An Mỹ, huyện Quỳnh Phụ, tỉnh Thái Bình",
      biography:
        "Sinh ngày 21/9/1962 (Nhâm Dần). Công nhân nghỉ hưu, cư trú tại Sà Dề Phìn, Sìn Hồ, Lai Châu."
    })

// 5. Ông Đinh Danh Năm
CREATE
  (b4_d22_nam:Person
    {
      id: "P_D22_NAM",
      full_name: "Đinh Danh Năm",
      gender: "MALE",
      generation: 22,
      is_alive: true,
      current_residence: "Đắk Nông",
      birth_year: 1962,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh ngày 05/10/1962. Từng ở Sìn Hồ, Lai Châu sau đó chuyển vào Đắk Nông lập nghiệp. Sinh được 1 con trai, 1 con gái: Nam, Lệ."
    })
CREATE
  (b4_d22_lai_w:Person
    {
      id: "P_D22_NAM_W",
      full_name: "Tấn Mí Lại",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      hometown: "Huyện Sìn Hồ, tỉnh Lai Châu",
      note: "Cùng chồng sinh sống tại Đắk Nông."
    })

// 6. Ông Đinh Danh Sáu
CREATE
  (b4_d22_sau:Person
    {
      id: "P_D22_SAU",
      full_name: "Đinh Danh Sáu",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      birth_year: 1966,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      note:
        "Sinh năm 1966, mất năm 12 tuổi. Mộ tại nghĩa trang Bản Khá, phường Nam Thanh, TP Điện Biên Phủ."
    })

CREATE (b4_d21_liem)-[:FATHER_OF]->(b4_d22_chien)
CREATE (b4_d21_liem)-[:FATHER_OF]->(b4_d22_phuong)
CREATE (b4_d21_liem)-[:FATHER_OF]->(b4_d22_cuc_l)
CREATE (b4_d21_liem)-[:FATHER_OF]->(b4_d22_tu)
CREATE (b4_d21_liem)-[:FATHER_OF]->(b4_d22_nam)
CREATE (b4_d21_liem)-[:FATHER_OF]->(b4_d22_sau)

CREATE (b4_d21_han_w)-[:MOTHER_OF]->(b4_d22_chien)
CREATE (b4_d21_han_w)-[:MOTHER_OF]->(b4_d22_phuong)
CREATE (b4_d21_han_w)-[:MOTHER_OF]->(b4_d22_cuc_l)
CREATE (b4_d21_han_w)-[:MOTHER_OF]->(b4_d22_tu)
CREATE (b4_d21_han_w)-[:MOTHER_OF]->(b4_d22_nam)
CREATE (b4_d21_han_w)-[:MOTHER_OF]->(b4_d22_sau)

CREATE (b4_d22_chien)-[:MARRIED_TO {marriage_order: 1}]->(b4_d22_thin_w)
CREATE (b4_d22_phuong)-[:MARRIED_TO {marriage_order: 1}]->(b4_d22_mai_p_w)
CREATE (b4_d22_cuc_r)-[:MARRIED_TO {marriage_order: 1}]->(b4_d22_cuc_l)
CREATE (b4_d22_tu)-[:MARRIED_TO {marriage_order: 1}]->(b4_d22_hien_tu_w)
CREATE (b4_d22_nam)-[:MARRIED_TO {marriage_order: 1}]->(b4_d22_lai_w)

// --- CON CỤ ĐINH DANH ĐỖ (2 CON GÁI & RỂ) ---
CREATE
  (b4_d22_khoai:Person
    {
      id: "P_D22_KHOAI",
      full_name: "Đinh Thị Khoai",
      gender: "FEMALE",
      generation: 22,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      note: "Cùng chồng con sinh sống tại tỉnh Điện Biên."
    })
CREATE
  (b4_d22_quynh_r:Person
    {
      id: "P_D22_QUYNH_R",
      full_name: "Hoàng Đình Quynh",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      hometown: "Tỉnh Điện Biên"
    })

CREATE
  (b4_d22_lua:Person
    {
      id: "P_D22_LUA",
      full_name: "Đinh Thị Lụa",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      note:
        "Đã mất. Mộ để tại nghĩa trang Bản Xá, phường Nam Thanh, TP Điện Biên Phủ."
    })

CREATE (b4_d21_do)-[:FATHER_OF]->(b4_d22_khoai)
CREATE (b4_d21_do)-[:FATHER_OF]->(b4_d22_lua)
CREATE (b4_d21_gai_do_w)-[:MOTHER_OF]->(b4_d22_khoai)
CREATE (b4_d21_gai_do_w)-[:MOTHER_OF]->(b4_d22_lua)
CREATE (b4_d22_quynh_r)-[:MARRIED_TO {marriage_order: 1}]->(b4_d22_khoai)

// ==============================================================================
// 4. ĐỜI 23: CÁC CON CỦA CÁC ÔNG CHIẾN, PHƯƠNG, TƯ, NĂM
// ==============================================================================

// --- 1. CON ÔNG ĐINH DANH CHIẾN (3 TRAI, 2 GÁI & DÂU) ---
CREATE
  (b4_d23_thang:Person
    {
      id: "P_D23_THANG",
      full_name: "Đinh Danh Thắng",
      birth_year: 1975,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Đắk Nông",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh ngày 05/10/1975 (Ất Mão). Cư trú tại xã Quảng Tâm, huyện Tuy Đức, tỉnh Đắk Nông. Sinh được 2 con trai: Hiếu, Trung."
    })
CREATE
  (b4_d23_tho_w:Person
    {
      id: "P_D23_THANG_W",
      full_name: "Ngô Thị Thọ",
      birth_year: 1976,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "Xã Quảng Tâm, huyện Tuy Đức, tỉnh Đắk Nông"
    })

CREATE
  (b4_d23_hue_c:Person
    {
      id: "P_D23_HUE_C",
      full_name: "Đinh Thị Huế",
      birth_year: 1978,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 20/8/1978 (Mậu Ngọ). Cư trú tại xã Sà Dề Phìn, Sìn Hồ, Lai Châu."
    })

CREATE
  (b4_d23_quyet:Person
    {
      id: "P_D23_QUYET",
      full_name: "Đinh Danh Quyết",
      birth_year: 1980,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Lai Châu",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh ngày 20/8/1980 (Canh Thân). Cư trú tại xã Sà Dề Phìn, Sìn Hồ, Lai Châu. Sinh được 1 con trai, 1 con gái: Tâm, Nghĩa."
    })
CREATE
  (b4_d23_chuyen_w:Person
    {
      id: "P_D23_QUYET_W",
      full_name: "Lù Thị Chuyên",
      birth_year: 1988,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "Xã Sà Dề Phìn, huyện Sìn Hồ, tỉnh Lai Châu",
      biography: "Sinh ngày 12/11/1988."
    })

CREATE
  (b4_d23_hoi_c:Person
    {
      id: "P_D23_HOI_C",
      full_name: "Đinh Thị Hợi",
      alias_name: "Thương",
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })

CREATE
  (b4_d23_thanh4:Person
    {
      id: "P_D23_THANH4",
      full_name: "Đinh Danh Thành",
      birth_year: 1985,
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Lai Châu",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh tháng 01 năm 1985 (Ất Sửu). Cư trú tại xã Pa Khóa, Sìn Hồ, Lai Châu. Sinh được 1 con trai: Đinh Danh Quân."
    })
CREATE
  (b4_d23_lan_anh_w:Person
    {
      id: "P_D23_THANH4_W",
      full_name: "Nguyễn Lan Anh",
      birth_year: 1988,
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      title: "Giáo viên tiểu học, Đảng viên ĐCSVN",
      hometown: "Xã Pa Khóa, huyện Sìn Hồ, tỉnh Lai Châu",
      biography:
        "Sinh năm 1988 (Mậu Thìn). Đảng viên ĐCSVN, giáo viên Trường Tiểu học Pa Khóa."
    })

CREATE (b4_d22_chien)-[:FATHER_OF]->(b4_d23_thang)
CREATE (b4_d22_chien)-[:FATHER_OF]->(b4_d23_hue_c)
CREATE (b4_d22_chien)-[:FATHER_OF]->(b4_d23_quyet)
CREATE (b4_d22_chien)-[:FATHER_OF]->(b4_d23_hoi_c)
CREATE (b4_d22_chien)-[:FATHER_OF]->(b4_d23_thanh4)

CREATE (b4_d22_thin_w)-[:MOTHER_OF]->(b4_d23_thang)
CREATE (b4_d22_thin_w)-[:MOTHER_OF]->(b4_d23_hue_c)
CREATE (b4_d22_thin_w)-[:MOTHER_OF]->(b4_d23_quyet)
CREATE (b4_d22_thin_w)-[:MOTHER_OF]->(b4_d23_hoi_c)
CREATE (b4_d22_thin_w)-[:MOTHER_OF]->(b4_d23_thanh4)

CREATE (b4_d23_thang)-[:MARRIED_TO {marriage_order: 1}]->(b4_d23_tho_w)
CREATE (b4_d23_quyet)-[:MARRIED_TO {marriage_order: 1}]->(b4_d23_chuyen_w)
CREATE (b4_d23_thanh4)-[:MARRIED_TO {marriage_order: 1}]->(b4_d23_lan_anh_w)

// --- 2. CON ÔNG ĐINH DANH PHƯƠNG (2 TRAI, 2 GÁI & DÂU) ---
CREATE
  (b4_d23_hung4:Person
    {
      id: "P_D23_HUNG4",
      full_name: "Đinh Danh Hùng",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Lai Châu",
      title:
        "Phó Trưởng phòng Quản trị Tài vụ - VP UBND tỉnh Lai Châu, Đảng viên ĐCSVN",
      birth_year: 1972,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh ngày 22/12/1972. Đảng viên ĐCSVN, trình độ Đại học, Phó Trưởng phòng Quản trị Tài vụ - Văn phòng UBND tỉnh Lai Châu. Sinh được 2 con trai: Hoàng, Hưng."
    })
CREATE
  (b4_d23_giang_h_w:Person
    {
      id: "P_D23_HUNG4_W",
      full_name: "Nguyễn Trà Giang",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      title: "Phó Hiệu trưởng Trường Mầm non Lậm Cần, Đảng viên ĐCSVN",
      birth_year: 1983,
      hometown: "Huyện Tân Uyên, tỉnh Lai Châu",
      biography:
        "Sinh ngày 30/5/1983. Đảng viên ĐCSVN, trình độ Đại học, Phó Hiệu trưởng Trường Mầm non Lậm Cần, huyện Tân Uyên, Lai Châu."
    })

CREATE
  (b4_d23_binh_p:Person
    {
      id: "P_D23_BINH_P",
      full_name: "Đinh Danh Bình",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Lai Châu",
      title: "Kế toán Trường THCS Quyết Thắng, Đảng viên ĐCSVN",
      birth_year: 1975,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh ngày 22/12/1975 (Giáp Dần). Đảng viên ĐCSVN, Trung cấp Kế toán, công tác tại Trường THCS Quyết Thắng, TP Lai Châu. Sinh được 1 con trai, 1 con gái: Thăng, Thảo."
    })
CREATE
  (b4_d23_tham_binh_w:Person
    {
      id: "P_D23_BINH_W",
      full_name: "Nguyễn Thị Thắm",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      title:
        "Bác sĩ Trung tâm Kiểm soát bệnh tật tỉnh Lai Châu, Đảng viên ĐCSVN",
      birth_year: 1980,
      hometown: "Xã Nhân Khang, huyện Lý Nhân, tỉnh Hà Nam",
      biography:
        "Sinh ngày 03/10/1980 (Canh Thân). Đảng viên ĐCSVN, tốt nghiệp Đại học Y khoa, công tác tại Trung tâm Kiểm soát bệnh tật tỉnh Lai Châu."
    })

CREATE
  (b4_d23_thanh_f:Person
    {
      id: "P_D23_THANH_F",
      full_name: "Đinh Thị Thanh",
      birth_year: 1978,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      title: "Cử nhân Y tế Công cộng, CDC tỉnh Lai Châu",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 22/6/1978. Trình độ Đại học Y tế Công cộng, viên chức Trung tâm Kiểm soát bệnh tật tỉnh Lai Châu. Nhà ở TP Lai Châu."
    })

CREATE
  (b4_d23_thuy_f:Person
    {
      id: "P_D23_THUY_F",
      full_name: "Đinh Thị Thủy",
      birth_year: 1981,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      title: "Giáo viên Ngữ văn, Đảng viên ĐCSVN",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 22/12/1981 (Tân Dậu). Đảng viên ĐCSVN, Đại học Ngữ văn, giáo viên tại TP Lai Châu. Nhà ở Tổ 16, TP Lai Châu."
    })

CREATE (b4_d22_phuong)-[:FATHER_OF]->(b4_d23_hung4)
CREATE (b4_d22_phuong)-[:FATHER_OF]->(b4_d23_binh_p)
CREATE (b4_d22_phuong)-[:FATHER_OF]->(b4_d23_thanh_f)
CREATE (b4_d22_phuong)-[:FATHER_OF]->(b4_d23_thuy_f)

CREATE (b4_d22_mai_p_w)-[:MOTHER_OF]->(b4_d23_hung4)
CREATE (b4_d22_mai_p_w)-[:MOTHER_OF]->(b4_d23_binh_p)
CREATE (b4_d22_mai_p_w)-[:MOTHER_OF]->(b4_d23_thanh_f)
CREATE (b4_d22_mai_p_w)-[:MOTHER_OF]->(b4_d23_thuy_f)

CREATE (b4_d23_hung4)-[:MARRIED_TO {marriage_order: 1}]->(b4_d23_giang_h_w)
CREATE (b4_d23_binh_p)-[:MARRIED_TO {marriage_order: 1}]->(b4_d23_tham_binh_w)

// --- 3. CON ÔNG ĐINH DANH TƯ (1 TRAI, 2 GÁI & DÂU) ---
CREATE
  (b4_d23_hien_tu:Person
    {
      id: "P_D23_HIEN_TU",
      full_name: "Đinh Thị Hiền",
      birth_year: 1982,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      title: "CĐ Sư phạm Mầm non",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 18/4/1982 (Nhâm Tuất). Tốt nghiệp Cao đẳng Sư phạm Mầm non, hiện sinh sống và làm việc tại Tây Mỗ, quận Nam Từ Liêm, TP Hà Nội."
    })

CREATE
  (b4_d23_hue_tu:Person
    {
      id: "P_D23_HUE_TU",
      full_name: "Đinh Thị Huệ",
      birth_year: 1984,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      title: "Cán bộ Cục A70 - Tổng cục An ninh (Bộ Công an), Đảng viên ĐCSVN",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 06/12/1984 (Giáp Tý). Đảng viên ĐCSVN, trình độ Đại học, cán bộ Cục A70 - Bộ Công an. Nhà ở Vân Tảo, Thường Tín, TP Hà Nội."
    })

CREATE
  (b4_d23_toan:Person
    {
      id: "P_D23_TOAN",
      full_name: "Đinh Danh Toàn",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Lai Châu",
      title:
        "ThS Sinh học, Giáo viên THPT Sìn Hồ, Đảng viên ĐCSVN, Đại diện Chi 4",
      birth_year: 1986,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh ngày 26/01/1986 (Bính Dần). Đảng viên ĐCSVN, Thạc sĩ Sinh học thực nghiệm, giáo viên Trường THPT Sìn Hồ. Cùng cụ Phương là đại diện Chi 4 thu thập, số hóa và biên soạn gia phả. Cư trú tại thị trấn Sìn Hồ, Lai Châu. Sinh được 2 con trai, 1 con gái: Đức Anh, Ngân Hà, Danh Phúc."
    })
CREATE
  (b4_d23_ngoc_toan_w:Person
    {
      id: "P_D23_TOAN_W",
      full_name: "Nguyễn Thị Ngọc",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      title: "Giáo viên Trường THCS Làng Mô, Đảng viên ĐCSVN",
      birth_year: 1994,
      hometown: "Huyện Hoa Lư, tỉnh Ninh Bình",
      biography:
        "Sinh ngày 23/02/1994, quê Hoa Lư, Ninh Bình. Đảng viên ĐCSVN, tốt nghiệp Đại học Sư phạm Ngữ văn, giáo viên Trường THCS Làng Mô, huyện Sìn Hồ, Lai Châu."
    })

CREATE (b4_d22_tu)-[:FATHER_OF]->(b4_d23_hien_tu)
CREATE (b4_d22_tu)-[:FATHER_OF]->(b4_d23_hue_tu)
CREATE (b4_d22_tu)-[:FATHER_OF]->(b4_d23_toan)

CREATE (b4_d22_hien_tu_w)-[:MOTHER_OF]->(b4_d23_hien_tu)
CREATE (b4_d22_hien_tu_w)-[:MOTHER_OF]->(b4_d23_hue_tu)
CREATE (b4_d22_hien_tu_w)-[:MOTHER_OF]->(b4_d23_toan)

CREATE (b4_d23_toan)-[:MARRIED_TO {marriage_order: 1}]->(b4_d23_ngoc_toan_w)

// --- 4. CON ÔNG ĐINH DANH NĂM (1 TRAI, 1 GÁI) ---
CREATE
  (b4_d23_nam_c4:Person
    {
      id: "P_D23_NAM_C4",
      full_name: "Đinh Danh Nam",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      current_residence: "Đắk Nông"
    })
CREATE
  (b4_d23_le_c4:Person
    {
      id: "P_D23_LE_C4",
      full_name: "Đinh Thị Lệ",
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      current_residence: "Đắk Nông"
    })

CREATE (b4_d22_nam)-[:FATHER_OF]->(b4_d23_nam_c4)
CREATE (b4_d22_nam)-[:FATHER_OF]->(b4_d23_le_c4)
CREATE (b4_d22_lai_w)-[:MOTHER_OF]->(b4_d23_nam_c4)
CREATE (b4_d22_lai_w)-[:MOTHER_OF]->(b4_d23_le_c4)

// ==============================================================================
// 5. ĐỜI 24: CÁC CHÁU THUỘC CHI 4
// ==============================================================================

// --- CON ÔNG ĐINH DANH THẮNG ---
CREATE
  (b4_d24_hieu_thang:Person
    {
      id: "P_D24_HIEU_C4",
      full_name: "Đinh Danh Hiếu",
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "Xã Quảng Tâm, huyện Tuy Đức, tỉnh Đắk Nông"
    })
CREATE
  (b4_d24_trung_thang:Person
    {
      id: "P_D24_TRUNG_C4",
      full_name: "Đinh Danh Trung",
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "Xã Quảng Tâm, huyện Tuy Đức, tỉnh Đắk Nông"
    })
CREATE (b4_d23_thang)-[:FATHER_OF]->(b4_d24_hieu_thang)
CREATE (b4_d23_thang)-[:FATHER_OF]->(b4_d24_trung_thang)
CREATE (b4_d23_tho_w)-[:MOTHER_OF]->(b4_d24_hieu_thang)
CREATE (b4_d23_tho_w)-[:MOTHER_OF]->(b4_d24_trung_thang)

// --- CON ÔNG ĐINH DANH HÙNG (2 TRAI & DÂU) ---
CREATE
  (b4_d24_hoang_c4:Person
    {
      id: "P_D24_HOANG_C4",
      full_name: "Đinh Danh Hoàng",
      birth_year: 1995,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      title: "Cán bộ Cơ yếu Huyện ủy Tân Uyên (Lai Châu), Đảng viên ĐCSVN",
      hometown: "Tỉnh Lai Châu",
      biography:
        "Sinh ngày 01/01/1995. Đảng viên ĐCSVN, công tác tại Ban Cơ yếu Huyện ủy Tân Uyên, tỉnh Lai Châu."
    })
CREATE
  (b4_d24_nga_hoang_w:Person
    {
      id: "P_D24_HOANG_W",
      full_name: "Hoàng Thị Nga",
      birth_year: 1993,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      title: "CĐ Sư phạm, công tác tại Điện máy xanh TP Lai Châu",
      hometown: "Tỉnh Lai Châu",
      biography:
        "Sinh ngày 13/02/1993. Tốt nghiệp Cao đẳng Sư phạm, làm việc tại Siêu thị Điện máy xanh, TP Lai Châu."
    })
CREATE
  (b4_d24_hung_c4:Person
    {
      id: "P_D24_HUNG_C4",
      full_name: "Đinh Việt Hưng",
      birth_year: 2005,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      title: "Sinh viên Trường Đại học Tài nguyên và Môi trường Hà Nội",
      hometown: "Tỉnh Lai Châu",
      biography:
        "Sinh ngày 28/7/2005. Sinh viên Trường ĐH Tài nguyên & Môi trường Hà Nội."
    })

CREATE (b4_d23_hung4)-[:FATHER_OF]->(b4_d24_hoang_c4)
CREATE (b4_d23_hung4)-[:FATHER_OF]->(b4_d24_hung_c4)
CREATE (b4_d23_giang_h_w)-[:MOTHER_OF]->(b4_d24_hoang_c4)
CREATE (b4_d23_giang_h_w)-[:MOTHER_OF]->(b4_d24_hung_c4)
CREATE (b4_d24_hoang_c4)-[:MARRIED_TO {marriage_order: 1}]->(b4_d24_nga_hoang_w)

// ==============================================================================
// 6. ĐỜI 25: HẬU DUỆ ĐỜI THỨ 25 CỦA CHI 4
// ==============================================================================

// --- CON ÔNG ĐINH DANH BÌNH ---
CREATE
  (b4_d25_thang_b:Person
    {
      id: "P_D25_THANG_B",
      full_name: "Đinh Gia Thăng",
      birth_year: 2016,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Lai Châu",
      biography: "Sinh ngày 11/3/2016 tại TP Lai Châu."
    })
CREATE
  (b4_d25_thao_b:Person
    {
      id: "P_D25_THAO_B",
      full_name: "Đinh Thị Thảo",
      birth_year: 2023,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "TP Lai Châu",
      biography: "Sinh ngày 15/12/2023 tại TP Lai Châu."
    })
CREATE (b4_d23_binh_p)-[:FATHER_OF]->(b4_d25_thang_b)
CREATE (b4_d23_binh_p)-[:FATHER_OF]->(b4_d25_thao_b)
CREATE (b4_d23_tham_binh_w)-[:MOTHER_OF]->(b4_d25_thang_b)
CREATE (b4_d23_tham_binh_w)-[:MOTHER_OF]->(b4_d25_thao_b)

// --- CON ÔNG ĐINH DANH QUYẾT ---
CREATE
  (b4_d25_tam_q:Person
    {
      id: "P_D25_TAM_Q",
      full_name: "Đinh Thị Tâm",
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Xã Sà Dề Phìn, huyện Sìn Hồ, tỉnh Lai Châu"
    })
CREATE
  (b4_d25_nghia_q:Person
    {
      id: "P_D25_NGHIA_Q",
      full_name: "Đinh Danh Nghĩa",
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Xã Sà Dề Phìn, huyện Sìn Hồ, tỉnh Lai Châu"
    })
CREATE (b4_d23_quyet)-[:FATHER_OF]->(b4_d25_tam_q)
CREATE (b4_d23_quyet)-[:FATHER_OF]->(b4_d25_nghia_q)
CREATE (b4_d23_chuyen_w)-[:MOTHER_OF]->(b4_d25_tam_q)
CREATE (b4_d23_chuyen_w)-[:MOTHER_OF]->(b4_d25_nghia_q)

// --- CON ÔNG ĐINH DANH THÀNH ---
CREATE
  (b4_d25_quan_th:Person
    {
      id: "P_D25_QUAN_TH",
      full_name: "Đinh Danh Quân",
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Xã Pa Khóa, huyện Sìn Hồ, tỉnh Lai Châu"
    })
CREATE (b4_d23_thanh4)-[:FATHER_OF]->(b4_d25_quan_th)
CREATE (b4_d23_lan_anh_w)-[:MOTHER_OF]->(b4_d25_quan_th)

// --- CON THS ĐINH DANH TOÀN ---
CREATE
  (b4_d25_anh_t:Person
    {
      id: "P_D25_ANH_T",
      full_name: "Đinh Đức Anh",
      birth_year: 2015,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Thị trấn Sìn Hồ, Lai Châu",
      biography: "Sinh ngày 11/7/2015 tại Lai Châu."
    })
CREATE
  (b4_d25_ha_t:Person
    {
      id: "P_D25_HA_T",
      full_name: "Đinh Ngân Hà",
      birth_year: 2020,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Thị trấn Sìn Hồ, Lai Châu",
      biography: "Sinh ngày 19/5/2020 tại Lai Châu."
    })
CREATE
  (b4_d25_phuc_t:Person
    {
      id: "P_D25_PHUC_T",
      full_name: "Đinh Danh Phúc",
      birth_year: 2022,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Thị trấn Sìn Hồ, Lai Châu",
      biography: "Sinh ngày 18/6/2022 tại Lai Châu."
    })
CREATE (b4_d23_toan)-[:FATHER_OF]->(b4_d25_anh_t)
CREATE (b4_d23_toan)-[:FATHER_OF]->(b4_d25_ha_t)
CREATE (b4_d23_toan)-[:FATHER_OF]->(b4_d25_phuc_t)
CREATE (b4_d23_ngoc_toan_w)-[:MOTHER_OF]->(b4_d25_anh_t)
CREATE (b4_d23_ngoc_toan_w)-[:MOTHER_OF]->(b4_d25_ha_t)
CREATE (b4_d23_ngoc_toan_w)-[:MOTHER_OF]->(b4_d25_phuc_t);