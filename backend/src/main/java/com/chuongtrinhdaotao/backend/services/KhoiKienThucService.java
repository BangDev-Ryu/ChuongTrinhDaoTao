package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.KhoiKienThuc;

import java.util.List;
import java.util.Optional;

public interface KhoiKienThucService {
    List<KhoiKienThuc> getAll();
    Optional<KhoiKienThuc> getById(Integer id);
    KhoiKienThuc create(KhoiKienThuc khoi);
    KhoiKienThuc update(Integer id, KhoiKienThuc khoiKienThuc);
    void delete(Integer id);
}
