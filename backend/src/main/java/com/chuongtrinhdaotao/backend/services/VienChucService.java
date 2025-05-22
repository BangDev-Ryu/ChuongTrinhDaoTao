package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.VienChuc;

import java.util.List;
import java.util.Optional;

public interface VienChucService {
    List<VienChuc> getAll();
    Optional<VienChuc> getById(Integer id);
    VienChuc create(VienChuc vienChuc);
    VienChuc update(Integer id, VienChuc vienChuc);
    void delete(Integer id);
}
