package com.chuongtrinhdaotao.backend.dtos;

import com.chuongtrinhdaotao.backend.models.CTKhoiKienThuc;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class HocPhanDTO {
    private String ten;

    @JsonProperty("so_tin_chi")
    private int soTinChi;

    @JsonProperty("tiet_ly_thuyet")
    private int tietLyThuyet;

    @JsonProperty("tiet_thuc_hanh")
    private int tietThucHanh;

    @JsonProperty("tiet_thuc_tap")
    private int tietThucTap;

    @JsonProperty("he_so_hoc_phan")
    private float heSo;

    @JsonProperty("trang_thai")
    private boolean trangThai;

    @JsonProperty("id_ct_khoi_kien_thuc")
    private Long idCtKhoiKienThuc;

    @JsonProperty("ma_hoc_phan")
    private int maHocPhan;
}
