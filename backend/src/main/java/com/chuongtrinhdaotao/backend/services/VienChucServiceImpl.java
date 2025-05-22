package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.VienChuc;
import com.chuongtrinhdaotao.backend.repositories.VienChucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VienChucServiceImpl implements VienChucService {
    @Autowired
    private VienChucRepository repository;

    @Override
    public List<VienChuc> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<VienChuc> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public VienChuc create(VienChuc vienChuc) {
        return repository.save(vienChuc);
    }

    @Override
    public VienChuc update(Integer id, VienChuc vienChuc) {
        vienChuc.setId(id);
        return repository.save(vienChuc);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
