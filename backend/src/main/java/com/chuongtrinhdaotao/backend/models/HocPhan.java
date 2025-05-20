package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hoc_phan")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HocPhan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_thong_tin_chung")
    private ThongTinChung thongTinChung;

    private String loaiKhoiKienThuc;
    private String khoiKienThuc;
    private String maHocPhan;
    private String ten;
    private String loaiHocPhan;
    private Integer soTinChi;
    private Integer soLyThuyet;
    private Integer soThucHanh;
    private Integer soThucTap;
    private Double heSo;
    private Integer hocKyThucHien;
    private String maHocPhanTruoc;
}
