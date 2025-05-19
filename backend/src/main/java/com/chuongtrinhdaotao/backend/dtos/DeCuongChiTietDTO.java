package com.chuongtrinhdaotao.backend.dtos;

import com.chuongtrinhdaotao.backend.models.HocPhan;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class DeCuongChiTietDTO {
    @Column(name = "id_hoc_phan")
    private Long idHocPhan;
}
