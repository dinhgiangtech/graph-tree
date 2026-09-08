// ==============================================================================
// PHẦN 2: CHI 1 (CHI TRƯỞNG - HÀ NỘI & TP.HCM)
// Nhánh Cụ Đinh Danh Khì -> Cụ Đinh Danh Dụng -> Đời 22, 23, 24, 25
// ==============================================================================
// ==============================================================================
// 1. TẠO CỤ KHỞI TỔ CHI 1 (ĐỜI 20) & NỐI VỚI ĐỜI 19 (CỤ KHƯƠNG & BÀ MÂY)
// ==============================================================================
CREATE
  (b1_d20_khi:Person
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
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Kỷ Dậu (1849). Tính tình liêm khiết, được dân làng quý mến bầu làm Xã Sử nhưng từ chối không nhận vì không muốn khao vọng phiền dân. Mất ngày 3/5 Nhâm Thìn (1892), thọ 45 tuổi.",
      note: "Mộ táng chung cùng vợ tại ruộng Đầu Cừ, xứ Bà Lễ, xã Chi Lăng."
    })
CREATE
  (b1_d20_hien_w:Person
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
      hometown: "Xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      note:
        "Tuổi Đinh Tỵ (1857). Mộ táng chung cùng chồng tại Đầu Cừ, xứ Bà Lễ."
    })

WITH b1_d20_khi, b1_d20_hien_w
MATCH (d19_khuong:Person {id: "P_D19_KHUONG"})
MATCH (d19_may:Person {id: "P_D19_KHUONG_W"})
CREATE (d19_khuong)-[:FATHER_OF]->(b1_d20_khi)
CREATE (d19_may)-[:MOTHER_OF]->(b1_d20_khi)
CREATE (b1_d20_khi)-[:MARRIED_TO {marriage_order: 1}]->(b1_d20_hien_w)

// ==============================================================================
// 2. ĐỜI 21: CÁC CON CỦA CỤ ĐINH DANH KHÌ
// ==============================================================================

// --- 1. CỤ ĐINH DANH DỤNG (2 VỢ) ---
CREATE
  (b1_d21_dung:Person
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
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Đinh Sửu (1877). Từng tham gia phong trào Cần Vương của ông Đốc Nhưỡng chống Pháp. Khi phong trào tan rã, cụ ra thị xã Hải Dương làm ăn và cùng chú ruột Đinh Danh Dục tham gia cúng lễ để che giấu thân phận nghĩa quân. Cụ là người khởi công sưu tầm, ghi chép bản gốc chữ Hán gia phả Ngành 3 Phái 3. Mất ngày 3/10 năm Ất Hợi (1935), thọ 59 tuổi.",
      note: "Mộ để tại núi Voi, Tiên Hội, An Lão, Hải Phòng."
    })
CREATE
  (b1_d21_san_w:Person
    {
      id: "P_D21_DUNG_W1",
      full_name: "Nguyễn Thị San",
      title: "Bà Cả (hiệu Từ Nhàn)",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      birth_year: 1886,
      lunar_death_day: "08/06",
      hometown: "Xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Bính Tuất (1886). Chính thất của cụ Đinh Danh Dụng, sinh được 1 con trai là cụ Đinh Danh Lưu.",
      note: "Mộ để tại xã Chi Lăng."
    })
CREATE
  (b1_d21_y_w:Person
    {
      id: "P_D21_DUNG_W2",
      full_name: "Đào Thị Ý",
      title: "Bà Kế (hiệu Diệu Thành)",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      birth_year: 1891,
      lunar_death_day: "12/10",
      hometown: "Tiên Hội, huyện An Lão, TP Hải Phòng",
      biography:
        "Tuổi Tân Mão (1891). Kế thất của cụ Đinh Danh Dụng, sinh được 2 con trai (Đông, Hoài) và 7 con gái (Đào, Lê, Lựu, Lý, Lan, Cúc, Tính). Mất ngày 12/10 năm Giáp Tuất (1934), thọ 44 tuổi.",
      note: "Mộ để tại núi Voi, Tiên Hội, An Lão, Hải Phòng."
    })

// --- 2. CỤ ĐINH DANH ĐỐI ---
CREATE
  (b1_d21_doi:Person
    {
      id: "P_D21_DOI",
      full_name: "Đinh Danh Đối",
      alias_name: "Phúc Thường",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      birth_year: 1881,
      lunar_death_day: "07/10",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Tân Tỵ (1881). Mất ngày 7/10 năm Tân Mùi (1931), thọ 51 tuổi. Cụ bà là Nguyễn Thị Thuận (giỗ 14/6 Âm lịch). Hai cụ không có con.",
      note: "Mộ để chung một ngôi tại xứ Bà Lễ, xã Chi Lăng."
    })
CREATE
  (b1_d21_thuan_w:Person
    {
      id: "P_D21_DOI_W",
      full_name: "Nguyễn Thị Thuận",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      lunar_death_day: "14/06",
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình"
    })

// --- 3. CỤ ĐINH DANH PHỤNG ---
CREATE
  (b1_d21_phung:Person
    {
      id: "P_D21_PHUNG",
      full_name: "Đinh Danh Phụng",
      alias_name: "Pháp Chính",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      birth_year: 1883,
      lunar_death_day: "04/03",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Quý Mùi (1883). Mất ngày 4/3 năm Ất Dậu (1945), thọ 64 tuổi. Vợ là bà Nguyễn Thị Bồ (hiệu Từ Dụng, sinh 1894, giỗ 11/8 Âm lịch). Hai cụ sinh được 3 con gái.",
      note: "Mộ để tại xã Chi Lăng."
    })
CREATE
  (b1_d21_bo_w:Person
    {
      id: "P_D21_PHUNG_W",
      full_name: "Nguyễn Thị Bồ",
      title: "Hiệu Từ Dụng",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      birth_year: 1894,
      lunar_death_day: "11/08",
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình"
    })

// Nối quan hệ Đời 21 Chi 1
CREATE (b1_d20_khi)-[:FATHER_OF]->(b1_d21_dung)
CREATE (b1_d20_khi)-[:FATHER_OF]->(b1_d21_doi)
CREATE (b1_d20_khi)-[:FATHER_OF]->(b1_d21_phung)
CREATE (b1_d20_hien_w)-[:MOTHER_OF]->(b1_d21_dung)
CREATE (b1_d20_hien_w)-[:MOTHER_OF]->(b1_d21_doi)
CREATE (b1_d20_hien_w)-[:MOTHER_OF]->(b1_d21_phung)

CREATE
  (b1_d21_dung)-[:MARRIED_TO {marriage_order: 1, title: "Bà Cả"}]->
  (b1_d21_san_w)
CREATE
  (b1_d21_dung)-[:MARRIED_TO {marriage_order: 2, title: "Bà Kế"}]->(b1_d21_y_w)
CREATE (b1_d21_doi)-[:MARRIED_TO {marriage_order: 1}]->(b1_d21_thuan_w)
CREATE (b1_d21_phung)-[:MARRIED_TO {marriage_order: 1}]->(b1_d21_bo_w)

// ==============================================================================
// 3. ĐỜI 22: CÁC CON CỦA CỤ ĐINH DANH DỤNG & CỤ ĐINH DANH PHỤNG
// ==============================================================================

// --- CON BÀ CẢ (NGUYỄN THỊ SAN): CỤ ĐINH DANH LƯU (2 VỢ) ---
CREATE
  (b1_d22_luu:Person
    {
      id: "P_D22_LUU",
      full_name: "Đinh Danh Lưu",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      birth_year: 1906,
      lunar_death_day: "14/05",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Bính Ngọ (1906). Con trai trưởng của cụ Dụng. Mất ngày 14/5 năm Bính Tuất (1946), thọ 40 tuổi.",
      note: "Mộ để tại đường Chè Lẽ, phía sau chùa Đún, xã Chi Lăng."
    })
CREATE
  (b1_d22_tam_w:Person
    {
      id: "P_D22_LUU_W1",
      full_name: "Nguyễn Thị Tấm",
      title: "Bà Cả",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      lunar_death_day: "04/06",
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Mất ngày 4/6 năm Quý Hợi (1983). Sinh được 2 con trai: Đinh Danh Đạo, Đinh Gia Hậu.",
      note: "Mộ để tại xã Chi Lăng."
    })
CREATE
  (b1_d22_tieu_w:Person
    {
      id: "P_D22_LUU_W2",
      full_name: "Nguyễn Thị Tiêu",
      title: "Bà Hai",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      birth_year: 1914,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Giáp Dần (1914). Thứ thất của cụ Lưu, sinh được 2 con trai và 1 con gái: Đinh Danh Phái, Đinh Thị Liên, Đinh Danh Khôi."
    })

CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_luu)
CREATE (b1_d21_san_w)-[:MOTHER_OF]->(b1_d22_luu)
CREATE
  (b1_d22_luu)-[:MARRIED_TO {marriage_order: 1, title: "Bà Cả"}]->(b1_d22_tam_w)
CREATE
  (b1_d22_luu)-[:MARRIED_TO {marriage_order: 2, title: "Bà Hai"}]->
  (b1_d22_tieu_w)

// --- CON BÀ KẾ (ĐÀO THỊ Ý): 2 TRAI, 7 GÁI ---
// 1. Cụ Đinh Văn Đông
CREATE
  (b1_d22_dong:Person
    {
      id: "P_D22_DONG",
      full_name: "Đinh Văn Đông",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      title: "Cử nhân Tài chính, Chuyên viên Bộ Tài chính, Biên soạn Tộc phả",
      birth_year: 1910,
      lunar_death_day: "09/04",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Canh Tuất (1910). Cử nhân Tài chính, Chuyên viên Bộ Tài chính, Đảng viên ĐCSVN. Tinh thông chữ Hán, có công sức to lớn biên soạn bản thảo Đinh Tộc Thế Phả và đề xuất công nhận Từ đường Chi Lăng là di tích lịch sử văn hóa cấp tỉnh. Mất ngày 9/4 năm Canh Ngọ (1990), thọ 80 tuổi.",
      note: "Cư trú tại Hà Nội. Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })
CREATE
  (b1_d22_thoa_w:Person
    {
      id: "P_D22_DONG_W",
      full_name: "Nguyễn Thị Thoa",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      birth_year: 1934,
      hometown: "Huyện Vũ Thư, tỉnh Thái Bình",
      biography:
        "Đảng viên ĐCSVN. Cùng chồng sinh sống tại TP Hà Nội, sinh được 2 con gái: Đinh Thị Thu Nguyệt, Đinh Thu Ban.",
      note: "Mộ để tại nghĩa trang Cầu Cương, TP Hải Dương."
    })

// 2. Các bà con gái cụ Dụng
CREATE
  (b1_d22_dao:Person
    {
      id: "P_D22_DAO",
      full_name: "Đinh Thị Đào",
      birth_year: 1913,
      lunar_death_day: "11/10",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      note:
        "Tuổi Quý Sửu (1913). Không có chồng con. Mất 11/10 Nhâm Tuất (1982), thọ 69 tuổi. Mộ tại Cầu Cương."
    })
CREATE
  (b1_d22_le:Person
    {
      id: "P_D22_LE",
      full_name: "Đinh Thị Lê",
      birth_year: 1919,
      lunar_death_day: "06/01",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      note:
        "Tuổi Kỷ Mùi (1919). Không có chồng con. Mất 6/1 Nhâm Tuất (1982), thọ 63 tuổi. Mộ tại Cầu Cương."
    })

CREATE
  (b1_d22_luu_f:Person
    {
      id: "P_D22_LUU_F",
      full_name: "Đinh Thị Lựu",
      birth_year: 1920,
      lunar_death_day: "26/01",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      note:
        "Tuổi Canh Thân (1920). Mất 26/1 Đinh Hợi (2007), thọ 87 tuổi. Mộ tại Đầu Cừ, xứ Bà Lễ."
    })
CREATE
  (b1_d22_thai_r:Person
    {
      id: "P_D22_THAI_R",
      full_name: "Trần Thái",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })

CREATE
  (b1_d22_ly:Person
    {
      id: "P_D22_LY",
      full_name: "Đinh Thị Lý",
      birth_year: 1922,
      lunar_death_day: "06/06",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      note:
        "Tuổi Nhâm Tuất (1922). Mất 6/6 Ất Mão (1975), thọ 53 tuổi. Mộ tại xã Hòa Bình, Hưng Hà."
    })
CREATE
  (b1_d22_lo_r:Person
    {
      id: "P_D22_LO_R",
      full_name: "Nguyễn Trọng Lơ",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "Làng Phươn, xã Hòa Bình, huyện Hưng Hà, Thái Bình"
    })

CREATE
  (b1_d22_lan:Person
    {
      id: "P_D22_LAN",
      full_name: "Đinh Thị Lan",
      birth_year: 1923,
      lunar_death_day: "08/04",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      note:
        "Tuổi Quý Hợi (1923). Không có chồng con. Mất 8/4 Tân Mão (1951), hưởng dương 28 tuổi. Mộ tại xứ Bà Lễ."
    })

CREATE
  (b1_d22_cuc:Person
    {
      id: "P_D22_CUC",
      full_name: "Đinh Thị Cúc",
      alias_name: "Nghiêm",
      birth_year: 1927,
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      note: "Tuổi Đinh Mão (1927)."
    })
CREATE
  (b1_d22_mai_r:Person
    {
      id: "P_D22_MAI_R",
      full_name: "Đặng Xuân Mai",
      birth_year: 1921,
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "Làng Vác, huyện Thanh Oai, TP Hà Nội"
    })

CREATE
  (b1_d22_tinh:Person
    {
      id: "P_D22_TINH",
      full_name: "Đinh Thị Tính",
      alias_name: "Chỉnh",
      birth_year: 1931,
      lunar_death_day: "08/01",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      note:
        "Tuổi Tân Mùi (1931). Cán bộ Công ty Vật tư Nông nghiệp Hà Tây. Không có chồng con. Mất 8/1 Nhâm Thìn (2012), thọ 82 tuổi. Mộ tại Bà Lễ."
    })

// 3. PGS.TS Đinh Hoài (Đinh Xuân Hải)
CREATE
  (b1_d22_hoai:Person
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
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Nhâm Thân (1932). Đảng viên ĐCSVN, tham gia kháng chiến chống Pháp. Phó Giáo sư, Tiến sĩ Kinh tế, Chủ nhiệm bộ môn ĐH Bách Khoa Hà Nội, Vụ trưởng Vụ Kế hoạch Tài chính - Bộ Khoa học Công nghệ và Môi trường. Có công lao to lớn tiếp nối anh trai hoàn thành bộ Tộc phả năm 1999 và xin cấp bằng di tích lịch sử Từ đường Chi Lăng. Mất ngày 26/2 Đinh Dậu (2017), thọ 86 tuổi.",
      note: "Cư trú tại Hà Nội. Mộ để tại nghĩa trang Kỳ Sơn, Hòa Bình."
    })
CREATE
  (b1_d22_tam_hoai_w:Person
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
        "Tuổi Tân Tỵ (1941). Kỹ sư Dệt may, Giám đốc Nhà máy Dệt Minh Khai, Bí thư Quận ủy Ba Đình (Hà Nội), Anh hùng Lao động, Ủy viên Trung ương Đảng CSVN Khóa VI và VII, Phó Trưởng ban Tài chính Quản trị Trung ương Đảng. Sinh được 2 con trai: Đinh Anh Tuấn, Đinh Quốc Hùng.",
      note: "Cư trú tại TP Hà Nội."
    })

CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_dong)
CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_dao)
CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_le)
CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_luu_f)
CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_ly)
CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_lan)
CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_cuc)
CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_tinh)
CREATE (b1_d21_dung)-[:FATHER_OF]->(b1_d22_hoai)

CREATE (b1_d21_y_w)-[:MOTHER_OF]->(b1_d22_dong)
CREATE (b1_d21_y_w)-[:MOTHER_OF]->(b1_d22_dao)
CREATE (b1_d21_y_w)-[:MOTHER_OF]->(b1_d22_le)
CREATE (b1_d21_y_w)-[:MOTHER_OF]->(b1_d22_luu_f)
CREATE (b1_d21_y_w)-[:MOTHER_OF]->(b1_d22_ly)
CREATE (b1_d21_y_w)-[:MOTHER_OF]->(b1_d22_lan)
CREATE (b1_d21_y_w)-[:MOTHER_OF]->(b1_d22_cuc)
CREATE (b1_d21_y_w)-[:MOTHER_OF]->(b1_d22_tinh)
CREATE (b1_d21_y_w)-[:MOTHER_OF]->(b1_d22_hoai)

CREATE (b1_d22_dong)-[:MARRIED_TO {marriage_order: 1}]->(b1_d22_thoa_w)
CREATE (b1_d22_thai_r)-[:MARRIED_TO {marriage_order: 1}]->(b1_d22_luu_f)
CREATE (b1_d22_lo_r)-[:MARRIED_TO {marriage_order: 1}]->(b1_d22_ly)
CREATE (b1_d22_mai_r)-[:MARRIED_TO {marriage_order: 1}]->(b1_d22_cuc)
CREATE (b1_d22_hoai)-[:MARRIED_TO {marriage_order: 1}]->(b1_d22_tam_hoai_w)

// --- CON CỤ ĐINH DANH PHỤNG (3 CON GÁI & RỂ) ---
CREATE
  (b1_d22_chat_f:Person
    {
      id: "P_D22_CHAT_F",
      full_name: "Đinh Thị Chắt",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (b1_d22_nghiem_ha_r:Person
    {
      id: "P_D22_NGHIEM_HA_R",
      full_name: "Hà Văn Nghiêm",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "Thôn Chàng, xã An Đồng, thị trấn Hưng Hà, Thái Bình"
    })
CREATE
  (b1_d22_soi_f:Person
    {
      id: "P_D22_SOI_F",
      full_name: "Đinh Thị Sói",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      note: "Mất khi còn trẻ chưa có gia đình riêng."
    })
CREATE
  (b1_d22_nhai_f:Person
    {
      id: "P_D22_NHAI_F",
      full_name: "Đinh Thị Nhài",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      note: "Mất năm 1945 khi còn trẻ chưa có gia đình riêng."
    })

CREATE (b1_d21_phung)-[:FATHER_OF]->(b1_d22_chat_f)
CREATE (b1_d21_phung)-[:FATHER_OF]->(b1_d22_soi_f)
CREATE (b1_d21_phung)-[:FATHER_OF]->(b1_d22_nhai_f)
CREATE (b1_d21_bo_w)-[:MOTHER_OF]->(b1_d22_chat_f)
CREATE (b1_d21_bo_w)-[:MOTHER_OF]->(b1_d22_soi_f)
CREATE (b1_d21_bo_w)-[:MOTHER_OF]->(b1_d22_nhai_f)
CREATE (b1_d22_nghiem_ha_r)-[:MARRIED_TO {marriage_order: 1}]->(b1_d22_chat_f)

// ==============================================================================
// 4. ĐỜI 23: CON CÁI CÁC CỤ LƯU, ĐÔNG, HOÀI
// ==============================================================================

// --- CON CỤ ĐINH DANH LƯU ---
// Con Bà Cả:
CREATE
  (b1_d23_dao_n:Person
    {
      id: "P_D23_DAO_N",
      full_name: "Đinh Danh Đạo",
      alias_name: "Nguyên",
      gender: "MALE",
      generation: 23,
      is_alive: false,
      birth_year: 1936,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      note: "Tuổi Bính Tý (1936). Ra đi từ năm 1951 không rõ tin tức."
    })
CREATE
  (b1_d23_hau:Person
    {
      id: "P_D23_HAU",
      full_name: "Đinh Gia Hậu",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Hà Nội",
      title:
        "Cử nhân Kinh tế, Phó TGĐ Công ty Thực phẩm miền Bắc, Trưởng phòng TC Bộ Thương mại",
      birth_year: 1942,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Nhâm Ngọ (1942). Cử nhân Kinh tế, Đảng viên ĐCSVN. Từng là giảng viên Trường Trung cấp Thương mại, giảng viên ĐH Thương Mại Hà Nội, Phó Tổng Giám đốc Công ty Thực phẩm miền Bắc (Bộ Thương mại), Trưởng phòng Tổ chức Cán bộ - Bộ Thương Mại.",
      note: "Cư trú tại phường Vĩnh Tuy, quận Hai Bà Trưng, Hà Nội."
    })
CREATE
  (b1_d23_lan_hau_w:Person
    {
      id: "P_D23_HAU_W",
      full_name: "Hồ Thị Xuân Lan",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: false,
      birth_year: 1947,
      hometown: "TP Hà Nội",
      biography:
        "Tuổi Đinh Hợi (1947). Cử nhân Kinh tế, Đảng viên ĐCSVN. Giảng viên Trường ĐH Thương Mại, Ủy viên Thường vụ Công đoàn Ngành Thương mại & Du lịch Việt Nam. Mất 14/5/2016, thọ 67 tuổi.",
      note: "Mộ để tại nghĩa trang Vĩnh Hằng, Ba Vì, Hà Nội."
    })

// Con Bà Hai:
CREATE
  (b1_d23_phai:Person
    {
      id: "P_D23_PHAI",
      full_name: "Đinh Danh Phái",
      gender: "MALE",
      generation: 23,
      is_alive: false,
      birth_year: 1937,
      lunar_death_day: "10/11",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      note:
        "Tuổi Đinh Sửu (1937). Mất 10/11 Nhâm Tý (1972), chưa có vợ. Mộ tại Cầu Cương, Hải Dương."
    })
CREATE
  (b1_d23_lien_f:Person
    {
      id: "P_D23_LIEN_F",
      full_name: "Đinh Thị Liên",
      birth_year: 1942,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình"
    })
CREATE
  (b1_d23_chung_r:Person
    {
      id: "P_D23_CHUNG_R",
      full_name: "Vũ Văn Chưng",
      birth_year: 1937,
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "Thái Bình"
    })
CREATE
  (b1_d23_khoi_luu:Person
    {
      id: "P_D23_KHOI_23",
      full_name: "Đinh Danh Khôi",
      gender: "MALE",
      generation: 23,
      is_alive: false,
      birth_year: 1944,
      lunar_death_day: "16/07",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      note:
        "Tuổi Giáp Thân (1944). Mất 16/7 Giáp Dần (1974), chưa có vợ. Mộ tại Cầu Cương, Hải Dương."
    })

CREATE (b1_d22_luu)-[:FATHER_OF]->(b1_d23_dao_n)
CREATE (b1_d22_luu)-[:FATHER_OF]->(b1_d23_hau)
CREATE (b1_d22_tam_w)-[:MOTHER_OF]->(b1_d23_dao_n)
CREATE (b1_d22_tam_w)-[:MOTHER_OF]->(b1_d23_hau)
CREATE (b1_d23_hau)-[:MARRIED_TO {marriage_order: 1}]->(b1_d23_lan_hau_w)

CREATE (b1_d22_luu)-[:FATHER_OF]->(b1_d23_phai)
CREATE (b1_d22_luu)-[:FATHER_OF]->(b1_d23_lien_f)
CREATE (b1_d22_luu)-[:FATHER_OF]->(b1_d23_khoi_luu)
CREATE (b1_d22_tieu_w)-[:MOTHER_OF]->(b1_d23_phai)
CREATE (b1_d22_tieu_w)-[:MOTHER_OF]->(b1_d23_lien_f)
CREATE (b1_d22_tieu_w)-[:MOTHER_OF]->(b1_d23_khoi_luu)
CREATE (b1_d23_chung_r)-[:MARRIED_TO {marriage_order: 1}]->(b1_d23_lien_f)

// --- CON CỤ ĐINH VĂN ĐÔNG (2 CON GÁI & RỂ) ---
CREATE
  (b1_d23_nguyet:Person
    {
      id: "P_D23_NGUYET",
      full_name: "Đinh Thị Thu Nguyệt",
      birth_year: 1966,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      title: "Kỹ sư Kỹ thuật May mặc",
      hometown: "TP Hà Nội"
    })
CREATE
  (b1_d23_ban:Person
    {
      id: "P_D23_BAN",
      full_name: "Đinh Thu Ban",
      birth_year: 1968,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      title: "Giáo viên tiểu học",
      hometown: "TP Hà Nội"
    })
CREATE
  (b1_d23_hung_r:Person
    {
      id: "P_D23_HUNG_R",
      full_name: "Nguyễn Văn Hưng",
      birth_year: 1964,
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "TP Hà Nội"
    })
CREATE (b1_d22_dong)-[:FATHER_OF]->(b1_d23_nguyet)
CREATE (b1_d22_dong)-[:FATHER_OF]->(b1_d23_ban)
CREATE (b1_d22_thoa_w)-[:MOTHER_OF]->(b1_d23_nguyet)
CREATE (b1_d22_thoa_w)-[:MOTHER_OF]->(b1_d23_ban)
CREATE (b1_d23_hung_r)-[:MARRIED_TO {marriage_order: 1}]->(b1_d23_ban)

// --- CON PGS.TS ĐINH HOÀI (2 CON TRAI & DÂU) ---
CREATE
  (b1_d23_tuan:Person
    {
      id: "P_D23_TUAN",
      full_name: "Đinh Anh Tuấn",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "TP.HCM",
      title: "Cử nhân Kinh tế, Cán bộ Tổng Công ty An Phú TP.HCM",
      birth_year: 1967,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Đinh Mùi (1967). Cử nhân Kinh tế, cán bộ Tổng Công ty An Phú TP.HCM.",
      note: "Gia đình cư trú tại TP. Hồ Chí Minh."
    })
CREATE
  (b1_d23_tuyet_w:Person
    {
      id: "P_D23_TUAN_W",
      full_name: "Lê Thị Ánh Tuyết",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      birth_year: 1967,
      hometown: "TP. Hồ Chí Minh",
      biography: "Tuổi Đinh Mùi (1967). Tốt nghiệp ĐH Ngoại ngữ, cán bộ.",
      note: "Cư trú tại TP. Hồ Chí Minh."
    })

CREATE
  (b1_d23_hung:Person
    {
      id: "P_D23_HUNG1",
      full_name: "Đinh Quốc Hùng",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Hà Nội",
      title:
        "Cử nhân Kinh tế, Cán bộ Tổng Công ty XNK Xây dựng (Bộ Xây dựng), Đại diện Chi 1",
      birth_year: 1975,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Ất Mão (1975). Cử nhân Kinh tế, cán bộ Tổng Công ty Xuất nhập khẩu Xây dựng (Bộ Xây dựng). Là đại diện Chi 1 trong Ban biên soạn Tộc phả, trực tiếp thu thập và cung cấp toàn bộ tư liệu Chi 1.",
      note: "Cư trú tại TP Hà Nội."
    })
CREATE
  (b1_d23_ha_w:Person
    {
      id: "P_D23_HUNG1_W",
      full_name: "Trần Thị Bích Hà",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      birth_year: 1974,
      hometown: "TP Hà Nội",
      biography:
        "Tuổi Giáp Dần (1974). Tốt nghiệp ĐH Ngoại ngữ, Cử nhân Kinh tế. Cán bộ Nhà máy bia Đông Nam Á, TP Hà Nội.",
      note: "Cư trú tại TP Hà Nội."
    })

CREATE (b1_d22_hoai)-[:FATHER_OF]->(b1_d23_tuan)
CREATE (b1_d22_hoai)-[:FATHER_OF]->(b1_d23_hung)
CREATE (b1_d22_tam_hoai_w)-[:MOTHER_OF]->(b1_d23_tuan)
CREATE (b1_d22_tam_hoai_w)-[:MOTHER_OF]->(b1_d23_hung)
CREATE (b1_d23_tuan)-[:MARRIED_TO {marriage_order: 1}]->(b1_d23_tuyet_w)
CREATE (b1_d23_hung)-[:MARRIED_TO {marriage_order: 1}]->(b1_d23_ha_w)

// ==============================================================================
// 5. ĐỜI 24: CÁC CHÁU NỘI NGOẠI CHI 1
// ==============================================================================

// --- CON ÔNG ĐINH GIA HẬU (2 CON GÁI & RỂ) ---
CREATE
  (b1_d24_phuong:Person
    {
      id: "P_D24_PHUONG",
      full_name: "Đinh Thị Lan Phương",
      birth_year: 1971,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      title: "Cử nhân Kinh tế, Bộ Công Thương",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Tân Hợi (1971). Cử nhân Kinh tế, công tác tại Bộ Công Thương. Cư trú tại Hà Nội."
    })
CREATE
  (b1_d24_tue_r:Person
    {
      id: "P_D24_TUE_R",
      full_name: "Lê Minh Tuệ",
      birth_year: 1971,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      title: "Cử nhân Kinh tế",
      hometown: "TP Hà Nội"
    })

CREATE
  (b1_d24_huong:Person
    {
      id: "P_D24_HUONG",
      full_name: "Đinh Thị Lan Hương",
      birth_year: 1974,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      title: "Cử nhân Kinh tế",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Giáp Dần (1974). Cử nhân Kinh tế, làm việc trong ngành khách sạn du lịch tại Hà Nội."
    })
CREATE
  (b1_d24_chinh_r:Person
    {
      id: "P_D24_CHINH_R",
      full_name: "Phan Minh Chính",
      birth_year: 1969,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "TP Hà Nội"
    })

CREATE (b1_d23_hau)-[:FATHER_OF]->(b1_d24_phuong)
CREATE (b1_d23_hau)-[:FATHER_OF]->(b1_d24_huong)
CREATE (b1_d23_lan_hau_w)-[:MOTHER_OF]->(b1_d24_phuong)
CREATE (b1_d23_lan_hau_w)-[:MOTHER_OF]->(b1_d24_huong)
CREATE (b1_d24_tue_r)-[:MARRIED_TO {marriage_order: 1}]->(b1_d24_phuong)
CREATE (b1_d24_chinh_r)-[:MARRIED_TO {marriage_order: 1}]->(b1_d24_huong)

// --- CON ÔNG ĐINH ANH TUẤN ---
CREATE
  (b1_d24_duc:Person
    {
      id: "P_D24_DUC1",
      full_name: "Đinh Anh Đức",
      birth_year: 2002,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP. Hồ Chí Minh",
      biography: "Sinh ngày 16/02/2002 tại TP. Hồ Chí Minh."
    })
CREATE (b1_d23_tuan)-[:FATHER_OF]->(b1_d24_duc)
CREATE (b1_d23_tuyet_w)-[:MOTHER_OF]->(b1_d24_duc)

// --- CON ÔNG ĐINH QUỐC HÙNG ---
CREATE
  (b1_d24_ha_anh:Person
    {
      id: "P_D24_HA_ANH",
      full_name: "Đinh Trần Hà Anh",
      birth_year: 1999,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hà Nội",
      biography: "Tuổi Kỷ Mão (sinh 1999 tại TP Hà Nội)."
    })
CREATE
  (b1_d24_khoi:Person
    {
      id: "P_D24_KHOI",
      full_name: "Đinh Duy Khôi",
      birth_year: 2004,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "TP Hà Nội",
      biography:
        "Sinh ngày 21/01/2004 tại TP Hà Nội (trang 85 chép sinh 2004, trang 100 chép 2024)."
    })

CREATE (b1_d23_hung)-[:FATHER_OF]->(b1_d24_ha_anh)
CREATE (b1_d23_hung)-[:FATHER_OF]->(b1_d24_khoi)
CREATE (b1_d23_ha_w)-[:MOTHER_OF]->(b1_d24_ha_anh)
CREATE (b1_d23_ha_w)-[:MOTHER_OF]->(b1_d24_khoi);