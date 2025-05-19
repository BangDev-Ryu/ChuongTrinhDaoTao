package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "khoi_kien_thuc")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CTKhoiKienThuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "id_khoi_kien_thuc")
    private KhoiKienThuc khoiKienThuc;
}
