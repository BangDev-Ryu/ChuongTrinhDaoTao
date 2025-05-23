package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.PhanCongGiangDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhanCongGiangDayRepository extends JpaRepository<PhanCongGiangDay, Integer> {
    List<PhanCongGiangDay> findByKeHoachMoNhomId(Integer id);
}
