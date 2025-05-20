import React, { useState } from 'react'
import { Table, Button, Container, Row, Col, Pagination } from 'react-bootstrap'

const KhoiKienThuc = () => {
  // Mock data - replace with actual API data later
  const [khoiKienThuc, setKhoiKienThuc] = useState([
    { id: 1, maKhoi: 'LT', tenKhoi: 'Lý thuyết', soTinChi: 30, ghiChu: 'Khối kiến thức cơ bản' },
    { id: 2, maKhoi: 'TH', tenKhoi: 'Thực hành', soTinChi: 15, ghiChu: 'Khối kiến thức thực hành' },
    // Add more mock data here
  ])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = khoiKienThuc.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(khoiKienThuc.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // CRUD handlers - implement these later
  const handleAdd = () => {
    // Add logic
  }

  const handleEdit = (id) => {
    // Edit logic
  }

  const handleDelete = (id) => {
    // Delete logic
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2>Quản lý Khối Kiến Thức</h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-lg me-2"></i>
            Thêm mới
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã khối</th>
            <th>Tên khối</th>
            <th>Số tín chỉ</th>
            <th>Ghi chú</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.maKhoi}</td>
              <td>{item.tenKhoi}</td>
              <td>{item.soTinChi}</td>
              <td>{item.ghiChu}</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEdit(item.id)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </Container>
  )
}

export default KhoiKienThuc