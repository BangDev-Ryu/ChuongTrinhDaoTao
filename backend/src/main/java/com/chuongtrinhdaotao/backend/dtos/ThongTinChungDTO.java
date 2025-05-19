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
public class ThongTinChungDTO {
    @JsonProperty("ten_goi")
    private String tenGoi;

    private String bac;

    @JsonProperty("loai_bang")
    private String loaiBang;

    @JsonProperty("loai_hinh")
    private String loaiHinh;

    @JsonProperty("thoi_gian")
    private Float thoiGian;

    @JsonProperty("tc_toi_thieu")
    private int tcToiThieu;

    private String khoa;

    @JsonProperty("ngon_ngu")
    private String ngonNgu;

    private String website;

    @JsonProperty("ban_hanh")
    private String banHanh;

    @JsonProperty("trang_thai")
    private boolean trangThai;
}
