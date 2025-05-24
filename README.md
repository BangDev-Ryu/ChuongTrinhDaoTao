# ChuongTrinhDaoTao

## Giới thiệu

ChuongTrinhDaoTao là hệ thống quản lý chương trình đào tạo, giúp tổ chức và theo dõi các thông tin liên quan đến giảng viên, học phần, kế hoạch giảng dạy, và phân công giảng dạy trong từng năm học.

## Công nghệ sử dụng

- **Backend**: Spring Boot (Java)
- **Frontend**: React + Vite
- **Cơ sở dữ liệu**: MySQL

## Các tính năng chính

- Quản lý thông tin chung về chương trình đào tạo
- Xây dựng khung chương trình, danh sách học phần và đề cương chi tiết
- Kế hoạch dạy học từng học kỳ và mở nhóm lớp trong năm học
- Phân công giảng dạy và quản lý danh sách giảng viên
- Xuất mẫu in, thống kê dữ liệu liên quan đến chương trình đào tạo

## Cấu trúc cơ sở dữ liệu

| Bảng                    | Mô tả                                    |
| ----------------------- | ---------------------------------------- |
| `ctdt_thongtinchung`    | Thông tin chung về chương trình đào tạo  |
| `ctdt_khungchuongtrinh` | Khung chương trình                       |
| `ctdt_hocphan`          | Danh sách các học phần                   |
| `ctdt_decuongchitiet`   | Đề cương chi tiết học phần               |
| `ctdt_kehoachdayhoc`    | Kế hoạch dạy học từng học kỳ             |
| `ctdt_kehoachmonhom`    | Kế hoạch mở nhóm lớp trong năm học       |
| `ctdt_phanconggiangday` | Phân công giảng dạy trong năm học        |
| `ctdt_user`             | Danh sách người dùng chung giảng viên    |
| `ctdt_giangvien`        | Danh sách giảng viên cơ hữu, thỉnh giảng |

## Hướng dẫn cài đặt

1. **Clone repo**:
   ```sh
   git clone https://github.com/yourusername/ChuongTrinhDaoTao.git
   cd ChuongTrinhDaoTao
   ```
2. **Cài đặt Backend**:

   - Cấu hình môi trường Spring Boot (Java 21)
   - Thiết lập kết nối cơ sở dữ liệu MySQL
   - Chạy ứng dụng với:
     ```sh
     mvn spring-boot:run
     ```

3. **Cài đặt Frontend**:
   - Cài đặt dependencies:
     ```sh
     npm install
     ```
   - Chạy ứng dụng:
     ```sh
     npm run dev
     ```

## Thêm chương trình đào tạo cụ thể

Bạn có thể dán thông tin về chương trình đào tạo CNTT của một trường đại học vào đây:

## Chương trình đào tạo CNTT mẫu

### Giới thiệu

Chương trình đào tạo kỹ sư Công nghệ thông tin (CNTT) được giảng dạy hệ chính quy ở trình độ đại học, thiết kế lần đầu năm 2007 và cập nhật định kỳ 4 năm một lần. Phiên bản mới nhất áp dụng cho giai đoạn 2024-2028, với tổng số **155 tín chỉ** và thời gian đào tạo **4.5 năm**.

### Thông tin chung

| Thuộc tính              | Giá trị                                                      |
| ----------------------- | ------------------------------------------------------------ |
| **Tên chương trình**    | Chương trình đào tạo ngành Công nghệ thông tin               |
| **Bậc học**             | Đại học (Bậc 7/8 đối với đào tạo kỹ sư)                      |
| **Loại bằng**           | Kỹ sư                                                        |
| **Loại hình đào tạo**   | Chính quy                                                    |
| **Thời gian**           | 4.5 năm                                                      |
| **Tổng tín chỉ**        | 155                                                          |
| **Khoa quản lý**        | Công nghệ thông tin                                          |
| **Ngôn ngữ giảng dạy**  | Tiếng Việt                                                   |
| **Website**             | [redacted.redacted.edu.vn](http://redacted.redacted.edu.vn/) |
| **Quyết định ban hành** | Theo Quyết định số …./QĐ-ĐHREDACTED ngày … tháng … năm 2020  |

### Cấu trúc chương trình

Chương trình giảng dạy chia thành 3 khối kiến thức chính:

1. **Kiến thức giáo dục đại cương** (34 tín chỉ)
2. **Kiến thức giáo dục chuyên nghiệp** (90 tín chỉ bắt buộc, 31 tín chỉ tự chọn)
3. **Kiến thức chuyên ngành** (16 tín chỉ bắt buộc, 15 tín chỉ tự chọn)

| Khối kiến thức         | Bắt buộc | Tự chọn | Tổng tín chỉ |
| ---------------------- | -------- | ------- | ------------ |
| Giáo dục đại cương     | 34       | 0       | 34           |
| Giáo dục chuyên nghiệp | 90       | 31      | 121          |
| Chuyên ngành           | 16       | 15      | 31           |
| **Tổng cộng**          | **124**  | **31**  | **155**      |

### Danh sách học phần

#### Khối kiến thức giáo dục đại cương

- Triết học Mác – Lênin
- Kinh tế chính trị Mác – Lênin
- Chủ nghĩa xã hội khoa học
- Tư tưởng Hồ Chí Minh
- Lịch sử Đảng Cộng sản Việt Nam
- Tiếng Anh 1, 2, 3
- Pháp luật đại cương
- Xác suất thống kê
- Giải tích 1, 2
- Đại số tuyến tính

#### Khối kiến thức chuyên nghiệp

- Cơ sở lập trình
- Kỹ thuật lập trình
- Kiến trúc máy tính
- Hệ điều hành
- Cấu trúc dữ liệu và giải thuật
- Mạng máy tính
- Phương pháp lập trình hướng đối tượng
- Cơ sở dữ liệu
- Công nghệ phần mềm
- Phân tích thiết kế hệ thống thông tin

### Kế hoạch giảng dạy

Chương trình đào tạo tuân theo kế hoạch giảng dạy 12 học kỳ, với các môn học có điều kiện tiên quyết và phân bổ hợp lý.

### Đội ngũ giảng viên

| STT | Họ và tên | Trình độ |
| --- | --------- | -------- |
| 1   | Nguyễn A  | Ths      |
| 2   | Nguyễn Lê | Ths      |
| 3   | Nguyễn T  | PGS, TS  |
| 4   | Lê Th     | Ths      |
| 5   | Phan N    | Ths      |
| 6   | Trương B  | Ths      |

---

Bạn có thể dán trực tiếp vào README của **ChuongTrinhDaoTao**. Nếu cần điều chỉnh thêm, cứ cho tôi biết nhé! 🚀
