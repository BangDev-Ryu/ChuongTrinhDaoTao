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
public class GiangVienDTO {
    @JsonProperty("ho_ten")
    private String hoTen;

    @JsonProperty("nam_sinh")
    private int namSinh;

    private String khoa;

    @JsonProperty("chuc_danh")
    private String chucDanh;

    @JsonProperty("trinh_do")
    private String trinhDo;

    @JsonProperty("trang_hai")
    private boolean trangThai;

    @JsonProperty("ma_giang_vien")
    private String maGiangVien;
}
