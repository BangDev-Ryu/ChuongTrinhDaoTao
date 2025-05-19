package com.chuongtrinhdaotao.backend.dtos;

import com.chuongtrinhdaotao.backend.models.KhoiKienThuc;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CTKhoiKienThucDTO {
    private String ten;

    @JsonProperty("tc_bat_buoc")
    private int tcBatBuoc;

    @JsonProperty("tc_tu_chon")
    private int tcTuChon;

    @JsonProperty("id_khoi_kien_thuc")
    private Long idKhoiKienThuc;
}
