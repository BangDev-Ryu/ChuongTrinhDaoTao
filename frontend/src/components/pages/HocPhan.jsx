import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Button, Form, Modal, Pagination, Table } from 'react-bootstrap';

const HocPhan = () => {
  const [data, setData] = useState([])
  const [showActionModal, setShowActionModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDetailDeCuongModal, setShowDetailDeCuongModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("");
  const [danhSachThongTinChung, setDanhSachThongTinChung] = useState([])
  const [danhSachDeCuongChiTiet, setDanhSachDeCuongChiTiet] = useState([])
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [formData, setFormData] = useState({
    id_thong_tin_chung: '',
    heSo: '',
    hocKyThucHien: '',
    khoiKienThuc: '',
    loaiHocPhan: '',
    loaiKhoiKienThuc: '',
    maHocPhan: '',
    maHocPhanTruoc: '',
    soLyThuyet: '',
    soThucHanh: '',
    soThucTap: '',
    soTinChi: '',
    ten: '',
  })
  
  const khoiKienThucOptions = {
  "Khối kiến thức giáo dục đại cương": [
    "Kiến thức Lý luận chính trị",
    "Kiến thức Ngoại ngữ",
    "Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh",
    "Kiến thức giáo dục đại cương khác"
  ],
  "Khối kiến thức giáo dục chuyên nghiệp": [
    "Kiến thức ngành",
    "Kiến thức cơ sở của ngành",
    "Kiến thức chuyên ngành"
  ]
};

const loaiHocPhanOptions = ["Bắt buộc", "Tự chọn"];


  useEffect(() => {
    fetchData()
    fetchDanhSachThongTinChung();
    fetchDanhSachDeCuongChiTiet();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/hocPhan`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchDanhSachThongTinChung = async () => {
  try {
    const response = await axios.get(`${API_BASE}/thongTinChung`)
    setDanhSachThongTinChung(response.data)
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thông tin chung:', error)
  }
}

const fetchDanhSachDeCuongChiTiet = async () => {
  try {
    const response = await axios.get(`${API_BASE}/deCuongChiTiet`)
    setDanhSachDeCuongChiTiet(response.data)
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đề cương chi tiết:', error)
  }
}


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      id_thong_tin_chung: formData.id_thong_tin_chung,
      heSo: formData.heSo,
      hocKyThucHien: formData.hocKyThucHien,
      khoiKienThuc: formData.khoiKienThuc,
      loaiHocPhan: formData.loaiHocPhan,
      loaiKhoiKienThuc: formData.loaiKhoiKienThuc,
      maHocPhan: formData.maHocPhan,
      maHocPhanTruoc: formData.maHocPhanTruoc,
      soLyThuyet: formData.soLyThuyet,
      soThucHanh: formData.soThucHanh,
      soThucTap: formData.soThucTap,
      soTinChi: formData.soTinChi,
      ten: formData.ten,
    };

    if (currentItem) {
      await axios.put(`http://192.168.1.18:8080/hocPhan/${currentItem.id}`, payload);
    } else {
      await axios.post(`${API_BASE}/hocPhan`, payload);
    }

    fetchData();
    handleCloseModal();
  } catch (error) {
    console.error('Error:', error.response?.data);
    alert('Có lỗi xảy ra: ' + (error.response?.data?.message || error.message));
  }
};


  const handleDelete = async (id) => {
    if (window.confirm('Xác nhận xóa?')) {
      try {
        await axios.delete(`http://192.168.1.18:8080/hocPhan/${id}`)
        fetchData()
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  const handleCloseModal = () => {
    setShowActionModal(false)
    setCurrentItem(null)
    setFormData({
      id_thong_tin_chung: '',
      heSo: '',
      hocKyThucHien: '',
      khoiKienThuc: '',
      loaiHocPhan: '',
      loaiKhoiKienThuc: '',
      maHocPhan: '',
      maHocPhanTruoc: '',
      soLyThuyet: '',
      soThucHanh: '',
      soThucTap: '',
      soTinChi: '',
      ten: '',
    })
  }

  const handleShowActionModal = (item = null) => {
  if (item) {
    setCurrentItem(item);
    setFormData({
      id_thong_tin_chung: item.id_thong_tin_chung || '',
      heSo: item.heSo || '',
      hocKyThucHien: item.hocKyThucHien || '',
      khoiKienThuc: item.khoiKienThuc || '',
      loaiHocPhan: item.loaiHocPhan || '',
      loaiKhoiKienThuc: item.loaiKhoiKienThuc || '',
      maHocPhan: item.maHocPhan || '',
      maHocPhanTruoc: item.maHocPhanTruoc || '',
      soLyThuyet: item.soLyThuyet || '',
      soThucHanh: item.soThucHanh || '',
      soThucTap: item.soThucTap || '',
      soTinChi: item.soTinChi || '',
      ten: item.ten || '',
    });
  } else {
    setCurrentItem(null);
    setFormData({
      id_thong_tin_chung: '',
      heSo: '',
      hocKyThucHien: '',
      khoiKienThuc: '',
      loaiHocPhan: '',
      loaiKhoiKienThuc: '',
      maHocPhan: '',
      maHocPhanTruoc: '',
      soLyThuyet: '',
      soThucHanh: '',
      soThucTap: '',
      soTinChi: '',
      ten: '',
    });
  }
  setShowActionModal(true);
};


    const handleShowDetailModal = () => {
        console.log("daiCuong", daiCuong);
        console.log("chuyenNghiep", chuyenNghiep);
      setShowDetailModal(true)
    }


    const checkIfExist = (currentItem) => {
      danhSachDeCuongChiTiet.forEach(item => {
  console.log(item);
});
  const found = danhSachDeCuongChiTiet.some(
    (item) => item.hocPhan.id === currentItem
  );

  if (!found) {
    alert("Không tìm thấy chi tiết đề cương của học phần này.");
    handleCloseDetailDeCuongModal(); 
  }

  return found;
};

   const handleShowDetailDeCuongModal = async (item) => {
      setCurrentItem(item); 
      await fetchDanhSachDeCuongChiTiet(); 
      const id = item.id;
      console.log(id);
      const isExist = checkIfExist(item.id); 
      const filtered = danhSachDeCuongChiTiet.filter(
    (ctdc) => ctdc.hocPhan.id === item.id
  );


      if (isExist) {
        setFilteredDetails(filtered);
        setShowDetailDeCuongModal(true); 
      }
};


    const handleCloseDetailDeCuongModal = () => {
      setShowDetailDeCuongModal(false)
      setCurrentItem(null)
    }

    const handleCloseDetailModal = () => {
      setShowDetailModal(false)
      setCurrentItem(null)
    }

    const normalizeText = (text) =>
  (text || '')
    .normalize("NFD")                  // chuyển về dạng tổ hợp ký tự
    .replace(/\p{Diacritic}/gu, '')   // loại bỏ dấu
    .toLowerCase()                    // chuyển về chữ thường

  const filteredData = data.filter(item => {
  const term = normalizeText(searchTerm);
  return (
    normalizeText(item.thongTinChunng?.ten || "").includes(term) ||
    normalizeText(item.ten).includes(term) ||
    normalizeText(item.maHocPhan).includes(term) ||
    normalizeText(item.maHocPhanTruoc.toString()).includes(term) ||
    normalizeText(item.loaiHocPhan).includes(term)
  );
});



      const daiCuong = useMemo(() => {
         return data.filter(item => item.loaiKhoiKienThuc === 'Khối kiến thức giáo dục đại cương');
         console.log("daiCuong", daiCuong);

       }, [data]);

    const tongTinChiDaiCuong = useMemo(() => {
      return daiCuong.reduce((total, item) => total + item.soTinChi, 0);
    }, [daiCuong]);

    const tongTinChiBatBuocDaiCuong = useMemo(() => {
      return daiCuong
        .filter(item => item.loaiHocPhan === 'Bắt buộc')
        .reduce((total, item) => total + item.soTinChi, 0);
    }, [daiCuong]);

    const tongTinChiKhoiDaiCuong = useMemo(() => {
          return daiCuong
            .filter(item => item.khoiKienThuc === 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh')
            .reduce((total, item) => total + item.soTinChi, 0);
        }, [daiCuong]);


    const chuyenNghiep = useMemo(() => {
        return data.filter(item => item.loaiKhoiKienThuc === 'Khối kiến thức giáo dục chuyên nghiệp');
        console.log("chuyenNghiep", chuyenNghiep);
      }, [data]);

    const tongTinChiChuyenNghiep = useMemo(() => {
          return  chuyenNghiep.reduce((total, item) => total + item.soTinChi, 0);
        }, [chuyenNghiep]);

    const tongTinChiBatBuocChuyenNghiep = useMemo(() => {
      return chuyenNghiep
        .filter(item => item.loaiHocPhan === 'Bắt buộc')
        .reduce((total, item) => total + item.soTinChi, 0);
    }, [chuyenNghiep]);

    const tongTinChiKhoiChuyenNghiep = useMemo(() => {
          return chuyenNghiep
            .filter(item => item.khoiKienThuc === 'Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh')
            .reduce((total, item) => total + item.soTinChi, 0);
        }, [chuyenNghiep]);

   

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const paginationItems = []
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    )
  }


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="flex-grow-1 text-left m-0">Quản lý học phần</h2>

           <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Tìm kiếm học phần..."
                className="me-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "250px" }}
              />

          <Button variant="success" onClick={handleShowDetailModal} className="me-2">
            Xem chi tiết

          </Button>

          <Button variant="primary" onClick={() => handleShowActionModal()}>
            Thêm mới
          </Button>
      </div>
    </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã học phần</th>
            <th>Tên</th>
            <th>Số tín chỉ</th>
            <th>Hệ số</th>
            <th>Mã học phần trước</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.maHocPhan}</td>
              <td>{item.ten}</td>
              <td>{item.soTinChi}</td>
              <td>{item.loaiHocPhan}</td>
              <td>{item.maHocPhanTruoc}</td>
              <td>
                <Button
                  style={{ backgroundColor: '#006699', color: 'white' }}
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowDetailDeCuongModal(item)}
                  >
                    Xem chi tiết đề cương
                </Button>

                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowActionModal(item)}
                >
                  Sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>{paginationItems}</Pagination>

      <Modal show={showActionModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentItem ? 'Chỉnh sửa học phần' : 'Thêm học phần mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              {/* Các ô nhập bên trái */}
              <div className="col-md-6">

                <Form.Group className="mb-3">
                  <Form.Label>ID Thông tin chung</Form.Label>
                  <Form.Select
                    value={formData.id_thong_tin_chung}
                    onChange={(e) => setFormData({ ...formData, id_thong_tin_chung: e.target.value })}
                    required
                  >
                    <option value="">-- Chọn tên thông tin chung --</option>
                    {danhSachThongTinChung.map((ttc) => (
                      <option key={ttc.id} value={ttc.id}>
                        {ttc.id} - {ttc.ten}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>


                {[
                  ['Mã học phần', 'maHocPhan'],
                  ['Tên', 'ten'],
                  ['Số tín chỉ', 'soTinChi', 'number'],
                  ['Hệ số', 'heSo'],
                  ['Học kỳ thực hiện', 'hocKyThucHien', 'number'],
                ].map(([label, key, type = 'text']) => (
                  <Form.Group key={key} className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                      type={type}
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      required
                    />
                  </Form.Group>
                ))}

                 <Form.Group className="mb-3">
          <Form.Label>Loại khối kiến thức</Form.Label>

          <Form.Select
            value={formData.loaiKhoiKienThuc}
            onChange={(e) => {
              const newLoai = e.target.value;
              setFormData({
                ...formData,
                loaiKhoiKienThuc: newKhoi,
                khoiKienThuc: '' // reset loại khối khi khối thay đổi
              });
            }}
            required
          >
            <option value="">-- Chọn loại khối kiến thức --</option>

            {Object.keys(khoiKienThucOptions).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </Form.Select>
        </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
          <Form.Label>Khối kiến thức</Form.Label>
          <Form.Select
            value={formData.khoiKienThuc}
            onChange={(e) => setFormData({ ...formData, khoiKienThuc: e.target.value })}
            required
            disabled={!formData.loaiKhoiKienThuc}
          >
            <option value="">-- Chọn khối kiến thức --</option>
            {(khoiKienThucOptions[formData.loaiKhoiKienThuc] || []).map((loai) => (
              <option key={loai} value={loai}>{loai}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Loại học phần</Form.Label>
          <Form.Select
            value={formData.loaiHocPhan}
            onChange={(e) => setFormData({ ...formData, loaiHocPhan: e.target.value })}
            required
          >
            <option value="">-- Chọn loại học phần --</option>
            {loaiHocPhanOptions.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </Form.Select>
        </Form.Group>

                {[
                  ['Số lý thuyết', 'soLyThuyet', 'number'],
                  ['Số thực hành', 'soThucHanh', 'number'],
                  ['Số thực tập', 'soThucTap', 'number'],
                ].map(([label, key, type = 'text']) => (
                  <Form.Group key={key} className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                      type={type}
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      required
                    />
                  </Form.Group>
                  
                ))}
                <Form.Group className="mb-3">
                    <Form.Label>{"Mã học phần trước"}</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.maHocPhanTruoc}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    />
                  </Form.Group>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                {currentItem ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDetailDeCuongModal} onHide={handleCloseDetailDeCuongModal} size="lg">
  <Modal.Header closeButton>
    
    <Modal.Title>Chi tiết đánh giá học phần: {currentItem?.ten}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Table bordered>
      <thead className="text-center align-middle">
        <tr>
          <th>Bộ phận được đánh giá</th>
          <th>Điểm đánh giá bộ phận</th>
          <th>Trọng số</th>
          <th>Hình thức đánh giá</th>
        </tr>
      </thead>
      <tbody>
        <tr>
      <td rowSpan="1">
        <i><b>1. Đánh giá quá trình</b></i>
      </td>
      <td>
        <i>Điểm quá trình (1.1 + 1.2)</i>
      </td>
      <td className="text-center">
        {filteredDetails[0]?.trongSo}
      </td>
      <td>{filteredData[0]?.hinhThuc}</td>
    </tr>

         <tr>
          <td rowSpan="1"><b>1.1 Ý thức học tập</b></td>
          <td>Điểm chuyên cần, thái độ học tập</td>
          <td className="text-center">
             {filteredDetails[1]?.trongSo}
          </td>
          <td>
             {filteredDetails[1]?.hinhThuc}
          </td>
        </tr>
        
        <tr>
          <td rowSpan="5"><b>1.2 Hồ sơ học tập</b></td>
           <td>1.2.1 Điểm bài tập (ở nhà/trên lớp/bài tập lớn)</td>
          <td className="text-center">
             {filteredDetails[2]?.trongSo}
          </td>
          <td>
             {filteredDetails[2]?.hinhThuc}
          </td>
        </tr>

         <tr>
       <td>1.2.2 Điểm thuyết trình, thực hành, thảo luận</td>
          <td className="text-center">
             {filteredDetails[3]?.trongSo}
          </td>
          <td>
             {filteredDetails[3]?.hinhThuc}
          </td>
      </tr>

       <tr>
       <td>1.2.3 Điểm làm việc nhóm</td>
          <td className="text-center">
            {filteredDetails[4]?.trongSo}
          </td>
          <td>
             {filteredDetails[4]?.hinhThuc}
          </td>
      </tr>

       <tr>
       <td>1.2.4 Điểm kiểm tra giữa kỳ</td>
          <td className="text-center">
             {filteredDetails[5]?.trongSo}
          </td>
          <td>
             {filteredDetails[5]?.hinhThuc}
          </td>
      </tr>

       <tr>
       <td>
        {filteredDetails[6]?.diemDanhGia}
       </td>
          <td className="text-center">
             {filteredDetails[6]?.trongSo}
          </td>
          <td>
             {filteredDetails[6]?.hinhThuc}
          </td>
      </tr>

      <tr>
          <td rowSpan="1">
            <i><b>2.1 Đánh giá cuối kỳ</b> </i>
            </td>
          <td>
           <i>Điểm cuối kỳ(≥0.5)</i>
          </td>
          <td className="text-center">
             {filteredDetails[7]?.trongSo}
          </td>
          <td>
              {filteredDetails[7]?.hinhThuc}
          </td>
        </tr>
        
      </tbody>
    </Table>
    <p className="fst-italic">
      * Hình thức đánh giá: tự luận, trắc nghiệm, vấn đáp, tiểu luận, khác (ghi rõ)...
    </p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseDetailDeCuongModal}>
      Đóng
    </Button>
  </Modal.Footer>
</Modal>

      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>DM Học phần</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered responsive>
            <thead>
              <tr>
                <th rowSpan="2" className="text-center align-middle">TT</th>
                <th rowSpan="2" className="text-center align-middle">Mã HP</th>
                <th rowSpan="2" className="text-center align-middle">Tên Học phần</th>
                <th rowSpan="2" className="text-center align-middle">Số tín chỉ</th>
                <th colSpan="4" className="text-center">Số tiết dạy học</th>
                <th rowSpan="2" className="text-center align-middle">Hệ số học phần</th>
              </tr>
              <tr>
                <th className="text-center"> <i>Lý thuyết</i> </th>
                <th className="text-center"> <i>Thực hành</i> </th>
                <th className="text-center"> <i>Thực tập</i> </th>
                <th className="text-center">Cộng</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="3" className="fw-bold">
                  I. Khối kiến thức giáo dục đại cương
                  <i> (Không tính GDTC và GDQPAN).</i>
                </td>
                <td colSpan="1" className="fw-bold text-center">
                    {(tongTinChiDaiCuong - tongTinChiKhoiDaiCuong)}/{(tongTinChiDaiCuong - tongTinChiKhoiDaiCuong)}

                    </td>
              </tr>
              <tr>
                <td colSpan="3">Các học phần bắt buộc</td>
                <td colSpan="1" className="fw-bold text-center">
                    {tongTinChiBatBuocDaiCuong}/{tongTinChiDaiCuong}
                </td>
              </tr>
              {daiCuong.map((item, index) => {
                       const total = Number(item.soLyThuyet) + Number(item.soThucHanh) + Number(item.soThucTap);
                       return (
                         <tr key={item.id}>

                           <td>{index + 1}</td>
                           <td>{item.maHocPhan}</td>
                           <td>{item.ten}</td>

                           <td className = "text-center">{item.soTinChi}</td>
                           <td className = "text-center">{item.soLyThuyet}</td>
                           <td className = "text-center">{item.soThucHanh}</td>
                           <td className = "text-center">{item.soThucTap}</td>
                           <td className = "text-center">{total}</td>
                           <td className = "text-center">{item.heSo}</td>

                         </tr>
                       );
                     })}
           <tr>
                           <td colSpan="3" className="fw-bold">
                             II. Khối kiến thức giáo dục chuyên nghiệp
                             <i> (Không tính GDTC và GDQPAN).</i>
                           </td>
                           <td colSpan="1" className="fw-bold text-center">
                               {(tongTinChiChuyenNghiep - tongTinChiKhoiChuyenNghiep)}/{(tongTinChiChuyenNghiep - tongTinChiKhoiChuyenNghiep)}
                               </td>
                         </tr>
                         <tr>
                           <td colSpan="3" >Các học phần bắt buộc</td>
                           <td colSpan="1" className="fw-bold text-center">
                               {tongTinChiBatBuocChuyenNghiep}/{tongTinChiChuyenNghiep}
                           </td>
                         </tr>
                         {chuyenNghiep.map((item, index) => {
                                  const total = Number(item.soLyThuyet) + Number(item.soThucHanh) + Number(item.soThucTap);
                                  return (
                                    <tr key={item.id}>
                                      <td>{index + 1}</td>
                                      <td>{item.maHocPhan}</td>
                                      <td>{item.ten}</td>
                                      <td className = "text-center">{item.soTinChi}</td>
                                      <td className = "text-center">{item.soLyThuyet}</td>
                                      <td className = "text-center">{item.soThucHanh}</td>
                                      <td className = "text-center">{item.soThucTap}</td>
                                      <td className = "text-center">{total}</td>
                                      <td className = "text-center">{item.heSo}</td>
                                    </tr>
                                  );
                                })}
                   </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default HocPhan
