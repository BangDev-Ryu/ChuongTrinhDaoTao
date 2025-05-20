import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap'
import axios from 'axios'

const ThongTinChung = () => {
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)
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
    setShowModal(false)
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

  const handleShowModal = (item = null) => {
    if (item) {
      setCurrentItem(item)
      setFormData(item)
    }
    setShowModal(true)
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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý thông tin chung</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
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
            <th>Actions</th>
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
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(item)}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentItem ? 'Chỉnh sửa thông tin' : 'Thêm thông tin mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              <Form.Label>Ngày ban hành</Form.Label>
              <Form.Control
                type="text"
                value={formData.banHanh}
                onChange={(e) => setFormData({...formData, banHanh: e.target.value})}
                required
              />
            </Form.Group>

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
    </div>
  )
}

export default ThongTinChung