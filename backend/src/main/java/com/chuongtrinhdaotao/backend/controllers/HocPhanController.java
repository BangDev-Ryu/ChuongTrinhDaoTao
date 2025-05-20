package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.HocPhan;
import com.chuongtrinhdaotao.backend.services.HocPhanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hocPhan")
@CrossOrigin
public class HocPhanController {
    @Autowired
    private HocPhanService hocPhanService;

    @GetMapping
    public List<HocPhan> getAll() {
        return hocPhanService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<HocPhan> getById(@PathVariable Integer id) {
        return hocPhanService.getById(id);
    }

    @PostMapping
    public HocPhan create(@RequestBody HocPhan hocPhan) {
        return hocPhanService.create(hocPhan);
    }

    @PutMapping("/{id}")
    public HocPhan update(@PathVariable Integer id, @RequestBody HocPhan hocPhan) {
        return hocPhanService.update(id, hocPhan);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        hocPhanService.delete(id);
    }
}
