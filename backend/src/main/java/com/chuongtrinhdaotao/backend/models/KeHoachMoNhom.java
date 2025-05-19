package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ke_hoach_mo_nhom")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class KeHoachMoNhom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String khoa;

    @Column(name = "so_luong_nhom")
    private int soLuongNhom;

    @Column(name = "sl_sv_moi_nhom")
    private int slSvMoiNhom;

    @Column(name = "id_ke_hoach_day_hoc")
    private KeHoachDayHoc keHoachDayHoc;
}
