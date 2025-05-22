package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.ChucDanh;
import com.chuongtrinhdaotao.backend.repositories.ChucDanhRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChucDanhServiceImpl implements ChucDanhService {

  @Autowired
  private ChucDanhRepository repository;

  @Override
  public List<ChucDanh> getAll() {
    return repository.findAll();
  }

  @Override
  public Optional<ChucDanh> getById(Integer id) {
    return repository.findById(id);
  }

  @Override
  public ChucDanh create(ChucDanh chucDanh) {
    return repository.save(chucDanh);
  }

  @Override
  public ChucDanh update(Integer id, ChucDanh chucDanh) {
    chucDanh.setId(id);
    return repository.save(chucDanh);
  }

  @Override
  public void delete(Integer id) {
    repository.deleteById(id);
  }
}
