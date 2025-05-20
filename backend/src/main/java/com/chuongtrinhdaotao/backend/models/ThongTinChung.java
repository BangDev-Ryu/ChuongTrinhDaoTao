package com.chuongtrinhdaotao.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "thong_tin_chung")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ThongTinChung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String ten;
    private String bac;
    private String loaiBang;
    private String loaiHinhDaoTao;
    private String thoiGian;
    private Integer tinChiTichLuy;
    private String khoaQuanLy;
    private String ngonNgu;
    private String website;
    private String banHanh;
}
