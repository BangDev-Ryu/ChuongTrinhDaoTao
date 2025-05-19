package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.KhoiKienThuc;
import com.chuongtrinhdaotao.backend.services.KhoiKienThucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/khoiKienThuc")
@CrossOrigin
public class KhoiKienThucController {
    @Autowired
    KhoiKienThucService khoiKienThucService;

    @GetMapping
    public List<KhoiKienThuc> getAll() {
        return khoiKienThucService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<KhoiKienThuc> getById(@PathVariable Integer id) {
        return khoiKienThucService.getById(id);
    }

    @PostMapping
    public KhoiKienThuc create(@RequestBody KhoiKienThuc khoi) {
        return khoiKienThucService.create(khoi);
    }

    @PutMapping("/{id}")
    public KhoiKienThuc update(@PathVariable Integer id, @RequestBody KhoiKienThuc khoi) {
        return khoiKienThucService.update(id, khoi);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        khoiKienThucService.delete(id);
    }

}
