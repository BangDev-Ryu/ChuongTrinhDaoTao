package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.VienChuc;
import com.chuongtrinhdaotao.backend.services.VienChucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vienChuc")
@CrossOrigin
public class VienChucController {
    @Autowired
    private VienChucService vienChucService;

    @GetMapping
    public List<VienChuc> getAll() {
        return vienChucService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<VienChuc> getById(@PathVariable Integer id) {
        return vienChucService.getById(id);
    }

    @PostMapping
    public VienChuc create(@RequestBody VienChuc vienChuc) {
        return vienChucService.create(vienChuc);
    }

    @PutMapping("/{id}")
    public VienChuc update(@PathVariable Integer id, @RequestBody VienChuc vienChuc) {
        return vienChucService.update(id, vienChuc);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        vienChucService.delete(id);
    }
}
