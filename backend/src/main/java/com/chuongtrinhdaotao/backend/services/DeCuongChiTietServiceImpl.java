package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.DeCuongChiTiet;
import com.chuongtrinhdaotao.backend.repositories.DeCuongChiTietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeCuongChiTietServiceImpl implements DeCuongChiTietService {
    @Autowired
    private DeCuongChiTietRepository repository;

    @Override
    public List<DeCuongChiTiet> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<DeCuongChiTiet> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public DeCuongChiTiet create(DeCuongChiTiet deCuongChiTiet) {
        return repository.save(deCuongChiTiet);
    }

    @Override
    public DeCuongChiTiet update(Integer id, DeCuongChiTiet deCuongChiTiet) {
        deCuongChiTiet.setId(id);
        return repository.save(deCuongChiTiet);
    }
    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
