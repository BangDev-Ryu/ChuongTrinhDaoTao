import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const DeCuongChiTiet = () => {
  const [data, setData] = useState([])
  const [showActionModal, setShowActionModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [danhSachHocPhan, setDanhSachHocPhan] = useState([])
  const [formData, setFormData] = useState({
    id_hoc_phan: '',
    boPhanDanhGia: '',
    diemDanhGia: '',
    trongSo: '',
    hinhThuc: '',
  })

    const hocPhanOptions = danhSachHocPhan.map((hp) => ({
    label: `${hp.id} - ${hp.ten}`,
    value: hp.id,
  }));


  const danhGiaOptions = {
  "1. Đánh giá quá trình": [
    "Điểm quá trình"
  ],
  "1.1 Ý thức học tập": [
    "Điểm chuyên cần, thái độ học tập"
  ],
  "1.2 Hồ sơ học tập": [
    "1.2.1 Điểm bài tập (ở nhà/trên lớp/bài tập lớn)",
    "1.2.2 Điểm thuyết trình, thực hành, thảo luận",
    "1.2.3 Điểm làm việc nhóm",
    "1.2.4 Điểm kiểm gia giữa kỳ",
    "1.2.5"
  ],
  "2. Đánh giá cuối kỳ": [
    "Điểm cuối kì (>=0.5)"
  ]
}

const boPhanOptions = Object.keys(danhGiaOptions).map((bp) => ({
  label: bp,
  value: bp,
}));  


  useEffect(() => {
    fetchData()
    fetchDanhSachHocPhan();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/deCuongChiTiet`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchDanhSachHocPhan = async () => {
  try {
    const response = await axios.get(`${API_BASE}/hocPhan`)
    setDanhSachHocPhan(response.data)
  } catch (error) {
    console.error('Lỗi khi lấy danh sách học phần:', error)
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault()
  try {
    const payload = {
      hocPhan: { id: formData.id_hoc_phan },
      boPhanDanhGia: formData.boPhanDanhGia,
      diemDanhGia: formData.diemDanhGia,
      trongSo: formData.trongSo,
      hinhThuc: formData.hinhThuc,
    }

    if (currentItem) {
      await axios.put(`${API_BASE}/deCuongChiTiet/${currentItem.id}`, payload)
    } else {
      await axios.post(`${API_BASE}/deCuongChiTiet`, payload)
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
        await axios.delete(`${API_BASE}/deCuongChiTiet/${id}`)
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
      id_hoc_phan: '',
      boPhanDanhGia: '',
      diemDanhGia: '',
      trongSo: '',
      hinhThuc: '',
    })
  }

  const handleShowActionModal = (item = null) => {
     if (item) {
    setCurrentItem(item)
    setFormData({
      id_hoc_phan: item.hocPhan?.id || '', 
      boPhanDanhGia: item.boPhanDanhGia || '',
      diemDanhGia: item.diemDanhGia || '',
      trongSo: item.trongSo || '',
      hinhThuc: item.hinhThuc || '',
    })
  } else {
    setFormData({
      id_hoc_phan: '',
      boPhanDanhGia: '',
      diemDanhGia: '',
      trongSo: '',
      hinhThuc: '',
    })
  }
  setShowActionModal(true)
  }


  const handleCloseDetailModal = () => {
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
      normalizeText(item.hocPhan?.ten || "").includes(term) ||
      normalizeText(item.boPhanDanhGia).includes(term) ||
      normalizeText(item.diemDanhGia).includes(term) ||
      normalizeText(item.trongSo?.toString()).includes(term) ||
      normalizeText(item.hinhThuc).includes(term)
    );
  });

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
        <h2 className="flex-grow-1 text-left m-0">Quản lý đề cương chi tiết</h2>
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm..."
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
            <th>Tên học phần</th>
            <th>Bộ phận đánh giá</th>
            <th>Điểm đánh giá</th>
            <th>Trọng số</th>
            <th>Hình thức</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.hocPhan?.ten}</td>
              <td>{item.boPhanDanhGia}</td>
              <td>{item.diemDanhGia}</td>
              <td>{item.trongSo}</td>
              <td>{item.hinhThuc}</td>
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
            {currentItem ? 'Chỉnh sửa đề cương' : 'Thêm đề cương mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
                

            <Form.Group className="mb-3">
              <Form.Label>Học phần</Form.Label>
              <Select
                options={hocPhanOptions}
                value={hocPhanOptions.find((opt) => opt.value === formData.id_hoc_phan) || null}
                onChange={(selected) =>
                  setFormData({ ...formData, id_hoc_phan: selected?.value || '' })
                }
                placeholder="Chọn học phần"
                isClearable
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bộ phận đánh giá</Form.Label>
              <Select
                options={boPhanOptions}
                value={boPhanOptions.find((opt) => opt.value === formData.boPhanDanhGia) || null}
                onChange={(selected) =>
                  setFormData({
                    ...formData,
                    boPhanDanhGia: selected?.value || '',
                    diemDanhGia: '', // reset điểm đánh giá khi bộ phận thay đổi
                  })
                }
                placeholder="Chọn bộ phận đánh giá"
                isClearable
              />
            </Form.Group>

            <Form.Group className="mb-3">
  <Form.Label>Điểm đánh giá</Form.Label>
  <CreatableSelect
    isDisabled={!formData.boPhanDanhGia}
    isClearable
    isSearchable
    options={(danhGiaOptions[formData.boPhanDanhGia] || []).map((diem) => ({
      label: diem,
      value: diem,
    }))}
    value={
      formData.diemDanhGia
        ? { label: formData.diemDanhGia, value: formData.diemDanhGia }
        : null
    }
    onChange={(selected) =>
      setFormData({ ...formData, diemDanhGia: selected?.value || '' })
    }
    styles={{
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
        color: 'black',
      }),
      control: (base) => ({
        ...base,
        borderColor: 'gray',
      }),
    }}
    placeholder="Nhập hoặc chọn điểm đánh giá"
  />
</Form.Group>



            <Form.Group className="mb-3">
              <Form.Label>Trọng số</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                value={formData.trongSo}
                onChange={(e) => setFormData({ ...formData, trongSo: e.target.value })}
               // required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình thức đánh giá</Form.Label>
              <Form.Control
                type="text"
                value={formData.hinhThuc}
                onChange={(e) => setFormData({ ...formData, hinhThuc: e.target.value })}
                // required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentItem ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DeCuongChiTiet