package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.GiangVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface GiangVienRepository
  extends JpaRepository<GiangVien, Integer>, JpaSpecificationExecutor<GiangVien> {}
