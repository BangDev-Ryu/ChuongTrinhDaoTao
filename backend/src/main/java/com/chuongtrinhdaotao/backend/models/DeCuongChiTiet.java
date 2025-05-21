package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "de_cuong_chi_tiet")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeCuongChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_hoc_phan")
    private HocPhan hocPhan;

    private String boPhanDanhGia;
    private String diemDanhGia;
    private Double trongSo;
    private String hinhThuc;
}
