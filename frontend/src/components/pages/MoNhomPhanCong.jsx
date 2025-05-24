import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select';

const MoNhomPhanCong = () => {
  const [data, setData] = useState([])
  const [showActionModal, setShowActionModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [danhSachHocPhan, setDanhSachHocPhan] = useState([])
  const [availableHocPhan, setAvailableHocPhan] = useState([])
  const [selectedHocPhan, setSelectedHocPhan] = useState(null)
  const [formData, setFormData] = useState({
    id_hoc_phan: '',
    khoa: '',
    tongSoNhom: '',
    soLuongSinhVienNhom: '',
  })

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [danhSachGiangVien, setDanhSachGiangVien] = useState([]);
  const [danhSachPhanCong, setDanhSachPhanCong] = useState([]);
  const [showPhanCongModal, setShowPhanCongModal] = useState(false);
  const [selectedKeHoach, setSelectedKeHoach] = useState(null);
  const [formPhanCong, setFormPhanCong] = useState({
    id_giang_vien: '',
    nhom: '',
    loaiNhom: '', // Thêm trường này
    soTietThucHien: '',
    soTietThucTe: ''
  });

  const [currentPhanCong, setCurrentPhanCong] = useState(null);
  const [selectedKeHoachInfo, setSelectedKeHoachInfo] = useState({
    tongSoTiet: 0,
    heSo: 0
  });

  useEffect(() => {
    fetchData()
    fetchAvailableHocPhan()
  }, [])

  useEffect(() => {
    if (selectedKeHoach) {
      const tongSoTiet = selectedKeHoach.hocPhan.soLyThuyet +
        selectedKeHoach.hocPhan.soThucHanh +
        selectedKeHoach.hocPhan.soThucTap;
      setSelectedKeHoachInfo({
        tongSoTiet: tongSoTiet,
        heSo: selectedKeHoach.hocPhan.heSo
      });
    }
  }, [selectedKeHoach]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/keHoachMoNhom')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchDanhSachHocPhan = async () => {
    try {
      const response = await axios.get('http://localhost:8080/hocPhan')
      setDanhSachHocPhan(response.data)
    } catch (error) {
      console.error('Error fetching hoc phan:', error)
    }
  }

  const fetchAvailableHocPhan = async () => {
    try {
      const allHocPhan = await axios.get('http://localhost:8080/hocPhan')
      const keHoachMoNhom = await axios.get('http://localhost:8080/keHoachMoNhom')

      const usedHocPhanIds = keHoachMoNhom.data.map(item => item.hocPhan.id)
      const availableHP = allHocPhan.data.filter(hp => !usedHocPhanIds.includes(hp.id))

      setAvailableHocPhan(availableHP)
      setDanhSachHocPhan(allHocPhan.data)
    } catch (error) {
      console.error('Error fetching available hoc phan:', error)
    }
  }

  const fetchGiangVien = async () => {
    try {
      const response = await axios.get('http://localhost:8080/giangVien');
      setDanhSachGiangVien(response.data);
    } catch (error) {
      console.error('Error fetching giang vien:', error);
    }
  };

  const fetchPhanCong = async (keHoachId) => {
    try {
      const response = await axios.get(`http://localhost:8080/phanCongGiangDay`, {
        params: {
          id_ke_hoach_mo_nhom: keHoachId
        }
      });
      setDanhSachPhanCong(response.data);
    } catch (error) {
      console.error('Error fetching phan cong:', error);
      setDanhSachPhanCong([]);
    }
  };

  const getHocPhanOptions = (hocPhans) => {
    return hocPhans.map(hp => ({
      value: hp.id,
      label: `${hp.maHocPhan} - ${hp.ten}`,
      hocPhan: hp
    }));
  };

  const handleHocPhanChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedHocPhan(selectedOption.hocPhan);
      setFormData({
        ...formData,
        id_hoc_phan: selectedOption.value
      });
    } else {
      setSelectedHocPhan(null);
      setFormData({
        ...formData,
        id_hoc_phan: ''
      });
    }
  };

  const getTotalAssignedGroupsForKeHoach = async (keHoachId) => {
    try {
      const response = await axios.get(`http://localhost:8080/phanCongGiangDay`, {
        params: {
          id_ke_hoach_mo_nhom: keHoachId
        }
      });
      return response.data.reduce((sum, pc) => sum + parseInt(pc.nhom || 0), 0);
    } catch (error) {
      console.error('Error:', error);
      return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        const totalAssignedGroups = await getTotalAssignedGroupsForKeHoach(currentItem.id);

        if (parseInt(formData.tongSoNhom) < totalAssignedGroups) {
          alert(`Không thể giảm tổng số nhóm xuống ${formData.tongSoNhom}. Hiện tại đã phân công ${totalAssignedGroups} nhóm.`);
          return;
        }
      }

      const payload = {
        hocPhan: { id: formData.id_hoc_phan },
        khoa: formData.khoa,
        tongSoNhom: formData.tongSoNhom,
        soLuongSinhVienNhom: formData.soLuongSinhVienNhom
      };

      if (currentItem) {
        await axios.put(`http://localhost:8080/keHoachMoNhom/${currentItem.id}`, payload);
      } else {
        await axios.post('http://localhost:8080/keHoachMoNhom', payload);
      }

      fetchData();
      fetchAvailableHocPhan();
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra');
    }
  }

  const handleShowActionModal = (item = null) => {
    if (item) {
      setCurrentItem(item)
      setSelectedHocPhan(item.hocPhan)
      setFormData({
        id_hoc_phan: item.hocPhan.id,
        khoa: item.khoa,
        tongSoNhom: item.tongSoNhom,
        soLuongSinhVienNhom: item.soLuongSinhVienNhom
      })
    } else {
      setCurrentItem(null)
      setSelectedHocPhan(null)
      setFormData({
        id_hoc_phan: '',
        khoa: '',
        tongSoNhom: '',
        soLuongSinhVienNhom: ''
      })
    }
    setShowActionModal(true)
  }

  const handleCloseModal = () => {
    setShowActionModal(false)
    setCurrentItem(null)
    setFormData({
      id_hoc_phan: '',
      khoa: '',
      tongSoNhom: '',
      soLuongSinhVienNhom: '',
    })
    setSelectedHocPhan(null)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Xác nhận xóa?')) {
      try {
        await axios.delete(`http://localhost:8080/keHoachMoNhom/${id}`)
        fetchData()
        fetchAvailableHocPhan()
      } catch (error) {
        console.error('Error:', error)
        alert('Có lỗi xảy ra khi xóa')
      }
    }
  }

  const handleShowDetailModal = async (item) => {
    try {
      setSelectedKeHoach(item);
      const tongSoTiet = item.hocPhan.soLyThuyet +
        item.hocPhan.soThucHanh +
        item.hocPhan.soThucTap;

      setSelectedKeHoachInfo({
        tongSoTiet: tongSoTiet,
        heSo: item.hocPhan.heSo
      });

      await Promise.all([
        fetchGiangVien(),
        fetchPhanCong(item.id)
      ]);

      setShowDetailModal(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra khi tải dữ liệu');
    }
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedKeHoach(null);
    setDanhSachPhanCong([]);
  };

  const handleShowPhanCongModal = () => {
    setShowDetailModal(false);
    setFormPhanCong({
      id_giang_vien: '',
      nhom: '',
      loaiNhom: '', // Thêm trường này
      soTietThucHien: '',
      soTietThucTe: ''
    });
    setShowPhanCongModal(true);
  };

  const handleClosePhanCongModal = () => {
    setShowPhanCongModal(false);
    setShowDetailModal(true);
    setFormPhanCong({
      id_giang_vien: '',
      nhom: '',
      loaiNhom: '', // Thêm trường này
      soTietThucHien: '',
      soTietThucTe: ''
    });
    setCurrentPhanCong(null);
  };

  const handleEditPhanCong = (phanCong) => {
    setShowDetailModal(false);
    // Lấy số nhóm bằng cách chỉ lấy phần số
    const nhomNumber = phanCong.nhom.split('-')[0];
    setFormPhanCong({
      id_giang_vien: phanCong.giangVien.id,
      nhom: nhomNumber, // Chỉ lưu phần số
      loaiNhom: phanCong.nhom.includes('-') ? phanCong.nhom.split('-')[1] : '',
      soTietThucHien: phanCong.soTietThucHien,
      soTietThucTe: phanCong.soTietThucTe
    });
    setCurrentPhanCong(phanCong);
    setShowPhanCongModal(true);
  };

  const handleDeletePhanCong = async (id) => {
    if (window.confirm('Xác nhận xóa phân công này?')) {
      try {
        await axios.delete(`http://localhost:8080/phanCongGiangDay/${id}`);
        await fetchPhanCong(selectedKeHoach.id);
      } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi xóa');
      }
    }
  };

  const handleSubmitPhanCong = async (e) => {
    e.preventDefault();
    try {
      const totalAssigned = getTotalAssignedGroups();
      const newTotal = totalAssigned + parseInt(formPhanCong.nhom || 0);

      if (newTotal > selectedKeHoach.tongSoNhom) {
        alert(`Không thể phân công. Tổng số nhóm (${newTotal}) vượt quá số nhóm của kế hoạch (${selectedKeHoach.tongSoNhom})`);
        return;
      }

      const nhomValue = formPhanCong.loaiNhom 
        ? `${formPhanCong.nhom} - ${formPhanCong.loaiNhom}`
        : formPhanCong.nhom;

      const payload = {
        ...formPhanCong,
        nhom: nhomValue, // Gửi giá trị đã kết hợp
        keHoachMoNhom: { id: selectedKeHoach.id },
        giangVien: { id: formPhanCong.id_giang_vien }
      };

      if (currentPhanCong) {
        await axios.put(`http://localhost:8080/phanCongGiangDay/${currentPhanCong.id}`, payload);
      } else {
        await axios.post('http://localhost:8080/phanCongGiangDay', payload);
      }

      await fetchPhanCong(selectedKeHoach.id);
      setShowPhanCongModal(false);
      setShowDetailModal(true); // Hiện lại modal chi tiết
      setCurrentPhanCong(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const getTotalAssignedGroups = () => {
    const currentAssignments = danhSachPhanCong.filter(pc =>
      !currentPhanCong || pc.id !== currentPhanCong.id
    );
    return currentAssignments.reduce((sum, pc) => sum + parseInt(pc.nhom || 0), 0);
  };

  const handleNhomChange = (e) => {
    // Chỉ cho phép nhập số
    const nhom = e.target.value.replace(/[^0-9]/g, '');
    const totalAssigned = getTotalAssignedGroups();
    const newTotal = totalAssigned + parseInt(nhom || 0);

    if (newTotal > selectedKeHoach.tongSoNhom) {
      alert(`Không thể phân công. Tổng số nhóm (${newTotal}) vượt quá số nhóm của kế hoạch (${selectedKeHoach.tongSoNhom})`);
      return;
    }

    let soTiet = 0;
    switch (formPhanCong.loaiNhom) {
      case 'LT':
        soTiet = selectedKeHoach.hocPhan.soLyThuyet;
        break;
      case 'BT':
        soTiet = selectedKeHoach.hocPhan.soThucTap;
        break;
      case 'TH':
        soTiet = selectedKeHoach.hocPhan.soThucHanh;
        break;
      default:
        soTiet = selectedKeHoach.hocPhan.soLyThuyet + 
                 selectedKeHoach.hocPhan.soThucHanh + 
                 selectedKeHoach.hocPhan.soThucTap;
    }

    // Tính số tiết dựa trên số nhóm (bỏ qua các ký tự khác)
    const nhomNumber = parseInt(nhom || 0);
    const soTietThucHien = nhomNumber * soTiet;
    const soTietThucTe = soTietThucHien * selectedKeHoach.hocPhan.heSo;

    setFormPhanCong({
      ...formPhanCong,
      // Lưu chỉ số nhóm vào state
      nhom: nhom,
      soTietThucHien,
      soTietThucTe
    });
  };

  const getAvailableGiangVien = () => {
    const assignedGiangVienIds = danhSachPhanCong.map(pc => pc.giangVien.id);
    return danhSachGiangVien.filter(gv => !assignedGiangVienIds.includes(gv.id));
  };

  const handleLoaiNhomChange = (loaiNhom) => {
    const nhom = formPhanCong.nhom;
    let soTiet = 0;

    switch (loaiNhom) {
      case 'LT':
        soTiet = selectedKeHoach.hocPhan.soLyThuyet;
        break;
      case 'BT':
        soTiet = selectedKeHoach.hocPhan.soThucTap;
        break;
      case 'TH':
        soTiet = selectedKeHoach.hocPhan.soThucHanh;
        break;
      default:
        soTiet = selectedKeHoach.hocPhan.soLyThuyet + 
                 selectedKeHoach.hocPhan.soThucHanh + 
                 selectedKeHoach.hocPhan.soThucTap;
    }

    const soTietThucHien = nhom ? soTiet * parseInt(nhom) : 0;
    const soTietThucTe = soTietThucHien * selectedKeHoach.hocPhan.heSo;

    setFormPhanCong({
      ...formPhanCong,
      loaiNhom,
      soTietThucHien,
      soTietThucTe
    });
  };

  const resetFormPhanCong = () => {
    setFormPhanCong({
      id_giang_vien: '',
      nhom: '',
      loaiNhom: '',
      soTietThucHien: '',
      soTietThucTe: ''
    });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý kế hoạch mở nhóm</h2>
        <Button variant="primary" onClick={() => handleShowActionModal()}>
          Thêm mới
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th rowSpan="2" className="text-center align-middle">Mã HP</th>
            <th rowSpan="2" className="text-center align-middle">Tên HP</th>
            <th rowSpan="2" className="text-center align-middle">Số TC</th>
            <th rowSpan="2" className="text-center align-middle">Khóa</th>
            <th colSpan="4" className="text-center">Số tiết</th>
            <th rowSpan="2" className="text-center align-middle">Hệ số HP</th>
            <th rowSpan="2" className="text-center align-middle">Tổng số nhóm</th>
            <th rowSpan="2" className="text-center align-middle">Số lượng sinh viên nhóm</th>
            <th rowSpan="2" className="text-center align-middle">Hành động</th>
          </tr>
          <tr>
            <th className="text-center">LT</th>
            <th className="text-center">BT</th>
            <th className="text-center">TH</th>
            <th className="text-center">TC</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.hocPhan?.maHocPhan}</td>
              <td>{item.hocPhan?.ten}</td>
              <td className="text-center">{item.hocPhan?.soTinChi}</td>
              <td>{item.khoa}</td>
              <td className="text-center">{item.hocPhan?.soLyThuyet}</td>
              <td className="text-center">{item.hocPhan?.soThucTap}</td>
              <td className="text-center">{item.hocPhan?.soThucHanh}</td>
              <td className="text-center">{item.hocPhan?.soLyThuyet + item.hocPhan?.soThucTap + item.hocPhan?.soThucHanh}</td>
              <td className="text-center">{item.hocPhan?.heSo}</td>
              <td className="text-center">{item.tongSoNhom}</td>
              <td className="text-center">{item.soLuongSinhVienNhom}</td>
              <td className="text-nowrap text-center">
                <Button variant="info" size="sm" className="me-1" onClick={() => handleShowDetailModal(item)}>
                  Xem chi tiết
                </Button>
                <Button variant="warning" size="sm" className="me-1" onClick={() => handleShowActionModal(item)}>
                  Sửa
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showActionModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentItem ? 'Chỉnh sửa kế hoạch mở nhóm' : 'Thêm kế hoạch mở nhóm mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Học phần</Form.Label>
              <Select
                isClearable
                isSearchable
                isDisabled={currentItem}
                placeholder="Tìm kiếm và chọn học phần..."
                options={getHocPhanOptions(currentItem ? danhSachHocPhan : availableHocPhan)}
                value={formData.id_hoc_phan ? {
                  value: selectedHocPhan?.id,
                  label: `${selectedHocPhan?.maHocPhan} - ${selectedHocPhan?.ten}`,
                  hocPhan: selectedHocPhan
                } : null}
                onChange={handleHocPhanChange}
                noOptionsMessage={() => "Không tìm thấy học phần"}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '38px',
                    border: '1px solid #ced4da',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#6c757d',
                  })
                }}
              />
            </Form.Group>

            {selectedHocPhan && (
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Số tín chỉ</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedHocPhan.soTinChi}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Số tiết lý thuyết</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedHocPhan.soLyThuyet}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Số tiết thực hành</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedHocPhan.soThucHanh}
                      disabled
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Số tiết thực tập</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedHocPhan.soThucTap}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Hệ số học phần</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedHocPhan.heSo}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Tổng số tiết</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedHocPhan.soLyThuyet + selectedHocPhan.soThucHanh + selectedHocPhan.soThucTap}
                      disabled
                    />
                  </Form.Group>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Khóa</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.khoa}
                    onChange={(e) => setFormData({ ...formData, khoa: e.target.value })}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Tổng số nhóm</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.tongSoNhom}
                    onChange={(e) => setFormData({ ...formData, tongSoNhom: e.target.value })}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Số lượng sinh viên/nhóm</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.soLuongSinhVienNhom}
                    onChange={(e) => setFormData({ ...formData, soLuongSinhVienNhom: e.target.value })}
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
          <Modal.Title>
            Quản lý phân công giảng dạy - {selectedKeHoach?.hocPhan?.ten}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedKeHoach && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Thông tin học phần</h5>
                <Button variant="primary" onClick={handleShowPhanCongModal}>
                  Phân công
                </Button>
              </div>

              <Table bordered className="mb-4">
                <tbody>
                  <tr>
                    <th width="15%">Mã học phần:</th>
                    <td>{selectedKeHoach.hocPhan.maHocPhan}</td>
                    <th width="15%">Tên học phần:</th>
                    <td>{selectedKeHoach.hocPhan.ten}</td>
                  </tr>
                  <tr>
                    <th>Khóa:</th>
                    <td>{selectedKeHoach.khoa}</td>
                    <th>Số nhóm:</th>
                    <td>{selectedKeHoach.tongSoNhom}</td>
                  </tr>
                </tbody>
              </Table>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-center">Nhóm</th>
                    <th className="text-center">Mã giảng viên</th>
                    <th className="text-center">Tên giảng viên</th>
                    <th className="text-center">Số tiết thực hiện</th>
                    <th className="text-center">Số tiết thực tế</th>
                    <th className="text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {danhSachPhanCong.length > 0 ? (
                    danhSachPhanCong.map(pc => (
                      <tr key={pc.id}>
                        <td className="text-center">
                          {`${pc.nhom}${pc.loaiNhom ? ` - ${pc.loaiNhom}` : ''}`}
                        </td>
                        <td className="text-center">{pc.giangVien.id}</td>
                        <td className="text-center">{pc.giangVien.ten}</td>
                        <td className="text-center">{pc.soTietThucHien}</td>
                        <td className="text-center">{pc.soTietThucTe}</td>
                        <td className="text-center">
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEditPhanCong(pc)}
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeletePhanCong(pc.id)}
                          >
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">Chưa có phân công</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPhanCongModal} onHide={handleClosePhanCongModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPhanCong ? 'Sửa phân công giảng dạy' : 'Phân công giảng dạy'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitPhanCong}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label>Giảng viên</Form.Label>
                  <Select
                    isClearable
                    isSearchable
                    isDisabled={currentPhanCong}
                    placeholder="Tìm kiếm và chọn giảng viên..."
                    options={(!currentPhanCong ? getAvailableGiangVien() : danhSachGiangVien).map(gv => ({
                      value: gv.id,
                      label: gv.ten
                    }))}
                    value={formPhanCong.id_giang_vien ? {
                      value: formPhanCong.id_giang_vien,
                      label: (() => {
                        const gv = danhSachGiangVien.find(g => g.id === formPhanCong.id_giang_vien);
                        return gv ? gv.ten : '';
                      })()
                    } : null}
                    onChange={(selectedOption) => setFormPhanCong({
                      ...formPhanCong,
                      id_giang_vien: selectedOption ? selectedOption.value : ''
                    })}
                    noOptionsMessage={() => "Không tìm thấy giảng viên"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '38px',
                        border: '1px solid #ced4da',
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: '#6c757d',
                      })
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-4">
                      <Form.Label>Nhóm</Form.Label>
                      <Form.Control
                        type="text"
                        value={formPhanCong.nhom}
                        onChange={handleNhomChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-4">
                      <Form.Label>Loại</Form.Label>
                      <Form.Select
                        value={formPhanCong.loaiNhom}
                        onChange={(e) => handleLoaiNhomChange(e.target.value)}
                      >
                        <option value="">Tất cả</option>
                        <option value="LT">Lý thuyết</option>
                        <option value="BT">Bài tập</option>
                        <option value="TH">Thực hành</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label>Số tiết thực hiện</Form.Label>
                  <Form.Control
                    type="number"
                    value={formPhanCong.soTietThucHien}
                    disabled
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label>Số tiết thực tế</Form.Label>
                  <Form.Control
                    type="number"
                    value={formPhanCong.soTietThucTe}
                    disabled
                  />
                </Form.Group>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClosePhanCongModal}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                {currentPhanCong ? 'Sửa' : 'Thêm'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default MoNhomPhanCong