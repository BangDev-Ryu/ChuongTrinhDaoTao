package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.PhanCongGiangDay;

import java.util.List;
import java.util.Optional;

public interface PhanCongGiangDayService {
    List<PhanCongGiangDay> getAll();
    Optional<PhanCongGiangDay> getById(Integer id);
    PhanCongGiangDay create(PhanCongGiangDay phanCongGiangDay);
    PhanCongGiangDay update(Integer id, PhanCongGiangDay phanCongGiangDay);
    void delete(Integer id);
    List<PhanCongGiangDay> getByKeHoachMoNhomId(Integer id);
}
