package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.KeHoachMoNhom;
import com.chuongtrinhdaotao.backend.repositories.KeHoachMoNhomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KeHoachMoNhomServiceImpl implements KeHoachMoNhomService{
    @Autowired
    private KeHoachMoNhomRepository repository;

    @Override
    public List<KeHoachMoNhom> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<KeHoachMoNhom> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public KeHoachMoNhom create(KeHoachMoNhom keHoachMoNhom) {
        return repository.save(keHoachMoNhom);
    }

    @Override
    public KeHoachMoNhom update(Integer id, KeHoachMoNhom keHoachMoNhom) {
        keHoachMoNhom.setId(id);
        return repository.save(keHoachMoNhom);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
