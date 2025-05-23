package com.chuongtrinhdaotao.backend.controllers;

import com.chuongtrinhdaotao.backend.models.GiangVien;
import com.chuongtrinhdaotao.backend.models.User;
import com.chuongtrinhdaotao.backend.services.GiangVienService;
import jakarta.persistence.criteria.Subquery;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/giangVien")
@CrossOrigin
public class GiangVienController {

  @Autowired
  private GiangVienService giangVienService;

  @GetMapping
  public List<GiangVien> getAll(
    @RequestParam(value = "userLinked", required = false) Boolean userLinked
  ) {
    if (userLinked == null) {
      return giangVienService.getAll();
    }
    Specification<GiangVien> spec = (root, query, cb) -> {
      @SuppressWarnings("null")
      Subquery<Long> subquery = query.subquery(Long.class);
      var userRoot = subquery.from(User.class);
      subquery
        .select(cb.literal(1L))
        .where(cb.equal(userRoot.get("giangVien").get("id"), root.get("id")));
      if (userLinked) {
        // Exists a User with this giangVien
        return cb.exists(subquery);
      } else {
        // Not exists a User with this giangVien
        return cb.not(cb.exists(subquery));
      }
    };
    return giangVienService.findAll(spec);
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
  public GiangVien update(
    @PathVariable Integer id,
    @RequestBody GiangVien giangVien
  ) {
    return giangVienService.update(id, giangVien);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Integer id) {
    giangVienService.delete(id);
  }
}
