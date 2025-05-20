package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.ThongTinChung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThongTinChungRepository extends JpaRepository<ThongTinChung, Integer> {
}
