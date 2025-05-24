-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 23, 2025 at 03:59 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chuongtrinhdaotao`
--

-- --------------------------------------------------------

--
-- Table structure for table `de_cuong_chi_tiet`
--

CREATE TABLE `de_cuong_chi_tiet` (
  `id` int NOT NULL,
  `bo_phan_danh_gia` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `diem_danh_gia` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `hinhthuc` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `trong_so` double DEFAULT NULL,
  `id_hoc_phan` int DEFAULT NULL,
  `hinh_thuc` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `giang_vien`
--

CREATE TABLE `giang_vien` (
  `id` int NOT NULL,
  `chuc_danh` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nam_sinh` int NOT NULL,
  `ten` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hoc_phan`
--

CREATE TABLE `hoc_phan` (
  `id` int NOT NULL,
  `he_so` double DEFAULT NULL,
  `hoc_ky_thuc_hien` int DEFAULT NULL,
  `khoi_kien_thuc` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `loai_hoc_phan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `loai_khoi_kien_thuc` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ma_hoc_phan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ma_hoc_phan_truoc` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `so_ly_thuyet` int DEFAULT NULL,
  `so_thuc_hanh` int DEFAULT NULL,
  `so_thuc_tap` int DEFAULT NULL,
  `so_tin_chi` int DEFAULT NULL,
  `ten` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_thong_tin_chung` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hoc_phan`
--

INSERT INTO `hoc_phan` (`id`, `he_so`, `hoc_ky_thuc_hien`, `khoi_kien_thuc`, `loai_hoc_phan`, `loai_khoi_kien_thuc`, `ma_hoc_phan`, `ma_hoc_phan_truoc`, `so_ly_thuyet`, `so_thuc_hanh`, `so_thuc_tap`, `so_tin_chi`, `ten`, `id_thong_tin_chung`) VALUES
(1, 1, 7, 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '695728', '466960', 25, 19, 32, 3, 'Hệ điều hành', 1),
(2, 1, 4, 'Kiến thức Lý luận chính trị', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '447786', '875803', 14, 17, 38, 2, 'Lập trình C cơ bản', 1),
(3, 1, 9, 'Kiến thức Ngoại ngữ', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '983470', '228291', 43, 36, 24, 1, 'Lập trình hướng đối tượng', 1),
(4, 1, 12, 'Kiến thức Ngoại ngữ', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '860458', '867806', 38, 23, 26, 3, 'Quản trị mạng', 1),
(5, 1, 10, 'Kiến thức ngành', 'Tự chọn', 'Khối kiến thức giáo dục chuyên nghiệp', '523244', '957375', 36, 21, 44, 4, 'Phát triển ứng dụng web', 1),
(6, 1, 1, 'Kiến thức Ngoại ngữ', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '364453', '851019', 7, 29, 22, 3, 'Lập trình Java', 1),
(7, 1, 7, 'Kiến thức chuyên ngành', 'Bắt buộc', 'Khối kiến thức giáo dục chuyên nghiệp', '610448', '953611', 33, 41, 30, 4, 'Phân tích thiết kế hệ thống', 1),
(8, 1, 9, 'Kiến thức Ngoại ngữ', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '580231', '350317', 36, 35, 32, 2, 'Mạng máy tính', 1),
(9, 1, 4, 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '477790', '192777', 17, 21, 33, 3, 'Trí tuệ nhân tạo', 1),
(10, 1, 12, 'Kiến thức Ngoại ngữ', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '665665', '447954', 11, 26, 35, 4, 'Hệ quản trị CSDL', 1),
(11, 1, 9, 'Kiến thức ngành', 'Bắt buộc', 'Khối kiến thức giáo dục chuyên nghiệp', '110198', '211773', 30, 33, 14, 3, 'Cấu trúc dữ liệu và giải thuật', 1),
(12, 1, 2, 'Kiến thức cơ sở của ngành', 'Bắt buộc', 'Khối kiến thức giáo dục chuyên nghiệp', '403309', '546922', 9, 45, 11, 2, 'Phát triển ứng dụng Web', 1),
(13, 1, 5, 'Kiến thức Lý luận chính trị', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '725810', '471876', 32, 20, 10, 4, 'Nhập môn lập trình', 1),
(14, 1, 6, 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '225457', '671790', 45, 20, 28, 3, 'Hệ điều hành', 1),
(15, 1, 1, 'Kiến thức Lý luận chính trị', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '285301', '296098', 16, 12, 9, 3, 'An toàn hệ thống', 1),
(16, 1, 12, 'Kiến thức chuyên ngành', 'Tự chọn', 'Khối kiến thức giáo dục chuyên nghiệp', '720605', '671216', 9, 18, 41, 4, 'Lập trình C++', 1),
(17, 1, 9, 'Kiến thức giáo dục đại cương khác', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '386261', '604675', 40, 7, 14, 2, 'Thống kê ứng dụng', 1),
(18, 1, 6, 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '543589', '638929', 21, 23, 31, 1, 'Kỹ năng mềm', 1),
(19, 1, 4, 'Kiến thức chuyên ngành', 'Tự chọn', 'Khối kiến thức giáo dục chuyên nghiệp', '994365', '800445', 25, 27, 5, 4, 'Tư tưởng Hồ Chí Minh', 1),
(20, 1, 12, 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '789347', '720647', 5, 32, 31, 2, 'Toán rời rạc', 1),
(21, 1, 3, 'Kiến thức chuyên ngành', 'Tự chọn', 'Khối kiến thức giáo dục chuyên nghiệp', '625064', '685429', 37, 26, 7, 2, 'Cơ sở dữ liệu nâng cao', 1),
(22, 1, 6, 'Kiến thức chuyên ngành', 'Tự chọn', 'Khối kiến thức giáo dục chuyên nghiệp', '276925', '616985', 11, 6, 31, 3, 'Công nghệ phần mềm', 1),
(23, 1, 2, 'Kiến thức Lý luận chính trị', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '523337', '622568', 19, 26, 20, 1, 'Thực tập doanh nghiệp', 1),
(24, 1, 3, 'Kiến thức Ngoại ngữ', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '693517', '601439', 22, 14, 8, 4, 'Kỹ thuật phần mềm', 1),
(25, 1, 2, 'Kiến thức giáo dục đại cương khác', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '224619', '873369', 21, 19, 18, 3, 'Quản lý dự án CNTT', 1),
(26, 1, 2, 'Kiến thức giáo dục đại cương khác', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '559737', '695119', 30, 41, 19, 1, 'Học máy', 1),
(27, 1, 6, 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '814210', '966259', 25, 45, 33, 2, 'Xử lý ảnh số', 1),
(28, 1, 1, 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh', 'Bắt buộc', 'Khối kiến thức giáo dục đại cương', '694183', '507551', 13, 25, 43, 2, 'Điện toán đám mây', 1),
(29, 1, 11, 'Kiến thức Ngoại ngữ', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '639076', '700881', 32, 5, 22, 2, 'Phát triển ứng dụng di động', 1),
(30, 1, 2, 'Kiến thức Ngoại ngữ', 'Tự chọn', 'Khối kiến thức giáo dục đại cương', '355686', '484487', 33, 27, 6, 2, 'Blockchain cơ bản', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ke_hoach_mo_nhom`
--

CREATE TABLE `ke_hoach_mo_nhom` (
  `id` int NOT NULL,
  `khoa` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `so_luong_sinh_vien_nhom` int DEFAULT NULL,
  `tong_so_nhom` int DEFAULT NULL,
  `id_hoc_phan` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phan_cong_giang_day`
--

CREATE TABLE `phan_cong_giang_day` (
  `id` int NOT NULL,
  `nhom` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `so_tiet_thuc_hien` int DEFAULT NULL,
  `so_tiet_thuc_te` int DEFAULT NULL,
  `id_giang_vien` int DEFAULT NULL,
  `id_ke_hoach_mo_nhom` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thong_tin_chung`
--

CREATE TABLE `thong_tin_chung` (
  `id` int NOT NULL,
  `bac` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ban_hanh` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `khoa_quan_ly` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `loai_bang` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `loai_hinh_dao_tao` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ngon_ngu` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ten` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `thoi_gian` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tin_chi_tich_luy` int DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thong_tin_chung`
--

INSERT INTO `thong_tin_chung` (`id`, `bac`, `ban_hanh`, `khoa_quan_ly`, `loai_bang`, `loai_hinh_dao_tao`, `ngon_ngu`, `ten`, `thoi_gian`, `tin_chi_tich_luy`, `website`) VALUES
(1, 'Đại học', 'Theo quyết định ...', 'Công nghệ thông tin', 'Kỹ sư', 'Chính quy', 'Tiếng Việt', 'Chương trình đạo tạo ngành CNTT', '4.5 năm', 155, 'fit.sgu.edu.vn');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_giang_vien` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vien_chuc`
--

CREATE TABLE `vien_chuc` (
  `id` int NOT NULL,
  `ten` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vien_chuc`
--

INSERT INTO `vien_chuc` (`id`, `ten`) VALUES
(1, 'admin'),
(2, 'giang_vien');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `de_cuong_chi_tiet`
--
ALTER TABLE `de_cuong_chi_tiet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK9sjs07783ppqtn6tkrw0doc8u` (`id_hoc_phan`);

--
-- Indexes for table `giang_vien`
--
ALTER TABLE `giang_vien`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hoc_phan`
--
ALTER TABLE `hoc_phan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkbdtp1rp6in6un0g7rf2tihf4` (`id_thong_tin_chung`);

--
-- Indexes for table `ke_hoach_mo_nhom`
--
ALTER TABLE `ke_hoach_mo_nhom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqwvwemuyojg4g8jji4g409jl3` (`id_hoc_phan`);

--
-- Indexes for table `phan_cong_giang_day`
--
ALTER TABLE `phan_cong_giang_day`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKhtgwvewsdrwfwgnip4w8ogovr` (`id_giang_vien`),
  ADD KEY `FK8fw9ot9w65lqtnktp2llm8dea` (`id_ke_hoach_mo_nhom`);

--
-- Indexes for table `thong_tin_chung`
--
ALTER TABLE `thong_tin_chung`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKlna0xa288wi61x2vi8hjb8bte` (`id_giang_vien`);

--
-- Indexes for table `vien_chuc`
--
ALTER TABLE `vien_chuc`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `de_cuong_chi_tiet`
--
ALTER TABLE `de_cuong_chi_tiet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `giang_vien`
--
ALTER TABLE `giang_vien`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hoc_phan`
--
ALTER TABLE `hoc_phan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `ke_hoach_mo_nhom`
--
ALTER TABLE `ke_hoach_mo_nhom`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phan_cong_giang_day`
--
ALTER TABLE `phan_cong_giang_day`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thong_tin_chung`
--
ALTER TABLE `thong_tin_chung`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vien_chuc`
--
ALTER TABLE `vien_chuc`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `de_cuong_chi_tiet`
--
ALTER TABLE `de_cuong_chi_tiet`
  ADD CONSTRAINT `FK9sjs07783ppqtn6tkrw0doc8u` FOREIGN KEY (`id_hoc_phan`) REFERENCES `hoc_phan` (`id`);

--
-- Constraints for table `hoc_phan`
--
ALTER TABLE `hoc_phan`
  ADD CONSTRAINT `FKkbdtp1rp6in6un0g7rf2tihf4` FOREIGN KEY (`id_thong_tin_chung`) REFERENCES `thong_tin_chung` (`id`);

--
-- Constraints for table `ke_hoach_mo_nhom`
--
ALTER TABLE `ke_hoach_mo_nhom`
  ADD CONSTRAINT `FKqwvwemuyojg4g8jji4g409jl3` FOREIGN KEY (`id_hoc_phan`) REFERENCES `hoc_phan` (`id`);

--
-- Constraints for table `phan_cong_giang_day`
--
ALTER TABLE `phan_cong_giang_day`
  ADD CONSTRAINT `FK8fw9ot9w65lqtnktp2llm8dea` FOREIGN KEY (`id_ke_hoach_mo_nhom`) REFERENCES `ke_hoach_mo_nhom` (`id`),
  ADD CONSTRAINT `FKhtgwvewsdrwfwgnip4w8ogovr` FOREIGN KEY (`id_giang_vien`) REFERENCES `giang_vien` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK88u2l09qm37o38yrec7c5xi48` FOREIGN KEY (`id_giang_vien`) REFERENCES `giang_vien` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
