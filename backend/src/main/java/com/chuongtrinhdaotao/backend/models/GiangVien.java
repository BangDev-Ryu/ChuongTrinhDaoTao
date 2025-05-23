package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

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

  @Nullable
  @ManyToOne
  @JoinColumn(name = "id_chuc_danh")
  private ChucDanh chucDanh;

  private int namSinh;
}
