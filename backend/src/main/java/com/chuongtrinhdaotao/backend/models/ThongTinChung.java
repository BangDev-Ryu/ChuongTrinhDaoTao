package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "thong_tin_chung")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ThongTinChung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_goi")
    private String tenGoi;

    private String bac;

    @Column(name = "loai_bang")
    private String loaiBang;

    @Column(name = "loai_hinh")
    private String loaiHinh;

    @Column(name = "thoi_gian")
    private Float thoiGian;

    @Column(name = "tc_toi_thieu")
    private int tcToiThieu;

    private String khoa;

    @Column(name = "ngon_ngu")
    private String ngonNgu;

    private String website;

    @Column(name = "ban_hanh")
    private String banHanh;

    @Column(name = "trang_thai")
    private boolean trangThai;
}
