package com.chuongtrinhdaotao.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vien_chuc")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VienChuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String ten;
}
