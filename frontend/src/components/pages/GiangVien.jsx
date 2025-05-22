import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const GiangVien = () => {
  const [data, setData] = useState([]);
  const [chucDanhList, setChucDanhList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    ten: "",
    chucDanh: null,
    namSinh: "",
  });

  useEffect(() => {
    fetchData();
    fetchChucDanh();
  }, []);
  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/giangVien");
    setData(res.data);
  };
  const fetchChucDanh = async () => {
    const res = await axios.get("http://localhost:8080/chucDanh");
    setChucDanhList(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      chucDanh: formData.chucDanh ? { id: formData.chucDanh } : null,
    };
    if (currentItem) {
      await axios.put(
        `http://localhost:8080/giangVien/${currentItem.id}`,
        payload
      );
    } else {
      await axios.post("http://localhost:8080/giangVien", payload);
    }
    fetchData();
    setShowModal(false);
    setCurrentItem(null);
    setFormData({ ten: "", chucDanh: null, namSinh: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa?")) {
      await axios.delete(`http://localhost:8080/giangVien/${id}`);
      fetchData();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Giảng viên</h2>
        <Button
          onClick={() => {
            setShowModal(true);
            setCurrentItem(null);
            setFormData({ ten: "", chucDanh: null, namSinh: "" });
          }}
        >
          Thêm mới
        </Button>
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Chức danh</th>
            <th>Năm sinh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.ten}</td>
              <td>
                {item.chucDanh
                  ? `${item.chucDanh.name} (ID: ${item.chucDanh.id})`
                  : ""}
              </td>
              <td>{item.namSinh}</td>
              <td>
                <Button
                  size="sm"
                  variant="success"
                  className="me-2"
                  onClick={() => {
                    setCurrentItem(item);
                    setShowViewModal(true);
                  }}
                >
                  Xem
                </Button>
                <Button
                  size="sm"
                  variant="info"
                  className="me-2"
                  onClick={() => {
                    setCurrentItem(item);
                    setFormData({
                      ten: item.ten,
                      chucDanh: item.chucDanh?.id || null,
                      namSinh: item.namSinh,
                    });
                    setShowModal(true);
                  }}
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? "Sửa" : "Thêm"} giảng viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                value={formData.ten}
                onChange={(e) =>
                  setFormData({ ...formData, ten: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Chức danh</Form.Label>
              <Form.Select
                value={formData.chucDanh || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    chucDanh: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="">-- Không chọn --</option>
                {chucDanhList.map((cd) => (
                  <option key={cd.id} value={cd.id}>
                    {cd.name} (ID: {cd.id})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Năm sinh</Form.Label>
              <Form.Control
                type="number"
                value={formData.namSinh}
                onChange={(e) =>
                  setFormData({ ...formData, namSinh: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button type="submit">
              {currentItem ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin giảng viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Tên:</b> {currentItem?.ten}
          </div>
          <div>
            <b>Chức danh:</b>{" "}
            {currentItem?.chucDanh
              ? `${currentItem.chucDanh.name} (ID: ${currentItem.chucDanh.id})`
              : ""}
          </div>
          <div>
            <b>Năm sinh:</b> {currentItem?.namSinh}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default GiangVien;
