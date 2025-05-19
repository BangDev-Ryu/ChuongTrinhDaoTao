package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "giang_vien")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class GiangVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ho_ten")
    private String hoTen;

    @Column(name = "nam_sinh")
    private int namSinh;

    private String khoa;

    @Column(name = "chuc_danh")
    private String chucDanh;

    @Column(name = "trinh_do")
    private String trinhDo;

    @Column(name = "trang_hai")
    private boolean trangThai;

    @Column(name = "ma_giang_vien")
    private String maGiangVien;

}
