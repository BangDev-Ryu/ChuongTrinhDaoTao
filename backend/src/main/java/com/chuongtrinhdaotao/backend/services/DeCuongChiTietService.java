package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.DeCuongChiTiet;

import java.util.List;
import java.util.Optional;

public interface DeCuongChiTietService {
    List<DeCuongChiTiet> getAll();
    Optional<DeCuongChiTiet> getById(Integer id);
    DeCuongChiTiet create(DeCuongChiTiet deCuongChiTiet);
    DeCuongChiTiet update(Integer id, DeCuongChiTiet deCuongChiTiet);
    void delete(Integer id);
}
