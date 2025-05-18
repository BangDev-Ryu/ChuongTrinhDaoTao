package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ct_cot_diem")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CTCotDiem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ten;

    @Column(name = "trong_so")
    private Float trongSo;

    @Column(name = "hinh_thuc")
    private String hinhThuc;

    @Column(name = "id_de_cuong_chi_tiet")
    private DeCuongChiTiet deCuongChiTiet;

}
