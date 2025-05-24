package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.GiangVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GiangVienRepository extends JpaRepository<GiangVien, Integer>{
}
