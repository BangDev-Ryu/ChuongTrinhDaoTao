package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.GiangVien;

import java.util.List;
import java.util.Optional;

public interface GiangVienService {
    List<GiangVien> getAll();
    Optional<GiangVien> getById(Integer id);
    GiangVien create(GiangVien giangVien);
    GiangVien update(Integer id, GiangVien giangVien);
    void delete(Integer id);
}
