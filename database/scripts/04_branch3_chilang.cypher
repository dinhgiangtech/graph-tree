// ==============================================================================
// PHẦN 4: CHI 3 (XÃ CHI LĂNG - QUÊ NHÀ)
// Nhánh Cụ Đinh Danh Giảng -> Cụ Kiền -> Cụ Nhã -> Đời 23, 24, 25
// ==============================================================================
// ==============================================================================
// 1. TẠO CỤ KHỞI TỔ CHI 3 (ĐỜI 20) & NỐI VỚI ĐỜI 19 (CỤ KHƯƠNG & BÀ MÂY)
// ==============================================================================
CREATE
  (b3_d20_giang:Person
    {
      id: "P_D20_GIANG",
      full_name: "Đinh Danh Giảng",
      gender: "MALE",
      generation: 20,
      is_alive: false,
      title: "Khởi tổ Chi 3",
      birth_year: 1869,
      lunar_death_day: "17/07",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Kỷ Tỵ (1869). Tham gia phong trào khởi nghĩa Cần Vương chống Pháp của Bang Tốn (làng Phươn). Mất ngày 17/7 Nhâm Thìn (1952), thọ 84 tuổi.",
      note: "Mộ để cạnh phía bắc Đường Vuông, xứ Bà Lễ, xã Chi Lăng."
    })
CREATE
  (b3_d20_thu:Person
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
      hometown: "Làng Đún Ngoại, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Giáp Tuất (1874), họ Nguyễn Văn cùng làng. Mất ngày 01/6 Ất Hợi (1935), thọ 62 tuổi.",
      note: "Mộ để cạnh đường ruộng đi ra đường Chùa, Đầu Cừ, xứ Bà Lễ."
    })

WITH b3_d20_giang, b3_d20_thu
MATCH (d19_khuong:Person {id: "P_D19_KHUONG"})
MATCH (d19_may:Person {id: "P_D19_KHUONG_W"})
CREATE (d19_khuong)-[:FATHER_OF]->(b3_d20_giang)
CREATE (d19_may)-[:MOTHER_OF]->(b3_d20_giang)
CREATE (b3_d20_giang)-[:MARRIED_TO {marriage_order: 1}]->(b3_d20_thu)

// ==============================================================================
// 2. ĐỜI 21: CÁC CON CỦA CỤ ĐINH DANH GIẢNG (1 TRAI, 2 GÁI)
// ==============================================================================

// 1. Cụ Đinh Danh Kiền
CREATE
  (b3_d21_kien:Person
    {
      id: "P_D21_KIEN",
      full_name: "Đinh Danh Kiền",
      gender: "MALE",
      generation: 21,
      is_alive: false,
      birth_year: 1903,
      lunar_death_day: "21/11",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Quý Mão (1903). Thuở nhỏ học chữ Hán khoảng 10 năm, gia cảnh thanh bạch. Trong các dịp lễ hội thường ra thị xã Hải Dương cùng họ hàng cúng lễ. Mất lúc 11 giờ ngày 21/11 năm Quý Sửu (1973), thọ 71 tuổi.",
      note:
        "Mộ để cạnh bờ ruộng phía nam Đường Vuông, hướng ra Đầu Cừ, xứ Bà Lễ, xã Chi Lăng."
    })
CREATE
  (b3_d21_phuong_k_w:Person
    {
      id: "P_D21_KIEN_W",
      full_name: "Nguyễn Thị Phương",
      gender: "FEMALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      birth_year: 1907,
      lunar_death_day: "17/11",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Mậu Thìn (1907), họ Nguyễn Đình cùng làng. Mất ngày 17/11 năm Quý Tỵ (1953), thọ 46 tuổi. Sinh được 1 con trai, 2 con gái: Nhã, Dần, Thoa (và 1 con trai mất khi còn nhỏ sau khi bà mất).",
      note: "Mộ để giữa đường Con Nhạn, xứ Bà Lễ, xã Chi Lăng."
    })

// 2. Bà Đinh Thị Nhiệm
CREATE
  (b3_d21_nhiem:Person
    {
      id: "P_D21_NHIEM",
      full_name: "Đinh Thị Nhiệm",
      lunar_death_day: "05/08",
      gender: "FEMALE",
      generation: 21,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Mất ngày 5/8 năm Bính Thìn (1976), thọ 84 tuổi. Chồng người họ Phạm Đình thôn Óc, sinh 1 trai 1 gái (Phạm Đình Tân, Phạm Thị Gái).",
      note: "Con cháu ở thôn Óc, xã Thái Hưng, Hưng Hà, Thái Bình."
    })
CREATE
  (b3_d21_nhiem_r:Person
    {
      id: "P_D21_NHIEM_H",
      full_name: "Ông Rể họ Phạm Đình (thôn Óc)",
      gender: "MALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      hometown: "Thôn Óc, xã Thái Hưng, huyện Hưng Hà, Thái Bình"
    })

// 3. Bà Đinh Thị Đoài
CREATE
  (b3_d21_doai:Person
    {
      id: "P_D21_DOAI",
      full_name: "Đinh Thị Đoài",
      birth_year: 1908,
      lunar_death_day: "16/01",
      gender: "FEMALE",
      generation: 21,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Mậu Thân (1908). Mất ngày 16/1 năm Mậu Thìn (03/3/1988), thọ 80 tuổi. Lấy ông Lương Văn Tiệp người cùng làng, sinh được 1 con trai là Lương Văn Xíu.",
      note:
        "Mộ để cạnh Đường Chè Lẽ (Đường Voi Phục) phía sau chùa Đún, xã Chi Lăng."
    })
CREATE
  (b3_d21_tiep_r:Person
    {
      id: "P_D21_TIEP_R",
      full_name: "Lương Văn Tiệp",
      lunar_death_day: "23/06",
      gender: "MALE",
      in_law: true,
      generation: 21,
      is_alive: false,
      hometown: "Xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Canh Tý. Mất ngày 23/6 Âm lịch (1967). Mộ để tại xứ Bà Lễ, gần Đường Vuông."
    })

CREATE (b3_d20_giang)-[:FATHER_OF]->(b3_d21_kien)
CREATE (b3_d20_giang)-[:FATHER_OF]->(b3_d21_nhiem)
CREATE (b3_d20_giang)-[:FATHER_OF]->(b3_d21_doai)
CREATE (b3_d20_thu)-[:MOTHER_OF]->(b3_d21_kien)
CREATE (b3_d20_thu)-[:MOTHER_OF]->(b3_d21_nhiem)
CREATE (b3_d20_thu)-[:MOTHER_OF]->(b3_d21_doai)

CREATE (b3_d21_kien)-[:MARRIED_TO {marriage_order: 1}]->(b3_d21_phuong_k_w)
CREATE (b3_d21_nhiem_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d21_nhiem)
CREATE (b3_d21_tiep_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d21_doai)

// ==============================================================================
// 3. ĐỜI 22: CỤ ĐINH DANH NHÃ VÀ CÁC CHỊ EM GÁI
// ==============================================================================

// 1. Cụ Đinh Danh Nhã
CREATE
  (b3_d22_nha:Person
    {
      id: "P_D22_NHA",
      full_name: "Đinh Danh Nhã",
      gender: "MALE",
      generation: 22,
      is_alive: false,
      title: "Chủ tịch xã Chi Lăng (1955)",
      birth_year: 1930,
      lunar_death_day: "09/10",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh ngày Thanh minh năm Canh Ngọ (1930). Tham gia du kích liên lạc cho bộ đội thời kháng chiến chống Pháp. Chủ tịch xã Chi Lăng năm 1955, Đảng viên ĐCSVN. Được tặng thưởng Huy chương Kháng chiến chống Pháp hạng nhì, Huân chương Kháng chiến chống Mỹ hạng nhì. Mất lúc 12h30 ngày 9/10 năm Mậu Ngọ (17/11/1988), thọ 59 tuổi.",
      note:
        "Mộ để giữa đường Chè Lẽ (đường Voi Phục) sau chùa Đún, xã Chi Lăng."
    })
CREATE
  (b3_d22_de_w:Person
    {
      id: "P_D22_NHA_W",
      full_name: "Vũ Thị Dề",
      gender: "FEMALE",
      in_law: true,
      generation: 22,
      is_alive: true,
      birth_year: 1935,
      hometown:
        "Xóm Chùa, thôn Thống Nhất, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Bính Tý (1935), họ Vũ Đức, mẹ là người họ Đinh Danh (Phái 1). Cùng chồng sinh được 5 con trai, 2 con gái: Vùng, Lũng, Mến, Thuể, Phối, Ký, Thưa.",
      note: "Cư trú tại xã Chi Lăng."
    })

// 2. Bà Đinh Thị Dần
CREATE
  (b3_d22_dan:Person
    {
      id: "P_D22_DAN",
      full_name: "Đinh Thị Dần",
      birth_year: 1931,
      lunar_death_day: "05/11",
      gender: "FEMALE",
      generation: 22,
      is_alive: false,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Tân Mùi (1931). Mất ngày 5/11 năm Bính Thìn (1976) do đắm đò Phươn sông Tiên Hưng khi đi chợ sớm, thọ 46 tuổi. Chồng là Hoàng Đình Tỉu (thôn Minh Khai, Chi Lăng), sinh được 4 trai 4 gái.",
      note: "Mộ để tại xã Chi Lăng."
    })
CREATE
  (b3_d22_tiu_r:Person
    {
      id: "P_D22_TIU_R",
      full_name: "Hoàng Đình Tỉu",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "Thôn Minh Khai, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình"
    })

// 3. Bà Đinh Thị Thoa (2 đời chồng)
CREATE
  (b3_d22_thoa_3:Person
    {
      id: "P_D22_THOA_3",
      full_name: "Đinh Thị Thoa",
      birth_year: 1941,
      gender: "FEMALE",
      generation: 22,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Tuổi Tân Tỵ (1941). Chồng trước là Nguyễn Duy Sâm (sinh 1 con gái). Chồng kế là Nguyễn Đình Diễn (sinh 1 trai 1 gái: Khởi, Son). Sinh sống tại xã Lô Giang, Đông Hưng."
    })
CREATE
  (b3_d22_sam_r:Person
    {
      id: "P_D22_SAM_R",
      full_name: "Nguyễn Duy Sâm",
      title: "Chồng trước",
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      note: "Mất khi còn trẻ do bệnh lao. Mộ tại Chi Lăng."
    })
CREATE
  (b3_d22_dien_r:Person
    {
      id: "P_D22_DIEN_R",
      full_name: "Nguyễn Đình Diễn",
      title: "Chồng kế",
      birth_year: 1935,
      gender: "MALE",
      in_law: true,
      generation: 22,
      is_alive: false,
      hometown: "Thôn Minh Đức, xã Lô Giang, huyện Đông Hưng, Thái Bình",
      note: "Tuổi Ất Hợi (1935). Mất năm Bính Tý (1996). Mộ tại Lô Giang."
    })

CREATE (b3_d21_kien)-[:FATHER_OF]->(b3_d22_nha)
CREATE (b3_d21_kien)-[:FATHER_OF]->(b3_d22_dan)
CREATE (b3_d21_kien)-[:FATHER_OF]->(b3_d22_thoa_3)
CREATE (b3_d21_phuong_k_w)-[:MOTHER_OF]->(b3_d22_nha)
CREATE (b3_d21_phuong_k_w)-[:MOTHER_OF]->(b3_d22_dan)
CREATE (b3_d21_phuong_k_w)-[:MOTHER_OF]->(b3_d22_thoa_3)

CREATE (b3_d22_nha)-[:MARRIED_TO {marriage_order: 1}]->(b3_d22_de_w)
CREATE (b3_d22_tiu_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d22_dan)
CREATE
  (b3_d22_sam_r)-[:MARRIED_TO {marriage_order: 1, title: "Chồng trước"}]->
  (b3_d22_thoa_3)
CREATE
  (b3_d22_dien_r)-[:MARRIED_TO {marriage_order: 2, title: "Chồng kế"}]->
  (b3_d22_thoa_3)

// ==============================================================================
// 4. ĐỜI 23: CÁC CON CỦA CỤ ĐINH DANH NHÃ (5 TRAI, 2 GÁI)
// ==============================================================================

// --- 1. THƯỢNG TÁ ĐINH DANH VÙNG ---
CREATE
  (b3_d23_vung:Person
    {
      id: "P_D23_VUNG",
      full_name: "Đinh Danh Vùng",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Hà Nội",
      title: "Thượng tá Biên phòng, Chủ biên Tộc phả 2025",
      birth_year: 1955,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 12 giờ ngày 3/2 năm Ất Mùi (1955). Đảng viên ĐCSVN, Thượng tá, cán bộ ngành Hậu cần Kỹ thuật - Bộ Tư lệnh Bộ đội Biên phòng (5/1972 - 7/2009) nghỉ hưu. Là Chủ biên dày công thu thập, hiệu đính và xuất bản bộ Gia phả Ngành 3 Phái 3 năm 2025. Tháng 7/1998 chuyển lên cư trú tại phường Vĩnh Tuy, quận Hai Bà Trưng, Hà Nội. Sinh 3 con trai: Thành, Cường, Phúc.",
      note: "Đại diện Chi 3, phụ trách in ấn và trao gia phả về các chi nhánh."
    })
CREATE
  (b3_d23_che_w:Person
    {
      id: "P_D23_VUNG_W",
      full_name: "Nguyễn Thị Chè",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      birth_year: 1958,
      hometown: "Xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 14 giờ ngày 01/10 năm Mậu Tuất (1958), họ Nguyễn Đình cùng xã Chi Lăng. Cùng chồng sinh sống tại quận Hai Bà Trưng, Hà Nội.",
      note: "Cư trú tại Hà Nội."
    })

// --- 2. ÔNG ĐINH DANH LŨNG ---
CREATE
  (b3_d23_lung:Person
    {
      id: "P_D23_LUNG",
      full_name: "Đinh Danh Lũng",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Thái Bình",
      birth_year: 1958,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 3 giờ ngày 04/5/1958 (Mậu Tuất). Sinh sống tại quê nhà Chi Lăng, sinh được 1 con trai, 4 con gái: Sớm, Ngoan, Hiền, Hường, Lộng."
    })
CREATE
  (b3_d23_hin_w:Person
    {
      id: "P_D23_LUNG_W",
      full_name: "Nguyễn Thị Hin",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      birth_year: 1958,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 01/01/1958 (Mậu Tuất), họ Nguyễn Đình cùng xã Chi Lăng."
    })

// --- 3. ÔNG ĐINH DANH MẾN ---
CREATE
  (b3_d23_men:Person
    {
      id: "P_D23_MEN",
      full_name: "Đinh Danh Mến",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Thái Bình",
      birth_year: 1963,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh tháng 4 năm Quý Mão (1963). Sinh sống tại quê nhà Chi Lăng, sinh được 1 con trai, 3 con gái: Lượt, Hạnh, Hương, Hùng (Hương và Hùng sinh đôi)."
    })
CREATE
  (b3_d23_non_w:Person
    {
      id: "P_D23_MEN_W",
      full_name: "Nguyễn Thị Nõn",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      birth_year: 1969,
      hometown: "Xã Chi Lăng, Hưng Hà, Thái Bình",
      biography: "Tuổi Kỷ Dậu (1969), họ Nguyễn Đình cùng xã Chi Lăng."
    })

// --- 4. ÔNG ĐINH DANH THUỂ ---
CREATE
  (b3_d23_thue:Person
    {
      id: "P_D23_THUE",
      full_name: "Đinh Danh Thuể",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Thái Bình",
      birth_year: 1966,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh ngày 27/3/1966 (Bính Ngọ). Sinh sống tại quê nhà Chi Lăng, sinh được 2 con trai: Đinh Danh Vũ, Đinh Trường Giang."
    })
CREATE
  (b3_d23_lieu_thue_w:Person
    {
      id: "P_D23_THUE_W",
      full_name: "Nguyễn Thị Liễu",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      birth_year: 1970,
      hometown: "Làng Gòi, xã Minh Tân, huyện Đông Hưng, tỉnh Thái Bình",
      biography:
        "Tuổi Canh Tuất (1970), quê làng Gòi xã Minh Tân (vốn xưa thuộc đất Ngoại Thôn xã Ỷ Đốn sang khai hoang lập ấp)."
    })

// --- 5. ÔNG ĐINH DANH PHỐI ---
CREATE
  (b3_d23_phoi:Person
    {
      id: "P_D23_PHOI",
      full_name: "Đinh Danh Phối",
      gender: "MALE",
      generation: 23,
      is_alive: true,
      current_residence: "Thái Bình",
      birth_year: 1969,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Tuổi Kỷ Dậu (1969). Sinh sống tại quê nhà Chi Lăng, sinh được 1 con trai, 1 con gái: Đinh Danh Phong, Đinh Thị Huệ."
    })
CREATE
  (b3_d23_nhung_phoi_w:Person
    {
      id: "P_D23_PHOI_W",
      full_name: "Nguyễn Thị Nhung",
      gender: "FEMALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      birth_year: 1973,
      hometown: "Thôn Quyết Tiến, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography: "Tuổi Quý Sửu (1973), họ Nguyễn Đức cùng xã Chi Lăng."
    })

// --- 6. BÀ ĐINH THỊ KÝ ---
CREATE
  (b3_d23_ky:Person
    {
      id: "P_D23_KY",
      full_name: "Đinh Thị Ký",
      birth_year: 1973,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh ngày 27/12 năm Nhâm Tý (1973). Lấy ông Đỗ Văn Hưu (thôn Tiền Phong, Chi Lăng), sinh được 3 con gái: Đỗ Thị Hoài, Đỗ Thị Hà, Đỗ Thị Hồng."
    })
CREATE
  (b3_d23_huu_r:Person
    {
      id: "P_D23_HUU_R",
      full_name: "Đỗ Văn Hưu",
      birth_year: 1963,
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "Thôn Tiền Phong, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình"
    })

// --- 7. BÀ ĐINH THỊ THƯA ---
CREATE
  (b3_d23_thua:Person
    {
      id: "P_D23_THUA",
      full_name: "Đinh Thị Thưa",
      birth_year: 1979,
      gender: "FEMALE",
      generation: 23,
      is_alive: true,
      title: "Đảng viên ĐCSVN, Cán bộ xã Chi Lăng",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh 23 giờ ngày 03/6/1979 (Kỷ Mùi). Đảng viên ĐCSVN, công tác tại UBND xã Chi Lăng. Lấy ông Phạm Văn Mạnh (thôn Tân Tiến, Chi Lăng), sinh được 2 con gái: Phạm Kim Oanh, Phạm Yến Nhi."
    })
CREATE
  (b3_d23_manh_r:Person
    {
      id: "P_D23_MANH_R",
      full_name: "Phạm Văn Mạnh",
      birth_year: 1982,
      gender: "MALE",
      in_law: true,
      generation: 23,
      is_alive: true,
      hometown: "Thôn Tân Tiến, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình"
    })

CREATE (b3_d22_nha)-[:FATHER_OF]->(b3_d23_vung)
CREATE (b3_d22_nha)-[:FATHER_OF]->(b3_d23_lung)
CREATE (b3_d22_nha)-[:FATHER_OF]->(b3_d23_men)
CREATE (b3_d22_nha)-[:FATHER_OF]->(b3_d23_thue)
CREATE (b3_d22_nha)-[:FATHER_OF]->(b3_d23_phoi)
CREATE (b3_d22_nha)-[:FATHER_OF]->(b3_d23_ky)
CREATE (b3_d22_nha)-[:FATHER_OF]->(b3_d23_thua)

CREATE (b3_d22_de_w)-[:MOTHER_OF]->(b3_d23_vung)
CREATE (b3_d22_de_w)-[:MOTHER_OF]->(b3_d23_lung)
CREATE (b3_d22_de_w)-[:MOTHER_OF]->(b3_d23_men)
CREATE (b3_d22_de_w)-[:MOTHER_OF]->(b3_d23_thue)
CREATE (b3_d22_de_w)-[:MOTHER_OF]->(b3_d23_phoi)
CREATE (b3_d22_de_w)-[:MOTHER_OF]->(b3_d23_ky)
CREATE (b3_d22_de_w)-[:MOTHER_OF]->(b3_d23_thua)

CREATE (b3_d23_vung)-[:MARRIED_TO {marriage_order: 1}]->(b3_d23_che_w)
CREATE (b3_d23_lung)-[:MARRIED_TO {marriage_order: 1}]->(b3_d23_hin_w)
CREATE (b3_d23_men)-[:MARRIED_TO {marriage_order: 1}]->(b3_d23_non_w)
CREATE (b3_d23_thue)-[:MARRIED_TO {marriage_order: 1}]->(b3_d23_lieu_thue_w)
CREATE (b3_d23_phoi)-[:MARRIED_TO {marriage_order: 1}]->(b3_d23_nhung_phoi_w)
CREATE (b3_d23_huu_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d23_ky)
CREATE (b3_d23_manh_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d23_thua)

// ==============================================================================
// 5. ĐỜI 24: CÁC CHÁU THUỘC CHI 3
// ==============================================================================

// --- 1. CON ÔNG ĐINH DANH VÙNG (3 TRAI & DÂU) ---
CREATE
  (b3_d24_thanh3:Person
    {
      id: "P_D24_THANH3",
      full_name: "Đinh Danh Thành",
      gender: "MALE",
      generation: 24,
      is_alive: true,
      current_residence: "Hà Nội",
      title: "Thượng tá, ThS Biên phòng, Phó Trưởng phòng Bộ Tham mưu BĐBP",
      birth_year: 1979,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 2 giờ ngày 12/01/1979 (14/12 Mậu Ngọ). Đảng viên ĐCSVN, Thạc sĩ Biên phòng, Thượng tá, nguyên Giảng viên Học viện Biên phòng, hiện là Phó Trưởng phòng thuộc Bộ Tham mưu - Bộ Tư lệnh Bộ đội Biên phòng. Cư trú tại Hà Nội.",
      note: "Sinh 1 gái, 1 trai: Đinh Thu Hà, Đinh Phúc Nguyên."
    })
CREATE
  (b3_d24_giang_w:Person
    {
      id: "P_D24_THANH3_W",
      full_name: "Nguyễn Thu Giang",
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      birth_year: 1979,
      hometown: "Phường Khương Thượng, quận Đống Đa, TP Hà Nội",
      biography:
        "Sinh 04/10/1979 (14/8 Kỷ Mùi), gốc họ Nguyễn Đình. Cử nhân Kinh tế, Kế toán.",
      note: "Cư trú tại Hà Nội."
    })

CREATE
  (b3_d24_cuong:Person
    {
      id: "P_D24_CUONG",
      full_name: "Đinh Danh Cường",
      gender: "MALE",
      generation: 24,
      is_alive: true,
      title: "CĐ Tài chính Kế toán",
      birth_year: 1982,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 22 giờ ngày 19/5/1982 (26/4 Nhâm Tuất). Tốt nghiệp Cao đẳng Tài chính Kế toán. Sinh được 1 gái, 1 trai: Đinh Thị Kim Ngân, Đinh Tấn Đạt."
    })
CREATE
  (b3_d24_yen_cuong_w:Person
    {
      id: "P_D24_CUONG_W",
      full_name: "Dương Thị Yến",
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      birth_year: 1988,
      hometown: "Xã Long Đống, huyện Bắc Sơn, tỉnh Lạng Sơn",
      biography:
        "Sinh 23/12/1988 (15/11 Mậu Thìn). Cử nhân Kinh tế Đối ngoại - Học viện Ngoại giao."
    })

CREATE
  (b3_d24_phuc:Person
    {
      id: "P_D24_PHUC",
      full_name: "Đinh Xuân Phúc",
      gender: "MALE",
      generation: 24,
      is_alive: true,
      current_residence: "Hà Nội",
      title: "Cử nhân Ngân hàng",
      birth_year: 1992,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 2 giờ 17 phút ngày 04/01/1992 (30/11 Tân Mùi). Cử nhân ngành Ngân hàng, kinh doanh Bất động sản tại Hà Nội. Sinh 1 gái, 1 trai: Đinh Thị Khánh Linh, Đinh Phúc Hưng."
    })
CREATE
  (b3_d24_thu_phuc_w:Person
    {
      id: "P_D24_PHUC_W",
      full_name: "Nguyễn Thị Anh Thư",
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      birth_year: 1995,
      hometown: "Quê gốc Hà Tĩnh, nhà tại TP Hạ Long, Quảng Ninh",
      biography:
        "Sinh 16/11/1995 (24/9 Ất Hợi), gốc họ Nguyễn Huy. Kỹ sư Đại học Kiến trúc Hà Nội, kinh doanh bất động sản."
    })

CREATE (b3_d23_vung)-[:FATHER_OF]->(b3_d24_thanh3)
CREATE (b3_d23_vung)-[:FATHER_OF]->(b3_d24_cuong)
CREATE (b3_d23_vung)-[:FATHER_OF]->(b3_d24_phuc)
CREATE (b3_d23_che_w)-[:MOTHER_OF]->(b3_d24_thanh3)
CREATE (b3_d23_che_w)-[:MOTHER_OF]->(b3_d24_cuong)
CREATE (b3_d23_che_w)-[:MOTHER_OF]->(b3_d24_phuc)

CREATE (b3_d24_thanh3)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_giang_w)
CREATE (b3_d24_cuong)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_yen_cuong_w)
CREATE (b3_d24_phuc)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_thu_phuc_w)

// --- 2. CON ÔNG ĐINH DANH LŨNG (1 TRAI, 4 GÁI & RỂ) ---
CREATE
  (b3_d24_som:Person
    {
      id: "P_D24_SOM",
      full_name: "Đinh Thị Sớm",
      birth_year: 1977,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (b3_d24_nhuong_r:Person
    {
      id: "P_D24_NHUONG_R",
      full_name: "Nguyễn Văn Nhương",
      birth_year: 1970,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Thôn Minh Khai, xã Chi Lăng"
    })

CREATE
  (b3_d24_ngoan:Person
    {
      id: "P_D24_NGOAN",
      full_name: "Đinh Thị Ngoan",
      birth_year: 1978,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (b3_d24_khoa_r:Person
    {
      id: "P_D24_KHOA_R",
      full_name: "Phạm Đình Khoa",
      birth_year: 1973,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Thôn Tân Dân, xã Hòa Bình, Hưng Hà"
    })

CREATE
  (b3_d24_hien_l:Person
    {
      id: "P_D24_HIEN_L",
      full_name: "Đinh Thị Hiền",
      birth_year: 1981,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (b3_d24_dan_r:Person
    {
      id: "P_D24_DAN_R",
      full_name: "Nguyễn Văn Dân",
      birth_year: 1974,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Xã Lô Giang, huyện Đông Hưng, Thái Bình"
    })

CREATE
  (b3_d24_huong_l:Person
    {
      id: "P_D24_HUONG_L",
      full_name: "Đinh Thị Hường",
      birth_year: 1984,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà"
    })
CREATE
  (b3_d24_phuong_l_r:Person
    {
      id: "P_D24_PHUONG_R",
      full_name: "Nguyễn Đình Phương",
      birth_year: 1981,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Xã Chi Lăng, Hưng Hà (cư trú Bình Dương)"
    })

CREATE
  (b3_d24_long_l:Person
    {
      id: "P_D24_LONG_L",
      full_name: "Đinh Danh Lộng",
      birth_year: 1989,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography: "Sinh 8 giờ 30 phút ngày 20/5/1989 (Kỷ Tỵ)."
    })

CREATE (b3_d23_lung)-[:FATHER_OF]->(b3_d24_som)
CREATE (b3_d23_lung)-[:FATHER_OF]->(b3_d24_ngoan)
CREATE (b3_d23_lung)-[:FATHER_OF]->(b3_d24_hien_l)
CREATE (b3_d23_lung)-[:FATHER_OF]->(b3_d24_huong_l)
CREATE (b3_d23_lung)-[:FATHER_OF]->(b3_d24_long_l)
CREATE (b3_d23_hin_w)-[:MOTHER_OF]->(b3_d24_som)
CREATE (b3_d23_hin_w)-[:MOTHER_OF]->(b3_d24_ngoan)
CREATE (b3_d23_hin_w)-[:MOTHER_OF]->(b3_d24_hien_l)
CREATE (b3_d23_hin_w)-[:MOTHER_OF]->(b3_d24_huong_l)
CREATE (b3_d23_hin_w)-[:MOTHER_OF]->(b3_d24_long_l)

CREATE (b3_d24_nhuong_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_som)
CREATE (b3_d24_khoa_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_ngoan)
CREATE (b3_d24_dan_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_hien_l)
CREATE (b3_d24_phuong_l_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_huong_l)

// --- 3. CON ÔNG ĐINH DANH MẾN (1 TRAI, 3 GÁI & DÂU, RỂ) ---
CREATE
  (b3_d24_luot:Person
    {
      id: "P_D24_LUOT",
      full_name: "Đinh Thị Lượt",
      birth_year: 1986,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      title: "Tiến sỹ ngành Điều dưỡng, BV Nội tiết Trung ương",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 14 giờ 30 phút ngày 24/12/1986 (16/11 Bính Dần). Tiến sỹ ngành Điều dưỡng, công tác tại Bệnh viện Nội tiết Trung ương. Cư trú tại TP Hà Nội."
    })
CREATE
  (b3_d24_tri_r:Person
    {
      id: "P_D24_TRI_R",
      full_name: "Đinh Đức Trí",
      birth_year: 1981,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      title: "Thạc sỹ Kinh tế, Ban Quản lý dự án quận Hoàng Mai, Hà Nội",
      hometown: "Tỉnh Ninh Bình",
      biography:
        "Sinh 5/4/1981 (01/3 Tân Dậu), quê Ninh Bình, cư trú tại Hà Nội. Thạc sỹ Kinh tế."
    })

CREATE
  (b3_d24_hanh_m:Person
    {
      id: "P_D24_HANH_M",
      full_name: "Đinh Thị Hạnh",
      birth_year: 1989,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      title: "Cử nhân Tài chính Kế toán, Công ty Điện lực Cẩm Giàng",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh 9 giờ ngày 13/10/1989 (14/9 Kỷ Tỵ). Cử nhân Tài chính Kế toán, làm việc tại Công ty Điện lực Cẩm Giàng, Hải Dương."
    })
CREATE
  (b3_d24_khiem_r:Person
    {
      id: "P_D24_KHIEM_R",
      full_name: "Nguyễn Xuân Khiêm",
      birth_year: 1982,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      title: "Sĩ quan Công binh, Quân khu 3, Đảng viên ĐCSVN",
      hometown: "Huyện Cẩm Giàng, tỉnh Hải Dương"
    })

CREATE
  (b3_d24_huong_m:Person
    {
      id: "P_D24_HUONG_M",
      full_name: "Đinh Thị Hương",
      birth_year: 1997,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      title: "Cử nhân Điều dưỡng, BV Nội tiết Trung ương",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh 17 giờ 40 phút ngày 01/11/1997 (02/10 Đinh Sửu), sinh đôi cùng em trai Đinh Danh Hùng. Cử nhân Điều dưỡng, công tác tại BV Nội tiết Trung ương."
    })
CREATE
  (b3_d24_hau_r:Person
    {
      id: "P_D24_HAU_R",
      full_name: "Nguyễn Đình Hậu",
      birth_year: 1996,
      gender: "MALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      title: "Thạc sỹ Kinh tế, BV Nội tiết Trung ương",
      hometown: "Phường Kiến Hưng, quận Hà Đông, TP Hà Nội"
    })

CREATE
  (b3_d24_hung_m:Person
    {
      id: "P_D24_HUNG_M",
      full_name: "Đinh Danh Hùng",
      birth_year: 1997,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      title: "Cử nhân Điều dưỡng, BV Nội tiết Trung ương",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 17 giờ 40 phút ngày 01/11/1997 (02/10 Đinh Sửu), sinh đôi cùng chị Đinh Thị Hương. Cử nhân Điều dưỡng, công tác tại Bệnh viện Nội tiết Trung ương. Sinh được 1 con trai: Đinh Minh Khôi."
    })
CREATE
  (b3_d24_hang_hung_w:Person
    {
      id: "P_D24_HUNG_MW",
      full_name: "Nguyễn Minh Hằng",
      birth_year: 1999,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      title: "Cử nhân Điều dưỡng, BV Nội tiết Trung ương",
      hometown: "Phường Vạn Phúc, quận Hà Đông, TP Hà Nội"
    })

CREATE (b3_d23_men)-[:FATHER_OF]->(b3_d24_luot)
CREATE (b3_d23_men)-[:FATHER_OF]->(b3_d24_hanh_m)
CREATE (b3_d23_men)-[:FATHER_OF]->(b3_d24_huong_m)
CREATE (b3_d23_men)-[:FATHER_OF]->(b3_d24_hung_m)
CREATE (b3_d23_non_w)-[:MOTHER_OF]->(b3_d24_luot)
CREATE (b3_d23_non_w)-[:MOTHER_OF]->(b3_d24_hanh_m)
CREATE (b3_d23_non_w)-[:MOTHER_OF]->(b3_d24_huong_m)
CREATE (b3_d23_non_w)-[:MOTHER_OF]->(b3_d24_hung_m)

CREATE (b3_d24_tri_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_luot)
CREATE (b3_d24_khiem_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_hanh_m)
CREATE (b3_d24_hau_r)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_huong_m)
CREATE (b3_d24_hung_m)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_hang_hung_w)

// --- 4. CON ÔNG ĐINH DANH THUỂ (2 TRAI: ĐINH DANH VŨ & ĐINH TRƯỜNG GIANG) ---
CREATE
  (b3_d24_vu:Person
    {
      id: "P_D24_VU",
      full_name: "Đinh Danh Vũ",
      birth_year: 1989,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      title: "Đại úy, Bộ Chỉ huy Bộ đội Biên phòng Thái Bình, Đảng viên ĐCSVN",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 10 giờ ngày 9/9 Kỷ Tỵ (08/10/1989). Tốt nghiệp Cao đẳng Kỹ thuật Quân sự, Đại úy công tác tại Bộ Chỉ huy Bộ đội Biên phòng tỉnh Thái Bình. Sinh được 1 con trai: Đinh Danh Tuấn."
    })
CREATE
  (b3_d24_ha_vu_w:Person
    {
      id: "P_D24_VU_W",
      full_name: "Hoàng Thị Hà",
      birth_year: 1997,
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      title: "Giáo viên trường Mầm non",
      hometown: "Phường Bồ Xuyên, TP Thái Bình",
      biography:
        "Sinh 01/11/1997 (23/11 Bính Tý). Tốt nghiệp Cao đẳng Sư phạm, giáo viên mầm non."
    })

// ĐINH TRƯỜNG GIANG ĐÃ ĐƯỢC BỔ SUNG ĐẦY ĐỦ Ở ĐÂY
CREATE
  (b3_d24_giang_thue:Person
    {
      id: "P_D24_GIANG_T",
      full_name: "Đinh Trường Giang",
      birth_year: 2000,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      title: "Kỹ sư phần mềm tin học Tập đoàn Viettel, Hà Nội",
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      current_residence: "Hà Nội",
      biography:
        "Sinh ngày 18/6/2000 (17/5 Canh Thìn). Tốt nghiệp Cao đẳng Tin học Bách khoa, làm phần mềm tin học tại Tập đoàn Công nghiệp - Viễn thông Quân đội (Viettel) tại Hà Nội.",
      note: "Con trai thứ hai của ông Đinh Danh Thuể và bà Nguyễn Thị Liễu."
    })

CREATE (b3_d23_thue)-[:FATHER_OF]->(b3_d24_vu)
CREATE (b3_d23_thue)-[:FATHER_OF]->(b3_d24_giang_thue)
CREATE (b3_d23_lieu_thue_w)-[:MOTHER_OF]->(b3_d24_vu)
CREATE (b3_d23_lieu_thue_w)-[:MOTHER_OF]->(b3_d24_giang_thue)
CREATE (b3_d24_vu)-[:MARRIED_TO {marriage_order: 1}]->(b3_d24_ha_vu_w)

// --- 5. CON ÔNG ĐINH DANH PHỐI (1 TRAI, 1 GÁI) ---
CREATE
  (b3_d24_phong_phoi:Person
    {
      id: "P_D24_PHONG_P",
      full_name: "Đinh Danh Phong",
      birth_year: 1992,
      gender: "MALE",
      generation: 24,
      is_alive: true,
      hometown: "Thôn Trần Phú, xã Chi Lăng, huyện Hưng Hà, tỉnh Thái Bình",
      biography:
        "Sinh 16 giờ ngày 7/12 Tân Mùi (07/10/1992). Có 2 đời vợ (đã ly hôn), sinh được 1 con trai với bà Gấm (Đinh Quang Minh) và 3 con gái với bà Cúc (Như, Hân, Linh)."
    })
CREATE
  (b3_d24_gam_w:Person
    {
      id: "P_D24_GAM_W",
      full_name: "Đinh Thị Gấm",
      title: "Vợ trước (ly hôn)",
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Thái Bình"
    })
CREATE
  (b3_d24_cuc_w:Person
    {
      id: "P_D24_CUC_W",
      full_name: "Nguyễn Thị Cúc",
      title: "Vợ sau (ly hôn)",
      gender: "FEMALE",
      in_law: true,
      generation: 24,
      is_alive: true,
      hometown: "Thái Bình"
    })

CREATE
  (b3_d24_hue_phoi:Person
    {
      id: "P_D24_HUE_P",
      full_name: "Đinh Thị Huệ",
      birth_year: 1998,
      gender: "FEMALE",
      generation: 24,
      is_alive: true,
      title: "Cử nhân ngành Bất động sản",
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh 24 giờ ngày 03/9/1998 (13/7 Mậu Dần). Cử nhân ngành Bất động sản, làm việc tại TP. Hồ Chí Minh."
    })

CREATE (b3_d23_phoi)-[:FATHER_OF]->(b3_d24_phong_phoi)
CREATE (b3_d23_phoi)-[:FATHER_OF]->(b3_d24_hue_phoi)
CREATE (b3_d23_nhung_phoi_w)-[:MOTHER_OF]->(b3_d24_phong_phoi)
CREATE (b3_d23_nhung_phoi_w)-[:MOTHER_OF]->(b3_d24_hue_phoi)
CREATE
  (b3_d24_phong_phoi)-[:MARRIED_TO {marriage_order: 1, title: "Vợ trước"}]->
  (b3_d24_gam_w)
CREATE
  (b3_d24_phong_phoi)-[:MARRIED_TO {marriage_order: 2, title: "Vợ sau"}]->
  (b3_d24_cuc_w)

// ==============================================================================
// 6. ĐỜI 25: HẬU DUỆ ĐỜI THỨ 25 CỦA CHI 3
// ==============================================================================

// --- CON ÔNG ĐINH DANH THÀNH ---
CREATE
  (b3_d25_ha:Person
    {
      id: "P_D25_HA",
      full_name: "Đinh Thu Hà",
      birth_year: 2009,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Chi Lăng",
      biography: "Sinh 4 giờ ngày 26/4/2009 (2/3 Kỷ Sửu)."
    })
CREATE
  (b3_d25_nguyen:Person
    {
      id: "P_D25_NGUYEN",
      full_name: "Đinh Phúc Nguyên",
      birth_year: 2011,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Chi Lăng",
      biography: "Sinh 6 giờ 15 phút ngày 31/8/2011 (3/8 Tân Mão)."
    })
CREATE (b3_d24_thanh3)-[:FATHER_OF]->(b3_d25_ha)
CREATE (b3_d24_thanh3)-[:FATHER_OF]->(b3_d25_nguyen)
CREATE (b3_d24_giang_w)-[:MOTHER_OF]->(b3_d25_ha)
CREATE (b3_d24_giang_w)-[:MOTHER_OF]->(b3_d25_nguyen)

// --- CON ÔNG ĐINH DANH CƯỜNG ---
CREATE
  (b3_d25_ngan:Person
    {
      id: "P_D25_NGAN",
      full_name: "Đinh Thị Kim Ngân",
      birth_year: 2012,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Lạng Sơn",
      biography: "Sinh 2 giờ 10 phút ngày 08/11/2012 (25/9 Nhâm Thìn)."
    })
CREATE
  (b3_d25_dat:Person
    {
      id: "P_D25_DAT",
      full_name: "Đinh Tấn Đạt",
      birth_year: 2017,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Lạng Sơn",
      biography: "Sinh 11 giờ 30 phút ngày 15/8/2017 (24/6 nhuận Đinh Dậu)."
    })
CREATE (b3_d24_cuong)-[:FATHER_OF]->(b3_d25_ngan)
CREATE (b3_d24_cuong)-[:FATHER_OF]->(b3_d25_dat)
CREATE (b3_d24_yen_cuong_w)-[:MOTHER_OF]->(b3_d25_ngan)
CREATE (b3_d24_yen_cuong_w)-[:MOTHER_OF]->(b3_d25_dat)

// --- CON ÔNG ĐINH XUÂN PHÚC ---
CREATE
  (b3_d25_linh_xp:Person
    {
      id: "P_D25_LINH_XP",
      full_name: "Đinh Thị Khánh Linh",
      birth_year: 2021,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Quảng Ninh",
      biography: "Sinh 2 giờ 10 phút ngày 08/11/2021 (25/9 Tân Sửu)."
    })
CREATE
  (b3_d25_hung_xp:Person
    {
      id: "P_D25_HUNG_XP",
      full_name: "Đinh Phúc Hưng",
      birth_year: 2024,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Quảng Ninh",
      biography: "Sinh 11 giờ kém 15 phút ngày 02/4/2024 (24/2 Giáp Thìn)."
    })
CREATE (b3_d24_phuc)-[:FATHER_OF]->(b3_d25_linh_xp)
CREATE (b3_d24_phuc)-[:FATHER_OF]->(b3_d25_hung_xp)
CREATE (b3_d24_thu_phuc_w)-[:MOTHER_OF]->(b3_d25_linh_xp)
CREATE (b3_d24_thu_phuc_w)-[:MOTHER_OF]->(b3_d25_hung_xp)

// --- CON ÔNG ĐINH DANH HÙNG ---
CREATE
  (b3_d25_khoi_h:Person
    {
      id: "P_D25_KHOI_H",
      full_name: "Đinh Minh Khôi",
      birth_year: 2024,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Hà Nội / Chi Lăng",
      biography: "Sinh ngày 22/4/2024 (14/3 Giáp Thìn)."
    })
CREATE (b3_d24_hung_m)-[:FATHER_OF]->(b3_d25_khoi_h)
CREATE (b3_d24_hang_hung_w)-[:MOTHER_OF]->(b3_d25_khoi_h)

// --- CON ÔNG ĐINH DANH VŨ ---
CREATE
  (b3_d25_tuan_v:Person
    {
      id: "P_D25_TUAN_V",
      full_name: "Đinh Danh Tuấn",
      birth_year: 2022,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Thái Bình",
      biography: "Sinh 5 giờ 5 phút ngày 03/8/2022 (06/7 Nhâm Dần)."
    })
CREATE (b3_d24_vu)-[:FATHER_OF]->(b3_d25_tuan_v)
CREATE (b3_d24_ha_vu_w)-[:MOTHER_OF]->(b3_d25_tuan_v)

// --- CON ÔNG ĐINH DANH PHONG ---
CREATE
  (b3_d25_minh_p:Person
    {
      id: "P_D25_MINH_P",
      full_name: "Đinh Quang Minh",
      birth_year: 2013,
      gender: "MALE",
      generation: 25,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà, Thái Bình",
      biography:
        "Sinh 19 giờ 10 phút ngày 06/4/2013 (25/02 Quý Tỵ). Mẹ là Đinh Thị Gấm."
    })
CREATE
  (b3_d25_nhu_p:Person
    {
      id: "P_D25_NHU_P",
      full_name: "Đinh Gia Như",
      birth_year: 2012,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà",
      note: "Sinh ngày 14/8/2012. Mẹ là Nguyễn Thị Cúc."
    })
CREATE
  (b3_d25_han_p:Person
    {
      id: "P_D25_HAN_P",
      full_name: "Đinh Gia Hân",
      birth_year: 2015,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà",
      note: "Sinh ngày 10/6/2015. Mẹ là Nguyễn Thị Cúc."
    })
CREATE
  (b3_d25_linh_p:Person
    {
      id: "P_D25_LINH_P",
      full_name: "Đinh Gia Linh",
      birth_year: 2019,
      gender: "FEMALE",
      generation: 25,
      is_alive: true,
      hometown: "Chi Lăng, Hưng Hà",
      note: "Sinh ngày 20/8/2019. Mẹ là Nguyễn Thị Cúc."
    })

CREATE (b3_d24_phong_phoi)-[:FATHER_OF]->(b3_d25_minh_p)
CREATE (b3_d24_gam_w)-[:MOTHER_OF]->(b3_d25_minh_p)

CREATE (b3_d24_phong_phoi)-[:FATHER_OF]->(b3_d25_nhu_p)
CREATE (b3_d24_phong_phoi)-[:FATHER_OF]->(b3_d25_han_p)
CREATE (b3_d24_phong_phoi)-[:FATHER_OF]->(b3_d25_linh_p)
CREATE (b3_d24_cuc_w)-[:MOTHER_OF]->(b3_d25_nhu_p)
CREATE (b3_d24_cuc_w)-[:MOTHER_OF]->(b3_d25_han_p)
CREATE (b3_d24_cuc_w)-[:MOTHER_OF]->(b3_d25_linh_p);