package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.KhoiKienThuc;
import com.chuongtrinhdaotao.backend.repositories.KhoiKienThucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KhoiKienThucServiceImpl implements KhoiKienThucService {
    @Autowired
    private KhoiKienThucRepository repository;


    @Override
    public List<KhoiKienThuc> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<KhoiKienThuc> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public KhoiKienThuc create(KhoiKienThuc khoiKienThuc) {
        return repository.save(khoiKienThuc);
    }

    @Override
    public KhoiKienThuc update(Integer id, KhoiKienThuc khoiKienThuc) {
        return repository.save(id, khoiKienThuc);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
