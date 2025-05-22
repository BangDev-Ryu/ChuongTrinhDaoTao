package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "chuc_danh")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChucDanh {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String name;
  private String description;
}
