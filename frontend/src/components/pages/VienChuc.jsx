import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap'
import axios from 'axios'

const VienChuc = () => {
  const [data, setData] = useState([])
  const [showActionModal, setShowActionModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [formData, setFormData] = useState({ ten: '' })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/vienChuc')
      setData(response.data)
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentItem) {
        await axios.put(`http://localhost:8080/vienChuc/${currentItem.id}`, formData)
      } else {
        await axios.post('http://localhost:8080/vienChuc', formData)
      }
      fetchData()
      handleCloseModal()
    } catch (error) {
      alert('Có lỗi xảy ra: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Xác nhận xóa?')) {
      try {
        await axios.delete(`http://localhost:8080/vienChuc/${id}`)
        fetchData()
      } catch (error) {
        alert('Lỗi khi xóa: ' + (error.response?.data?.message || error.message))
      }
    }
  }

  const handleCloseModal = () => {
    setShowActionModal(false)
    setCurrentItem(null)
    setFormData({ ten: '' })
  }

  const handleShowActionModal = (item = null) => {
    if (item) {
      setCurrentItem(item)
      setFormData({ ten: item.ten })
    } else {
      setCurrentItem(null)
      setFormData({ ten: '' })
    }
    setShowActionModal(true)
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
        <h2 className="flex-grow-1 text-left m-0">Quản lý Viên chức</h2>
        <Button variant="primary" onClick={() => handleShowActionModal()}>
          Thêm mới
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Viên chức</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.ten}</td>
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
      <Modal show={showActionModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentItem ? 'Chỉnh sửa Viên chức' : 'Thêm Viên chức mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên Viên chức</Form.Label>
              <Form.Control
                type="text"
                value={formData.ten}
                onChange={(e) => setFormData({ ten: e.target.value })}
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

export default VienChuc
