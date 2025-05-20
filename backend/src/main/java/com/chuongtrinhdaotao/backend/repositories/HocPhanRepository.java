package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.HocPhan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HocPhanRepository extends JpaRepository<HocPhan, Integer> {
}
