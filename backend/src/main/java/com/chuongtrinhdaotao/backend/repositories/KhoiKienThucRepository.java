package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.KhoiKienThuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KhoiKienThucRepository extends JpaRepository<KhoiKienThuc, Integer> {
}
