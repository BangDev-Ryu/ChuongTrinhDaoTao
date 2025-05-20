package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.HocPhan;

import java.util.List;
import java.util.Optional;

public interface HocPhanService {
    List<HocPhan> getAll();
    Optional<HocPhan> getById(Integer id);
    HocPhan create(HocPhan hocPhan);
    HocPhan update(Integer id, HocPhan hocPhan);
    void delete(Integer id);
}
