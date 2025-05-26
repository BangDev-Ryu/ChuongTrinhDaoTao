package com.chuongtrinhdaotao.backend.repositories;

import com.chuongtrinhdaotao.backend.models.HocPhan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HocPhanRepository extends JpaRepository<HocPhan, Integer> {
    @Query("SELECT SUM(hp.soTinChi) " +
            "FROM HocPhan hp " +
            "WHERE hp.thongTinChung.id = :idThongTinChung AND hp.loaiHocPhan LIKE :loaiHocPhan% AND hp.khoiKienThuc LIKE :khoiKienThuc%")
    Integer sumTinChiByKhoiKienThuc(@Param("idThongTinChung") Integer idThongTinChung,
                                    @Param("loaiHocPhan") String loaiHocPhan,
                                    @Param("khoiKienThuc") String khoiKienThuc);

    @Query("SELECT SUM(hp.soTinChi) " +
            "FROM HocPhan hp " +
            "WHERE hp.thongTinChung.id = :idThongTinChung AND hp.loaiHocPhan LIKE :loaiHocPhan% AND hp.loaiKhoiKienThuc LIKE :loaiKhoiKienThuc%")
    Integer sumTinChiByLoaiKhoiKienThuc(@Param("idThongTinChung") Integer idThongTinChung,
                                    @Param("loaiHocPhan") String loaiHocPhan,
                                    @Param("loaiKhoiKienThuc") String loaiKhoiKienThuc);
}
