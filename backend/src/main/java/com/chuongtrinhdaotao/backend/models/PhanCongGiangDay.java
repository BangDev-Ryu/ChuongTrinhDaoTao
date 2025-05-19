package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "phan_cong_giang_day")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class PhanCongGiangDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "so_tiet_thuc_hien")
    private int soTietThucHien;

    @Column(name = "so_tiet_thuc_te")
    private int soTietThucTe;

    private int nhom;

    @Column(name = "id_giang_vien")
    private GiangVien giangVien;

    @Column(name = "id_ke_hoach_mo_nhom")
    private KeHoachMoNhom keHoachMoNhom;
}
