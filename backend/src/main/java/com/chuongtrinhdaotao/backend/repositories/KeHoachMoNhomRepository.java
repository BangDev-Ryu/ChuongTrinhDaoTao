package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.KeHoachMoNhom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KeHoachMoNhomRepository extends JpaRepository<KeHoachMoNhom, Integer> {

}
