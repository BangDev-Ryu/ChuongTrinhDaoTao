import React, { useState, useEffect, useMemo } from 'react'
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap'
import axios from 'axios'

const HocPhan = () => {
  const [data, setData] = useState([])
  const [showActionModal, setShowActionModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/hocPhan')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentItem) {
        await axios.put(`http://localhost:8080/hocPhan/${currentItem.id}`, formData)
      } else {
        await axios.post('http://localhost:8080/hocPhan', formData)
      }
      fetchData()
      handleCloseModal()
    } catch (error) {
      console.error('Error:', error.response?.data)
      alert('Có lỗi xảy ra: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Xác nhận xóa?')) {
      try {
        await axios.delete(`http://localhost:8080/hocPhan/${id}`)
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
      setCurrentItem(item)
      setFormData(item)
    }
    setShowActionModal(true)
  }

  const handleShowDetailModal = () => {
      console.log("daiCuong", daiCuong);
      console.log("chuyenNghiep", chuyenNghiep);
    setShowDetailModal(true)
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
    setCurrentItem(null)
  }

    const filteredData = data.filter(item =>
        item.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.maHocPhan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.maHocPhanTruoc.toLowerCase().includes(searchTerm.toLowerCase())
      )


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
              <td>{item.heSo}</td>
              <td>{item.maHocPhanTruoc}</td>
              <td>
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
                {[
                  ['Mã học phần', 'maHocPhan'],
                  ['Tên', 'ten'],
                  ['Số tín chỉ', 'soTinChi', 'number'],
                  ['Hệ số', 'heSo'],
                  ['Học kỳ thực hiện', 'hocKyThucHien', 'number'],
                  ['Khối kiến thức', 'khoiKienThuc'],
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
              </div>

              <div className="col-md-6">
                {[
                  ['Loại học phần', 'loaiHocPhan'],
                  ['Loại khối kiến thức', 'loaiKhoiKienThuc'],
                  ['Mã học phần trước', 'maHocPhanTruoc'],
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
                <th className="text-center"> <i>Lý thuyết</i>< /th>
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
