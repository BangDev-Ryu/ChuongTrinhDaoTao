package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ct_khoi_kien_thuc")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CTKhoiKienThuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ten;

    @Column(name = "tc_bat_buoc")
    private int tcBatBuoc;

    @Column(name = "tc_tu_chon")
    private int tcTuChon;

    @Column(name = "id_khoi_kien_thuc")
    private KhoiKienThuc khoiKienThuc;
}
