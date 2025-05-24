import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap'
import axios from 'axios'

const ThongTinChung = () => {
  const [data, setData] = useState([])
  const [showActionModal, setShowActionModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    ten: '',
    bac: '',
    loaiBang: '',
    loaiHinhDaoTao: '',
    thoiGian: '',
    tinChiTichLuy: 0,
    khoaQuanLy: '',
    ngonNgu: '',
    website: '',
    banHanh: ''
  })

  // Thêm state mới
  const [tinChiTotals, setTinChiTotals] = useState({
    gdtc: { batBuoc: 0, tuChon: 0 },
    ngoaiNgu: { batBuoc: 0, tuChon: 0 },
    llct: { batBuoc: 0, tuChon: 0 },
    khac: { batBuoc: 0, tuChon: 0 },
    coSo: { batBuoc: 0, tuChon: 0 }, 
    nganh: { batBuoc: 0, tuChon: 0 },
    chuyenNganh: { batBuoc: 0, tuChon: 0 }
  });

  // Fetch data
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/thongTinChung')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form data being sent:', formData) // Thêm dòng này
    try {
      if (currentItem) {
        await axios.put(`http://localhost:8080/thongTinChung/${currentItem.id}`, formData)
      } else {
        await axios.post('http://localhost:8080/thongTinChung', formData)
      }
      fetchData()
      handleCloseModal()
    } catch (error) {
      console.error('Error response:', error.response?.data)
      console.error('Error status:', error.response?.status)
      alert('Có lỗi xảy ra: ' + (error.response?.data?.message || error.message))
    }
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Xác nhận xóa?')) {
      try {
        await axios.delete(`http://localhost:8080/thongTinChung/${id}`)
        fetchData()
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  // Modal handlers
  const handleCloseModal = () => {
    setShowActionModal(false)
    setCurrentItem(null)
    setFormData({
      ten: '',
      bac: '',
      loaiBang: '',
      loaiHinhDaoTao: '',
      thoiGian: '',
      tinChiTichLuy: 0,
      khoaQuanLy: '',
      ngonNgu: '',
      website: '',
      banHanh: ''
    })
  }

  const handleShowActionModal = (item = null) => {
    if (item) {
      setCurrentItem(item)
      setFormData(item)
    }
    setShowActionModal(true)
  }

  const handleShowDetailModal = async (item) => {
    setCurrentItem(item);
    setShowDetailModal(true);
    
    try {
      // Fetch tất cả dữ liệu tín chỉ
      const [
        bbGDTCQP,
        bbNgoaiNgu,
        bbLLCT,
        bbKhac,
        bbCoSo,
        bbNganh,
        bbChuyenNganh,
        tcGDTCQP,
        tcNgoaiNgu,
        tcLLCT,
        tcKhac,
        tcCoSo,
        tcNganh,
        tcChuyenNganh,
      ] = await Promise.all([
        sumTinChiByKhoiKienThuc(item.id, "Bắt buộc", "Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh"),
        sumTinChiByKhoiKienThuc(item.id, "Bắt buộc", "Kiến thức Ngoại ngữ"),
        sumTinChiByKhoiKienThuc(item.id, "Bắt buộc", "Kiến thức Lý luận chính trị"),
        sumTinChiByKhoiKienThuc(item.id, "Bắt buộc", "Kiến thức giáo dục đại cương khác"),
        sumTinChiByKhoiKienThuc(item.id, "Bắt buộc", "Kiến thức cơ sở của ngành"),
        sumTinChiByKhoiKienThuc(item.id, "Bắt buộc", "Kiến thức ngành"),
        sumTinChiByKhoiKienThuc(item.id, "Bắt buộc", "Kiến thức chuyên ngành"),
        sumTinChiByKhoiKienThuc(item.id, "Tự chọn", "Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh"),
        sumTinChiByKhoiKienThuc(item.id, "Tự chọn", "Kiến thức Ngoại ngữ"),
        sumTinChiByKhoiKienThuc(item.id, "Tự chọn", "Kiến thức Lý luận chính trị"),
        sumTinChiByKhoiKienThuc(item.id, "Tự chọn", "Kiến thức giáo dục đại cương khác"),
        sumTinChiByKhoiKienThuc(item.id, "Tự chọn", "Kiến thức cơ sở của ngành"),
        sumTinChiByKhoiKienThuc(item.id, "Tự chọn", "Kiến thức ngành"),
        sumTinChiByKhoiKienThuc(item.id, "Tự chọn", "Kiến thức chuyên ngành"),
      ]);

      setTinChiTotals({
        gdtc: { batBuoc: bbGDTCQP || 0, tuChon: tcGDTCQP || 0 },
        ngoaiNgu: { batBuoc: bbNgoaiNgu || 0, tuChon: tcNgoaiNgu || 0 },
        llct: { batBuoc: bbLLCT || 0, tuChon: tcLLCT || 0 },
        khac: { batBuoc: bbKhac || 0, tuChon: tcKhac || 0 },
        coSo: { batBuoc: bbCoSo || 0, tuChon: tcCoSo || 0 },
        nganh: { batBuoc: bbNganh || 0, tuChon: tcNganh || 0 },
        chuyenNganh: { batBuoc: bbChuyenNganh || 0, tuChon: tcChuyenNganh || 0 }
      });

    } catch (error) {
      console.error('Error fetching credit totals:', error);
    }
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setCurrentItem(null);
    setTinChiTotals({
      gdtc: { batBuoc: 0, tuChon: 0 },
      ngoaiNgu: { batBuoc: 0, tuChon: 0 },
      llct: { batBuoc: 0, tuChon: 0 },
      khac: { batBuoc: 0, tuChon: 0 },
      coSo: { batBuoc: 0, tuChon: 0 }, 
      nganh: { batBuoc: 0, tuChon: 0 },
      chuyenNganh: { batBuoc: 0, tuChon: 0 }
    }); 
  }

  const sumTinChiByKhoiKienThuc = async (idThongTinChung, loaiHocPhan, khoiKienThuc) => {
    try {
      const response = await axios.get('http://localhost:8080/hocPhan/sumTinChiKhoiKienThuc', {
        params: {
          idThongTinChung,
          loaiHocPhan,
          khoiKienThuc
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return 0;
    }
  }
  
  const normalizeText = (text) =>
  (text || '')
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

  // Lọc dữ liệu theo searchTerm
  const filteredData = data.filter(item => {
    const term = normalizeText(searchTerm);
    return normalizeText(item.ten).includes(term);
  });

  // Cập nhật logic phân trang để sử dụng filteredData
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
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý thông tin chung</h2>
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên..."
            className="me-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "250px" }}
          />
          <Button variant="primary" onClick={() => handleShowActionModal()}>
            Thêm mới
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Bậc</th>
            <th>Loại bằng</th>
            <th>Loại hình đào tạo</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.ten}</td>
              <td>{item.bac}</td>
              <td>{item.loaiBang}</td>
              <td>{item.loaiHinhDaoTao}</td>
              <td>{item.thoiGian}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowDetailModal(item)}
                >
                  Xem chi tiết
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
            {currentItem ? 'Chỉnh sửa thông tin' : 'Thêm thông tin mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ten}
                    onChange={(e) => setFormData({...formData, ten: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bậc</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.bac}
                    onChange={(e) => setFormData({...formData, bac: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Loại bằng</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.loaiBang}
                    onChange={(e) => setFormData({...formData, loaiBang: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Loại hình đào tạo</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.loaiHinhDaoTao}
                    onChange={(e) => setFormData({...formData, loaiHinhDaoTao: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Thời gian</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.thoiGian}
                    onChange={(e) => setFormData({...formData, thoiGian: e.target.value})}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">

                <Form.Group className="mb-3">
                  <Form.Label>Khoa quản lý</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.khoaQuanLy}
                    onChange={(e) => setFormData({...formData, khoaQuanLy: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ngôn ngữ</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ngonNgu}
                    onChange={(e) => setFormData({...formData, ngonNgu: e.target.value})}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ban hành</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.banHanh}
                    onChange={(e) => setFormData({...formData, banHanh: e.target.value})}
                    required
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

      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết khung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <thead>
              <tr>
                <th colSpan="2" rowSpan="2" className='text-center align-middle'>Các khối kiến thức</th>
                <th colSpan="2" className='text-center'>Số tín chỉ</th>
              </tr>
              <tr>
                <th>Bắt buộc</th>
                <th>Tự chọn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='fw-bold'>I</td>
                <td className='fw-bold'>Khối kiến thức giáo dục đại cương</td>
                <td className='fw-bold'>
                  {tinChiTotals.ngoaiNgu.batBuoc + tinChiTotals.llct.batBuoc + tinChiTotals.khac.batBuoc}
                </td>
                <td className='fw-bold'>
                  {tinChiTotals.ngoaiNgu.tuChon + tinChiTotals.llct.tuChon + tinChiTotals.khac.tuChon}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh</td>
                <td>{tinChiTotals.gdtc.batBuoc}</td>
                <td>{tinChiTotals.gdtc.tuChon}</td>
              </tr>
              <tr>
                <td></td>
                <td>Kiến thức Ngoại ngữ</td>
                <td>{tinChiTotals.ngoaiNgu.batBuoc}</td>
                <td>{tinChiTotals.ngoaiNgu.tuChon}</td>
              </tr>
              <tr>
                <td></td>
                <td>Kiến thức Lý luận chính trị</td>
                <td>{tinChiTotals.llct.batBuoc}</td>
                <td>{tinChiTotals.llct.tuChon}</td>
              </tr>
              <tr>
                <td></td>
                <td>Kiến thức giáo dục đại cương khác</td>
                <td>{tinChiTotals.khac.batBuoc}</td>
                <td>{tinChiTotals.khac.tuChon}</td>
              </tr>
              <tr>
                <td className='fw-bold'>II</td>
                <td className='fw-bold'>Khối kiến thức giáo dục chuyên nghiệp</td>
                <td className='fw-bold'>
                  {tinChiTotals.coSo.batBuoc + tinChiTotals.nganh.batBuoc + tinChiTotals.chuyenNganh.batBuoc}
                </td>
                <td className='fw-bold'>
                  {tinChiTotals.coSo.tuChon + tinChiTotals.nganh.tuChon + tinChiTotals.chuyenNganh.tuChon}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Kiến thức cơ sở của ngành</td>
                <td>{tinChiTotals.coSo.batBuoc}</td>
                <td>{tinChiTotals.coSo.tuChon}</td>
              </tr>
              <tr>
                <td></td>
                <td>Kiến thức ngành</td>
                <td>{tinChiTotals.nganh.batBuoc}</td>
                <td>{tinChiTotals.nganh.tuChon}</td>
              </tr>
              <tr>
                <td></td>
                <td>Kiến thức chuyên ngành (nếu có)</td>
                <td>{tinChiTotals.chuyenNganh.batBuoc}</td>
                <td>{tinChiTotals.chuyenNganh.tuChon}</td>
              </tr>
              <tr>
                <td colSpan="2" className="text-end fw-bold">Tổng</td>
                <td className='fw-bold'>
                  {tinChiTotals.ngoaiNgu.batBuoc + tinChiTotals.llct.batBuoc + tinChiTotals.khac.batBuoc + tinChiTotals.coSo.batBuoc + tinChiTotals.nganh.batBuoc + tinChiTotals.chuyenNganh.batBuoc}
                </td>
                <td className='fw-bold'>
                  {tinChiTotals.ngoaiNgu.tuChon + tinChiTotals.llct.tuChon + tinChiTotals.khac.tuChon + tinChiTotals.coSo.tuChon + tinChiTotals.nganh.tuChon + tinChiTotals.chuyenNganh.tuChon}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">
                  Số tín chỉ tối thiểu phải tích lũy (không tính số tín chỉ Giáo dục thể chất và Giáo dục quốc phòng và an ninh):
                  <span className='fw-bold'>
                    {
                      tinChiTotals.ngoaiNgu.batBuoc + 
                      tinChiTotals.llct.batBuoc + 
                      tinChiTotals.khac.batBuoc + 
                      tinChiTotals.coSo.batBuoc + 
                      tinChiTotals.nganh.batBuoc + 
                      tinChiTotals.chuyenNganh.batBuoc + 
                      tinChiTotals.ngoaiNgu.tuChon + 
                      tinChiTotals.llct.tuChon + 
                      tinChiTotals.khac.tuChon + 
                      tinChiTotals.coSo.tuChon + 
                      tinChiTotals.nganh.tuChon + 
                      tinChiTotals.chuyenNganh.tuChon
                      }

                  </span>
                  
                </td>
              </tr>
            </tfoot>
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


export default ThongTinChung