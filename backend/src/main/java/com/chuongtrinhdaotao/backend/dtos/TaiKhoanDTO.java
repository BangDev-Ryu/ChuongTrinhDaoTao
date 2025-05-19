package com.chuongtrinhdaotao.backend.dtos;

import com.chuongtrinhdaotao.backend.models.GiangVien;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class TaiKhoanDTO {
    private String username;

    private String password;

    @JsonProperty("trang_thai")
    private boolean trangThai;

    @JsonProperty("id_giang_vien")
    private Long idGiangVien;
}
