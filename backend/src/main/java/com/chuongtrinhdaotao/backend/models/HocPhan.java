package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hoc_phan")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class HocPhan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ten;

    @Column(name = "so_tin_chi")
    private int soTinChi;

    @Column(name = "tiet_ly_thuyet")
    private int tietLyThuyet;

    @Column(name = "tiet_thuc_hanh")
    private int tietThucHanh;

    @Column(name = "tiet_thuc_tap")
    private int tietThucTap;

    @Column(name = "he_so_hoc_phan")
    private float heSo;

    @Column(name = "trang_thai")
    private boolean trangThai;

    @Column(name = "id_ct_khoi_kien_thuc")
    private CTKhoiKienThuc ctKhoiKienThuc;

    @Column(name = "ma_hoc_phan")
    private int maHocPhan;
}
