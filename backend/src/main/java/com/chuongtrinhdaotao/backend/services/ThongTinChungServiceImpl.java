package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.ThongTinChung;
import com.chuongtrinhdaotao.backend.repositories.ThongTinChungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThongTinChungServiceImpl implements ThongTinChungService {
    @Autowired
    private ThongTinChungRepository repository;

    @Override
    public List<ThongTinChung> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<ThongTinChung> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public ThongTinChung create(ThongTinChung thongTinChung) {
        return repository.save(thongTinChung);
    }

    @Override
    public ThongTinChung update(Integer id, ThongTinChung thongTinChung) {
        thongTinChung.setId(id);
        return repository.save(thongTinChung);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
