package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "phan_cong_giang_day")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PhanCongGiangDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_ke_hoach_mo_nhom")
    private KeHoachMoNhom keHoachMoNhom;

    @ManyToOne
    @JoinColumn(name = "id_giang_vien")
    private GiangVien giangVien;

    private String nhom;
    private Integer soTietThucHien;
    private Integer soTietThucTe;
}
