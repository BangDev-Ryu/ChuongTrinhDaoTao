package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.ChucDanh;
import java.util.List;
import java.util.Optional;

public interface ChucDanhService {
  List<ChucDanh> getAll();
  Optional<ChucDanh> getById(Integer id);
  ChucDanh create(ChucDanh chucDanh);
  ChucDanh update(Integer id, ChucDanh chucDanh);
  void delete(Integer id);
}
