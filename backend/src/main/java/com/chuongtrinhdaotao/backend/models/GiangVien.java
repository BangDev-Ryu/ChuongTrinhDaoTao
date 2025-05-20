package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Entity
@Table(name = "giang_vien")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GiangVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String ten;
    private String chucDanh;
    private int namSinh;

    @OneToMany(mappedBy = "giangVien", cascade = CascadeType.ALL, orphanRemoval = true)
    private ArrayList<PhanCongGiangDay> phanCongGiangDays = new ArrayList<>();

    @OneToOne(mappedBy = "giangVien", cascade = CascadeType.ALL, orphanRemoval = true)
    private User user;

}
