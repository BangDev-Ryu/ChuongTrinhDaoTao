package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.KeHoachMoNhom;
import com.chuongtrinhdaotao.backend.services.KeHoachMoNhomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/keHoachMoNhom")
@CrossOrigin

public class KeHoachMoNhomController {
    @Autowired
    private KeHoachMoNhomService keHoachMoNhomService;

    @GetMapping
    public List<KeHoachMoNhom> getAll() {
        return keHoachMoNhomService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<KeHoachMoNhom> getById(@PathVariable Integer id) {
        return keHoachMoNhomService.getById(id);
    }

    @PostMapping
    public KeHoachMoNhom create(@RequestBody KeHoachMoNhom keHoachMoNhom) {
        return keHoachMoNhomService.create(keHoachMoNhom);
    }

    @PutMapping("/{id}")
    public KeHoachMoNhom update(@PathVariable Integer id, @RequestBody KeHoachMoNhom keHoachMoNhom) {
        return keHoachMoNhomService.update(id, keHoachMoNhom);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        keHoachMoNhomService.delete(id);
    }
}
