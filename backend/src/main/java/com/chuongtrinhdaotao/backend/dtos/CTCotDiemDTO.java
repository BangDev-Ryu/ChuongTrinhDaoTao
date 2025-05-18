package com.chuongtrinhdaotao.backend.dtos;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CTCotDiemDTO {

    private String ten;

    @JsonProperty("trong_so")
    private Float trongSo;

    @JsonProperty("hinh_thuc")
    private String hinhThuc;

    @JsonProperty("id_de_cuong_chi_tiet")
    private Long idDeCuongChiTiet;
}
