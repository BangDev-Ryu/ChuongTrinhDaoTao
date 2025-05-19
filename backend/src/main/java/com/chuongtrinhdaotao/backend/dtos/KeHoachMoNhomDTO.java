package com.chuongtrinhdaotao.backend.dtos;

import com.chuongtrinhdaotao.backend.models.KeHoachDayHoc;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class KeHoachMoNhomDTO {
    private String khoa;

    @JsonProperty("so_luong_nhom")
    private int soLuongNhom;

    @JsonProperty("sl_sv_moi_nhom")
    private int slSvMoiNhom;

    @JsonProperty("id_ke_hoach_day_hoc")
    private Long idKeHoachDayhoc;
}
