package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ke_hoach_mo_nhom")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KeHoachMoNhom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_hoc_phan")
    private HocPhan hocPhan;

    private String khoa;
    private Integer tongSoNhom;
    private Integer soLuongSinhVienNhom;
}
