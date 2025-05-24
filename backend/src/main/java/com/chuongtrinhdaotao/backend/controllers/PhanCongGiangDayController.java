package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.PhanCongGiangDay;
import com.chuongtrinhdaotao.backend.services.PhanCongGiangDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/phanCongGiangDay")
@CrossOrigin

public class PhanCongGiangDayController {
    @Autowired
    private PhanCongGiangDayService phanCongGiangDayService;

    @GetMapping
    public List<PhanCongGiangDay> getAll() {
        return phanCongGiangDayService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<PhanCongGiangDay> getById(@PathVariable Integer id) {
        return phanCongGiangDayService.getById(id);
    }

    @PostMapping
    public PhanCongGiangDay create(@RequestBody PhanCongGiangDay phanCongGiangDay) {
        return phanCongGiangDayService.create(phanCongGiangDay);
    }

    @PutMapping("/{id}")
    public PhanCongGiangDay update(@PathVariable Integer id, @RequestBody PhanCongGiangDay phanCongGiangDay) {
        return phanCongGiangDayService.update(id, phanCongGiangDay);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        phanCongGiangDayService.delete(id);
    }

    @GetMapping(params = "id_ke_hoach_mo_nhom")
    public List<PhanCongGiangDay> getByKeHoachMoNhomId(@RequestParam("id_ke_hoach_mo_nhom") Integer idKeHoachMoNhom) {
        return phanCongGiangDayService.getByKeHoachMoNhomId(idKeHoachMoNhom);
    }
}
