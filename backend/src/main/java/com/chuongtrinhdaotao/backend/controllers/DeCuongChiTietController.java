package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.DeCuongChiTiet;
import com.chuongtrinhdaotao.backend.services.DeCuongChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/deCuongChiTiet")
@CrossOrigin
public class DeCuongChiTietController {
    @Autowired
    private DeCuongChiTietService deCuongChiTietService;

    @GetMapping
    public List<DeCuongChiTiet> getAll() {
        return deCuongChiTietService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<DeCuongChiTiet> getById(@PathVariable Integer id) {
        return deCuongChiTietService.getById(id);
    }

    @PostMapping
    public DeCuongChiTiet create(@RequestBody DeCuongChiTiet deCuongChiTiet) {
        return deCuongChiTietService.create(deCuongChiTiet);
    }

    @PutMapping("/{id}")
    public DeCuongChiTiet update(@PathVariable Integer id, @RequestBody DeCuongChiTiet deCuongChiTiet) {
        return deCuongChiTietService.update(id, deCuongChiTiet);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        deCuongChiTietService.delete(id);
    }
    }

