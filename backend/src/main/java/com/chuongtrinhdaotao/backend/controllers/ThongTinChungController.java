package com.chuongtrinhdaotao.backend.controllers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("api/thongtinchung")
public class ThongTinChungController {

    @PostMapping("")
    public ResponseEntity<?> createThongTinChung(){
        return ResponseEntity.ok("Thêm thông tin chung mới thành công !");
    }

    @GetMapping("")
    public ResponseEntity<?> getAllThongTinChung(
            @RequestParam("page") int page,
            @RequestParam("limit") int limit
    ){
        return ResponseEntity.ok("get all thong tin chung, page = " + page + ", limit = " + limit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateThongTinChung(@PathVariable Long id){
        return ResponseEntity.ok("Cập nhật thông tin chung " + id + " thành công !");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteThongTinChung(@PathVariable Long id){
        return ResponseEntity.ok("Xóa thông tin chung " + id + " thành công !");
    }
}
