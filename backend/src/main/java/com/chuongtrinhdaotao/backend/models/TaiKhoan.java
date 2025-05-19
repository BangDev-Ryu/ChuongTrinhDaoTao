package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tai_khoan")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    @Column(name = "trang_thai")
    private boolean trangThai;

    @Column(name = "id_giang_vien")
    private GiangVien giangVien;
}
