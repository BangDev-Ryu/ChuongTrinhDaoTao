package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.ThongTinChung;

import java.util.List;
import java.util.Optional;

public interface ThongTinChungService {
    List<ThongTinChung> getAll();
    Optional<ThongTinChung> getById(Integer id);
    ThongTinChung create(ThongTinChung thongTinChung);
    ThongTinChung update(Integer id, ThongTinChung thongTinChung);
    void delete(Integer id);
}
