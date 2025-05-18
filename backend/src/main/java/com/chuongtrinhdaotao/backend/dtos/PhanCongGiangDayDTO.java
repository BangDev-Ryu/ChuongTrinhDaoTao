package com.chuongtrinhdaotao.backend.dtos;

import com.chuongtrinhdaotao.backend.models.GiangVien;
import com.chuongtrinhdaotao.backend.models.KeHoachMoNhom;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class PhanCongGiangDayDTO {
    @JsonProperty("so_tiet_thuc_hien")
    private int soTietThucHien;

    @JsonProperty("so_tiet_thuc_te")
    private int soTietThucTe;

    private int nhom;

    @JsonProperty("id_giang_vien")
    private Long idGiangVien;

    @JsonProperty("id_ke_hoach_mo_nhom")
    private Long idKeHoachMoNhom;
}
