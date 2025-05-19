package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Entity
@Table(name = "khoi_kien_thuc")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KhoiKienThuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @OneToMany(mappedBy = "khoiKienThuc", cascade = CascadeType.ALL, orphanRemoval = true)
    private ArrayList<CTKhoiKienThuc> ctKhoiKienThucs = new ArrayList<>();
}