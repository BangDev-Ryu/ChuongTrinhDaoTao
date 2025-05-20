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

  const handleShowDetailModal = (item = null) => {
    setCurrentItem(item)
    setShowDetailModal(true)
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
    setCurrentItem(null)
  }

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(data.length / itemsPerPage)

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
        <Button variant="primary" onClick={() => handleShowActionModal()}>
          Thêm mới
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Bậc</th>
            <th>Loại bằng</th>
            <th>Loại hình đào tạo</th>
            <th>Thời gian</th>
            <th>Tín chỉ tích lũy</th>
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
              <td>{item.tinChiTichLuy}</td>
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
                  <Form.Label>Tín chỉ tích lũy</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.tinChiTichLuy}
                    onChange={(e) => setFormData({...formData, tinChiTichLuy: parseInt(e.target.value)})}
                    required
                  />
                </Form.Group>

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
                    required
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
                <th colSpan="2">Các khối kiến thức</th>
                <th colSpan="2">Số tín chỉ</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th>Bắt buộc</th>
                <th>Tự chọn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>I</td>
                <td >Khối kiến thức giáo dục đại cương</td>
                <td>34</td>
                <td>0</td>
              </tr>
              <tr>
                <td></td>
                <td >Kiến thức Giáo dục thể chất và Giáo dục quốc phòng và an ninh</td>
                <td>12</td>
                <td>2</td>
              </tr>
              <tr>
                <td></td>
                <td >Kiến thức Ngoại ngữ</td>
                <td>9</td>
                <td>0</td>
              </tr>
              <tr>
                <td></td>
                <td >Kiến thức Lý luận chính trị</td>
                <td>11</td>
                <td>0</td>
              </tr>
              <tr>
                <td></td>
                <td >Kiến thức giáo dục đại cương khác</td>
                <td>14</td>
                <td>0</td>
              </tr>
              <tr>
                <td>II</td>
                <td >Khối kiến thức giáo dục chuyên nghiệp</td>
                <td>90</td>
                <td>31</td>
              </tr>
              <tr>
                <td></td>
                <td >Kiến thức cơ sở của ngành</td>
                <td>37</td>
                <td>0</td>
              </tr>
              <tr>
                <td></td>
                <td >Kiến thức ngành</td>
                <td>37</td>
                <td>16</td>
              </tr>
              <tr>
                <td></td>
                <td >Kiến thức chuyên ngành (nếu có)</td>
                <td>16</td>
                <td>15</td>
              </tr>
              <tr>
                <td colSpan="2" className="text-end fw-bold">Tổng</td>
                <td>124</td>
                <td>31</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">
                  Số tín chỉ tối thiểu phải tích lũy (không tính số tín chỉ Giáo dục thể chất và Giáo dục quốc phòng và an ninh): 155
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