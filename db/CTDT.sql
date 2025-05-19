CREATE DATABASE chuongtrinhdaotao;
USE chuongtrinhdaotao;
CREATE TABLE thong_tin_chung(
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_goi VARCHAR(255) NOT NULL,
    bac VARCHAR(100) NOT NULL,
    loai_bang VARCHAR(100) NOT NULL,
    loai_hinh VARCHAR(100) NOT NULL,
    thoi_gian FLOAT,
    tc_toi_thieu INT,
    khoa VARCHAR(100) NOT NULL,
    ngon_ngu VARCHAR(100) NOT NULL,
    website VARCHAR(100) NOT NULL,
    ban_hanh VARCHAR(100) NOT NULL,
    trang_thai TINYINT DEFAULT 1
);
-- **********--
CREATE TABLE khung_chuong_trinh(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_thong_tin_chung INT,
    FOREIGN KEY (id_thong_tin_chung) REFERENCES thong_tin_chung(id)
);
-- **********--
CREATE TABLE khoi_kien_thuc(
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(100) NOT NULL,
    id_khung_chuong_trinh INT,
    FOREIGN KEY (id_khung_chuong_trinh) REFERENCES khung_chuong_trinh(id)
);
-- **********--
CREATE TABLE ct_khoi_kien_thuc(
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(100) NOT NULL,
    tc_bat_buoc INT,
    tc_tu_chon INT,
    id_khoi_kien_thuc INT,
    FOREIGN KEY (id_khoi_kien_thuc) REFERENCES khoi_kien_thuc(id)
);

CREATE TABLE hoc_phan(
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255) NOT NULL,
    so_tin_chi INT,
    tiet_ly_thuyet INT,
    tiet_thuc_hanh INT,
    tiet_thuc_tap INT,
    he_so_hoc_phan FLOAT,
    trang_thai TINYINT DEFAULT 1,
    id_ct_khoi_kien_thuc INT,
    FOREIGN KEY (id_ct_khoi_kien_thuc) REFERENCES ct_khoi_kien_thuc(id)
);

CREATE TABLE de_cuong_chi_tiet(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_hoc_phan INT,
    FOREIGN KEY (id_hoc_phan) REFERENCES hoc_phan(id)
);

CREATE TABLE ct_cot_diem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255) NOT NULL,
    trong_so FLOAT,
    hinh_thuc VARCHAR(255) NOT NULL,
    id_de_cuong_chi_tiet INT,
    FOREIGN KEY (id_de_cuong_chi_tiet) REFERENCES de_cuong_chi_tiet(id)
);

CREATE TABLE ke_hoach_day_hoc (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_hoc_phan VARCHAR(6),
    ma_hoc_phan_truoc VARCHAR(6),
    hoc_ky int
);

CREATE TABLE ke_hoach_mo_nhom (
    id INT PRIMARY KEY AUTO_INCREMENT,
    khoa VARCHAR(255) NOT NULL,
    so_luong_nhom INT,
    sl_sv_moi_nhom INT,
    id_ke_hoach_day_hoc INT,
    FOREIGN KEY (id_ke_hoach_day_hoc) REFERENCES ke_hoach_day_hoc(id)

);
CREATE TABLE giang_vien (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ho_ten VARCHAR(255) NOT NULL,
    nam_sinh INT,
    khoa VARCHAR(255) NOT NULL,
    chuc_danh VARCHAR(255) NOT NULL,
    trinh_do VARCHAR(255) NOT NULL,
    trang_thai TINYINT DEFAULT 1
);
CREATE TABLE phan_cong_giang_day (
    id INT PRIMARY KEY AUTO_INCREMENT,
    so_tiet_thuc_hien INT,
    so_tiet_thuc_te INT,
    nhom INT,
    id_giang_vien INT,
    FOREIGN KEY (id_giang_vien) REFERENCES giang_vien(id),
    id_ke_hoach_mo_nhom INT,
    FOREIGN KEY (id_ke_hoach_mo_nhom) REFERENCES ke_hoach_mo_nhom(id)
);


CREATE TABLE tai_khoan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(10) NOT NULL,
    password VARCHAR(50),
    trang_thai TINYINT DEFAULT 1,
    id_giang_vien INT,
    FOREIGN KEY (id_giang_vien) REFERENCES giang_vien(id)
);

ALTER TABLE hoc_phan
ADD COLUMN ma_hoc_phan VARCHAR(6) NOT NULL;

ALTER TABLE giang_vien
ADD COLUMN ma_giang_vien VARCHAR(6) NOT NULL;
