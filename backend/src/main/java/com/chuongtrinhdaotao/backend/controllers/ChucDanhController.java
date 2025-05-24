package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.ChucDanh;
import com.chuongtrinhdaotao.backend.services.ChucDanhService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chucDanh")
@CrossOrigin
public class ChucDanhController {

  @Autowired
  private ChucDanhService chucDanhService;

  @GetMapping
  public List<ChucDanh> getAll() {
    return chucDanhService.getAll();
  }

  @GetMapping("/{id}")
  public Optional<ChucDanh> getById(@PathVariable Integer id) {
    return chucDanhService.getById(id);
  }

  @PostMapping
  public ChucDanh create(@RequestBody ChucDanh chucDanh) {
    return chucDanhService.create(chucDanh);
  }

  @PutMapping("/{id}")
  public ChucDanh update(
    @PathVariable Integer id,
    @RequestBody ChucDanh chucDanh
  ) {
    return chucDanhService.update(id, chucDanh);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Integer id) {
    chucDanhService.delete(id);
  }
}
