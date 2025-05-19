package com.chuongtrinhdaotao.backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class KeHoachDayHocDTO {
    @JsonProperty("ma_hoc_phan")
    private String maHocPhan;

    @JsonProperty("ma_hoc_phan_truoc")
    private String maHocPhanTruoc;

    @JsonProperty("hoc_ky")
    private int hocKy;
}
