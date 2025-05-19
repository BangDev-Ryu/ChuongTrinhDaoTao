package com.chuongtrinhdaotao.backend.dtos;

import com.chuongtrinhdaotao.backend.models.KhungChuongTrinh;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class KhoiKienThucDTO {
    private String ten;

    @Column(name = "id_khung_chuong_trinh")
    private Long idKhungChuongTrinh;
}
