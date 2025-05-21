package com.chuongtrinhdaotao.backend.services;

import com.chuongtrinhdaotao.backend.models.HocPhan;
import com.chuongtrinhdaotao.backend.repositories.HocPhanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HocPhanServiceImpl implements HocPhanService {
    @Autowired
    private HocPhanRepository repository;

    @Override
    public List<HocPhan> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<HocPhan> getById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public HocPhan create(HocPhan hocPhan) {
        return repository.save(hocPhan);
    }

    @Override
    public HocPhan update(Integer id, HocPhan hocPhan) {
        hocPhan.setId(id);
        return repository.save(hocPhan);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Integer sumTinChiByKhoiKienThuc(Integer idThongTinChung, String loaiHocPhan, String khoiKienThuc) {
        Integer sum = repository.sumTinChiByKhoiKienThuc(idThongTinChung, loaiHocPhan, khoiKienThuc);
        return sum != null ? sum : 0;
    }

    @Override
    public Integer sumTinChiByLoaiKhoiKienThuc(Integer idThongTinChung, String loaiHocPhan, String loaiKhoiKienThuc) {
        Integer sum = repository.sumTinChiByLoaiKhoiKienThuc(idThongTinChung, loaiHocPhan, loaiKhoiKienThuc);
        return sum != null ? sum : 0;
    }
}
