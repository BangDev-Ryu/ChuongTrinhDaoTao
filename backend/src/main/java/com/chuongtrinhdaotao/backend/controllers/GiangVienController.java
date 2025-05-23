package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.GiangVien;
import com.chuongtrinhdaotao.backend.services.GiangVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/giangVien")
@CrossOrigin

public class GiangVienController {
    @Autowired
    private GiangVienService giangVienService;

    @GetMapping
    public List<GiangVien> getAll() {
        return giangVienService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<GiangVien> getById(@PathVariable Integer id) {
        return giangVienService.getById(id);
    }

    @PostMapping
    public GiangVien create(@RequestBody GiangVien giangVien) {
        return giangVienService.create(giangVien);
    }

    @PutMapping("/{id}")
    public GiangVien update(@PathVariable Integer id, @RequestBody GiangVien giangVien) {
        return giangVienService.update(id, giangVien);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        giangVienService.delete(id);
    }
}
