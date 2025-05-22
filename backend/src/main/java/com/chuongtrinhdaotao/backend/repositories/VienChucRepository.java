package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.VienChuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VienChucRepository extends JpaRepository<VienChuc, Integer> {
}
