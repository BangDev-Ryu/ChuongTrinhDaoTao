package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.ThongTinChung;
import com.chuongtrinhdaotao.backend.services.ThongTinChungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/thongTinChung")
@CrossOrigin
public class ThongTinChungController {
    @Autowired
    private ThongTinChungService thongTinChungService;

    @GetMapping
    public List<ThongTinChung> getAll() {
        return thongTinChungService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<ThongTinChung> getById(@PathVariable Integer id) {
        return thongTinChungService.getById(id);
    }

    @PostMapping
    public ThongTinChung create(@RequestBody ThongTinChung thongTinChung) {
        return thongTinChungService.create(thongTinChung);
    }

    @PutMapping("/{id}")
    public ThongTinChung update(@PathVariable Integer id, @RequestBody ThongTinChung thongTinChung) {
        return thongTinChungService.update(id, thongTinChung);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        thongTinChungService.delete(id);
    }
}
