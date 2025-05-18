package com.chuongtrinhdaotao.backend.dtos;

import com.chuongtrinhdaotao.backend.models.ThongTinChung;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class KhungChuongTrinhDTO {
    @JsonProperty("id_thong_tin_chung")
    private Long idThongTinChung;
}
