package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.KeHoachMoNhom;

import java.util.List;
import java.util.Optional;

public interface KeHoachMoNhomService {
    List<KeHoachMoNhom> getAll();
    Optional<KeHoachMoNhom> getById(Integer id);
    KeHoachMoNhom create(KeHoachMoNhom keHoachMoNhom);
    KeHoachMoNhom update(Integer id, KeHoachMoNhom keHoachMoNhom);
    void delete(Integer id);
}
