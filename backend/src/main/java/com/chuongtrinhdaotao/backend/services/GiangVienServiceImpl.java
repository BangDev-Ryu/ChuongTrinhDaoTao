package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.GiangVien;
import com.chuongtrinhdaotao.backend.repositories.GiangVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GiangVienServiceImpl implements GiangVienService{
    @Autowired
    private GiangVienRepository repository;

    @Override
    public List<GiangVien> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<GiangVien> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public GiangVien create(GiangVien giangVien) {
        return repository.save(giangVien);
    }

    @Override
    public GiangVien update(Integer id, GiangVien giangVien) {
        giangVien.setId(id);
        return repository.save(giangVien);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
