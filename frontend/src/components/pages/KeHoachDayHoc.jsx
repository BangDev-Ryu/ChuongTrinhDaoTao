import React, { useState, useEffect, useMemo } from 'react';
import { Table, Form, Pagination, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const KeHoachDayHoc = () => {
  const [data, setData] = useState([]);
  const [chuongTrinhDaoTaoList, setChuongTrinhDaoTaoList] = useState([]);
  const [chuongTrinhDaoTao, setChuongTrinhDaoTao] = useState('');
  const [hocKyLoc, setHocKyLoc] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchData();
    fetchChuongTrinhDaoTao();
  }, []);

  // Lấy danh sách học phần từ API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/hocPhan');
      setData(response.data);
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
    }
  };

  // Lấy danh sách chương trình đào tạo từ API
  const fetchChuongTrinhDaoTao = async () => {
    try {
      const response = await axios.get('http://localhost:8080/thongTinChung');
      setChuongTrinhDaoTaoList(response.data);  // Lưu danh sách chương trình đào tạo
    } catch (error) {
      console.error('Lỗi lấy danh sách chương trình đào tạo:', error);
    }
  };

  const hocKyList = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // Lọc dữ liệu học phần theo chương trình đào tạo và học kỳ
  const filteredData = data.filter(item => {
    const matchCTDT = chuongTrinhDaoTao ? item.thongTinChung.ten === chuongTrinhDaoTao : true;
    const matchHocKy = hocKyLoc ? String(item.hocKyThucHien) === hocKyLoc : true;
    return matchCTDT && matchHocKy;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Xử lý khi mở modal chi tiết
  const handleShowDetailModal = () => {
    if (!chuongTrinhDaoTao) {
      alert("Vui lòng chọn chương trình đào tạo trước!");
      return;
    }
    setShowDetailModal(true);
  };

  // Đóng modal chi tiết
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const totalTinChiDaiCuong = filteredData
    .filter(item => item.khoiKienThuc === 'Khối kiến thức giáo dục đại cương')
    .reduce((sum, item) => sum + Number(item.soTinChi), 0);

const totalTinChiChuyenNghiep = filteredData
    .filter(item => item.khoiKienThuc === 'Khối kiến thức giáo dục chuyên nghiệp')
    .reduce((sum, item) => sum + Number(item.soTinChi), 0);

const totalTinChiGDTCvaQPAN = filteredData
    .filter(item => item.loaiKhoiKienThuc === 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh')
    .reduce((sum, item) => sum + Number(item.soTinChi), 0);

const totalTinChiDaiCuongKhac = filteredData
    .filter(item => item.loaiKhoiKienThuc === 'Kiến thức giáo dục đại cương khác')
    .reduce((sum, item) => sum + Number(item.soTinChi), 0);

const totalTinChiCoSoNganh = filteredData
    .filter(item => item.loaiKhoiKienThuc === 'Kiến thức cơ sở ngành')
    .reduce((sum, item) => sum + Number(item.soTinChi), 0);

const totalTinChiKienThucNganh = filteredData
    .filter(item => item.loaiKhoiKienThuc === 'Kiến thức ngành')
    .reduce((sum, item) => sum + Number(item.soTinChi), 0);

const totalTinChiKhoaLuanTotNghiep = filteredData
    .filter(item => item.loaiKhoiKienThuc === 'Khóa luận tốt nghiệp')
    .reduce((sum, item) => sum + Number(item.soTinChi), 0);

const totalTinChiKhoaLuanTotNghiepThayThe = filteredData
    .filter(item => item.loaiKhoiKienThuc === 'Khóa luận tốt nghiệp thay thế')
    .reduce((sum, item) => sum + Number(item.soTinChi), 0);

const loaiKhoiKienThucList = useMemo(() => {
  const uniqueTypes = new Set();
  filteredData.forEach(item => {
    if (item.loaiKhoiKienThuc?.startsWith("Kiến thức chuyên ngành")) {
      uniqueTypes.add(item.loaiKhoiKienThuc);
    }
  });
  return Array.from(uniqueTypes);
}, [filteredData]);


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="flex-grow-1 m-0">Kế hoạch dạy học</h2>
      </div>

      <div className="d-flex gap-3 mb-3">
        {/* Dropdown chọn chương trình đào tạo */}
        <Form.Select
          value={chuongTrinhDaoTao}
          onChange={(e) => setChuongTrinhDaoTao(e.target.value)}
          style={{ width: '250px' }}
        >
          <option value="">Chương trình đào tạo</option>
          {chuongTrinhDaoTaoList.map((ctdt) => (
            <option key={ctdt.id} value={ctdt.ten}>
              {ctdt.ten}
            </option>
          ))}
        </Form.Select>

        {/* Dropdown chọn học kỳ */}
        <Form.Select
          value={hocKyLoc}
          onChange={(e) => setHocKyLoc(e.target.value)}
          style={{ width: '150px' }}
        >
          <option value="">Học kỳ</option>
          {hocKyList.map((hk, idx) => (
            <option key={idx} value={hk}>
              {hk}
            </option>
          ))}
        </Form.Select>

        {/* Nút Xem chi tiết */}
        <Button variant="info" onClick={handleShowDetailModal} disabled={!chuongTrinhDaoTao}>
          Xem chi tiết
        </Button>
      </div>

      {/* Bảng hiển thị học phần */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: '200px' }}>Mã học phần</th>
            <th>Học phần</th>
            <th>Số tín chỉ</th>
            <th>Học kỳ</th>
            <th style={{ width: '200px' }}>Mã học phần trước</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.maHocPhan}</td>
              <td>{item.ten}</td>
              <td>{item.soTinChi}</td>
              <td>{item.hocKyThucHien}</td>
              <td>{item.maHocPhanTruoc}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>{paginationItems}</Pagination>

      {/* Modal chi tiết học phần */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Kế hoạch dậy học - {chuongTrinhDaoTao}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Thay đổi nội dung trong modal dựa trên chương trình đào tạo */}
          <Table bordered responsive>
            <thead>
              <tr>
                <th rowSpan="2" className="text-center align-middle">TT</th>
                <th style={{ width: '150px' }} rowSpan="2" className="text-center align-middle">Mã HP</th>
                <th rowSpan="2" className="text-center align-middle">Tên Học phần</th>
                <th rowSpan="2" className="text-center align-middle">Số tín chỉ</th>
                <th colSpan="12" className="text-center">Học kỳ thực hiện</th>
                <th style={{ width: '150px' }} rowSpan="2" className="text-center align-middle">Mã học phần trước</th>
              </tr>
              <tr>
                <th className="text-center"> <i>1</i> </th>
                <th className="text-center"> <i>2</i> </th>
                <th className="text-center"> <i>3</i> </th>
                <th className="text-center"> <i>4</i> </th>
                <th className="text-center"> <i>5</i> </th>
                <th className="text-center"> <i>6</i> </th>
                <th className="text-center"> <i>7</i> </th>
                <th className="text-center"> <i>8</i> </th>
                <th className="text-center"> <i>9</i> </th>
                <th className="text-center"> <i>10</i> </th>
                <th className="text-center"> <i>11</i> </th>
                <th className="text-center"> <i>12</i> </th>
              </tr>
              <tr>
                <th colSpan="3"  className=""> I. Khối kiến thức giáo dục đại cương không tính GDTC và GDQPAN </th>
                <th className="text-center align-middle">{totalTinChiDaiCuong-totalTinChiGDTCvaQPAN}/{totalTinChiDaiCuong-totalTinChiGDTCvaQPAN}</th>
                <th colSpan="13" className="text-center"></th>
              </tr>
              <tr>
                <th colSpan="3"  className="">Các học phần bắt buộc</th>
                <th className="text-center align-middle">{totalTinChiDaiCuong}/{totalTinChiDaiCuong}</th>
                <th colSpan="13" className="text-center"></th>
               </tr>
            </thead>
            <tbody>
              {filteredData
                .filter(item => item.khoiKienThuc === 'Khối kiến thức giáo dục đại cương' && item.loaiHocPhan === 'Bắt buộc')
                .map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.maHocPhan}</td>
                      <td>{item.ten}</td>
                      <td className="text-center">{item.soTinChi}</td>
                      {Array.from({ length: 12 }, (_, i) => (
                        <td key={i} className="text-center">
                          {Number(item.hocKyThucHien) === i + 1 ? 'X' : ''}
                        </td>
                      ))}
                      <td className="text-center">{item.maHocPhanTruoc}</td>
                    </tr>
                  );
                })}
            <tr>
                <th colSpan="3" className="">Các học phần tự chọn</th>
                <th className="text-center align-middle">2/{totalTinChiDaiCuongKhac}</th>
                <th colSpan="13" className="text-center"></th>
             </tr>
             {filteredData
               .filter(item => item.khoiKienThuc === 'Khối kiến thức giáo dục đại cương' && item.loaiHocPhan === 'Tự chọn')
               .map((item, index) => {
               return (
                 <tr key={item.id}>
                   <td>{index + 1}</td>
                   <td>{item.maHocPhan}</td>
                   <td>{item.ten}</td>
                   <td className="text-center">{item.soTinChi}</td>
                   {Array.from({ length: 12 }, (_, i) => (
                       <td key={i} className="text-center">
                         {Number(item.hocKyThucHien) === i + 1 ? 'X' : ''}
                       </td>
                     ))}
                   <td className="text-center">{item.maHocPhanTruoc}</td>
                 </tr>
               );
             })}
             <tr>
                 <th colSpan="3" className="">II. Khối kiến thức chuyên nghiệp</th>
                   <th className="text-center align-middle">{totalTinChiChuyenNghiep}/{totalTinChiChuyenNghiep}</th>
                   <th colSpan="13" className="text-center"></th>
              </tr>
              <tr>
                   <th colSpan="3" className="">Kiến thức cơ sở ngành</th>
                   <th className="text-center align-middle">{totalTinChiCoSoNganh}/{totalTinChiCoSoNganh}</th>
                   <th colSpan="13" className="text-center"></th>
              </tr>
              <tr>
                   <th colSpan="3" className="">Các học phần bắt buộc</th>
                   <th className="text-center align-middle">{totalTinChiCoSoNganh}/{totalTinChiCoSoNganh}</th>
                   <th colSpan="13" className="text-center"></th>
              </tr>
              {filteredData
                 .filter(item => item.loaiKhoiKienThuc === 'Kiến thức cơ sở ngành')
                 .map((item, index) => {
                 return (
                   <tr key={item.id}>
                     <td>{index + 1}</td>
                     <td>{item.maHocPhan}</td>
                     <td>{item.ten}</td>
                     <td className="text-center">{item.soTinChi}</td>
                     {Array.from({ length: 12 }, (_, i) => (
                         <td key={i} className="text-center">
                           {Number(item.hocKyThucHien) === i + 1 ? 'X' : ''}
                         </td>
                       ))}
                     <td className="text-center">{item.maHocPhanTruoc}</td>
                   </tr>
                 );
               })}
            <tr>
              <th colSpan="3" className="">Các học phần tự chọn</th>
              <th className="text-center align-middle">0/0</th>
              <th colSpan="13" className="text-center"></th>
            </tr>
            <tr>
               <th colSpan="3" className="">Kiến thức ngành</th>
               <th className="text-center align-middle">{totalTinChiKienThucNganh}/{totalTinChiKienThucNganh}</th>
               <th colSpan="13" className="text-center"></th>
            </tr>
            <tr>
              <th colSpan="3" className="">Các học phần bắt buộc</th>
              <th className="text-center align-middle">2/{totalTinChiDaiCuongKhac}</th>
              <th colSpan="13" className="text-center"></th>
            </tr>
            {filteredData
               .filter(item => item.loaiKhoiKienThuc === 'Kiến thức ngành' && item.loaiHocPhan === 'Bắt buộc')
               .map((item, index) => {
               return (
                 <tr key={item.id}>
                   <td>{index + 1}</td>
                   <td>{item.maHocPhan}</td>
                   <td>{item.ten}</td>
                   <td className="text-center">{item.soTinChi}</td>
                   {Array.from({ length: 12 }, (_, i) => (
                       <td key={i} className="text-center">
                         {Number(item.hocKyThucHien) === i + 1 ? 'X' : ''}
                       </td>
                     ))}
                   <td className="text-center">{item.maHocPhanTruoc}</td>
                 </tr>
               );
             })}
             <tr>
               <th colSpan="17" className="">Khóa luận tốt nghiệp hoặc các học phần thây thế (hoặc học 3 học phần thây thế khóa luận)</th>
             </tr>
             <tr>
                <th colSpan="3" className="">Khóa luận tốt nghiệp</th>
               <th className="text-center align-middle">{totalTinChiKhoaLuanTotNghiep}/{totalTinChiKhoaLuanTotNghiep}</th>
               <th colSpan="13" className="text-center"></th>
             </tr>
             {filteredData
                 .filter(item => item.loaiKhoiKienThuc === 'Khóa luận tốt nghiệp' )
                 .map((item, index) => {
                 return (
                   <tr key={item.id}>
                     <td>{index + 1}</td>
                     <td>{item.maHocPhan}</td>
                     <td>{item.ten}</td>
                     <td className="text-center">{item.soTinChi}</td>
                     {Array.from({ length: 12 }, (_, i) => (
                         <td key={i} className="text-center">
                           {Number(item.hocKyThucHien) === i + 1 ? 'X' : ''}
                         </td>
                       ))}
                     <td className="text-center">{item.maHocPhanTruoc}</td>
                   </tr>
                 );
               })}
             <tr>
                 <th colSpan="3" className="">Các học phần thây thế khóa luận</th>
               <th className="text-center align-middle">{totalTinChiKhoaLuanTotNghiepThayThe}/{totalTinChiKhoaLuanTotNghiepThayThe}</th>
               <th colSpan="13" className="text-center"></th>
             </tr>
             {filteredData
                  .filter(item => item.loaiKhoiKienThuc === 'Khóa luận tốt nghiệp thay thế' )
                  .map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.maHocPhan}</td>
                      <td>{item.ten}</td>
                      <td className="text-center">{item.soTinChi}</td>
                      {Array.from({ length: 12 }, (_, i) => (
                          <td key={i} className="text-center">
                            {Number(item.hocKyThucHien) === i + 1 ? 'X' : ''}
                          </td>
                        ))}
                      <td className="text-center">{item.maHocPhanTruoc}</td>
                    </tr>
                  );
                })}
             <tr>
               <th colSpan="3" className="">Các học phần tự chọn</th>
               <th className="text-center align-middle">2/{totalTinChiDaiCuongKhac}</th>
               <th colSpan="13" className="text-center"></th>
             </tr>
             {filteredData
                .filter(item => item.loaiKhoiKienThuc === 'Kiến thức ngành' && item.loaiHocPhan === 'Tự chọn')
                .map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.maHocPhan}</td>
                    <td>{item.ten}</td>
                    <td className="text-center">{item.soTinChi}</td>
                    {Array.from({ length: 12 }, (_, i) => (
                        <td key={i} className="text-center">
                          {Number(item.hocKyThucHien) === i + 1 ? 'X' : ''}
                        </td>
                      ))}
                    <td className="text-center">{item.maHocPhanTruoc}</td>
                  </tr>
                );
              })}
              <tr>
                 <th colSpan="3" className="">Kiến thức chuyên ngành</th>
                 <th className="text-center align-middle">{totalTinChiCoSoNganh}/{totalTinChiCoSoNganh}</th>
                 <th colSpan="13" className="text-center"></th>
              </tr>
              {loaiKhoiKienThucList.map((loai, idx) => {
                const items = filteredData.filter(item => item.loaiKhoiKienThuc === loai);
                const batBuoc = items.filter(i => i.loaiHocPhan === 'Bắt buộc');
                const tuChon = items.filter(i => i.loaiHocPhan === 'Tự chọn');
                const tongTinChi = items.reduce((sum, i) => sum + Number(i.soTinChi), 0);
                const tongBatBuoc = batBuoc.reduce((sum, i) => sum + Number(i.soTinChi), 0);
                const tongTuChon = tuChon.reduce((sum, i) => sum + Number(i.soTinChi), 0);

                return (
                  <React.Fragment key={idx}>
                    <tr>
                      <th colSpan="3" className="">{loai}</th>
                      <th className="text-center align-middle">{tongTinChi}/{tongTinChi}</th>
                      <th colSpan="13" className="text-center"></th>
                    </tr>

                    <tr>
                      <th colSpan="3" className="">Các học phần bắt buộc</th>
                      <th className="text-center align-middle">{tongBatBuoc}/{tongBatBuoc}</th>
                      <th colSpan="13" className="text-center"></th>
                    </tr>
                    {batBuoc.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.maHocPhan}</td>
                        <td>{item.ten}</td>
                        <td className="text-center">{item.soTinChi}</td>
                        {Array.from({ length: 12 }, (_, i) => (
                          <td key={i} className="text-center">
                            {Number(item.hocKyThucHien) === i + 1 ? 'X' : ''}
                          </td>
                        ))}
                        <td className="text-center">{item.maHocPhanTruoc}</td>
                      </tr>
                    ))}

                    <tr>
                      <th colSpan="3" className="">Các học phần tự chọn</th>
                      <th className="text-center align-middle">{tongTuChon}/{tongTuChon}</th>
                      <th colSpan="13" className="text-center"></th>
                    </tr>
                    {tuChon.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.maHocPhan}</td>
                        <td>{item.ten}</td>
                        <td className="text-center">{item.soTinChi}</td>
                        {Array.from({ length: 12 }, (_, i) => (
                          <td key={i} className="text-center">
                            {Number(item.hocKyThucHien) === i + 1 ? 'X' : ''}
                          </td>
                        ))}
                        <td className="text-center">{item.maHocPhanTruoc}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}

          </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default KeHoachDayHoc