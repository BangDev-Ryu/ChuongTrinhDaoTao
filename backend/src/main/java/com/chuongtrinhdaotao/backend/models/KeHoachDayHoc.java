package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ke_hoach_day_hoc")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class KeHoachDayHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ma_hoc_phan")
    private String maHocPhan;

    @Column(name = "ma_hoc_phan_truoc")
    private String maHocPhanTruoc;

    @Column(name = "hoc_ky")
    private int hocKy;
}
