package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.PhanCongGiangDay;
import com.chuongtrinhdaotao.backend.repositories.PhanCongGiangDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhanCongGiangDayServiceImpl implements PhanCongGiangDayService{
    @Autowired
    private PhanCongGiangDayRepository repository;

    @Override
    public List<PhanCongGiangDay> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<PhanCongGiangDay> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public PhanCongGiangDay create(PhanCongGiangDay phanCongGiangDay) {
        return repository.save(phanCongGiangDay);
    }

    @Override
    public PhanCongGiangDay update(Integer id, PhanCongGiangDay phanCongGiangDay) {
        phanCongGiangDay.setId(id);
        return repository.save(phanCongGiangDay);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public List<PhanCongGiangDay> getByKeHoachMoNhomId(Integer id) {
        return repository.findByKeHoachMoNhomId(id);
    }
}
