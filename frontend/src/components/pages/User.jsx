import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const User = () => {
  const [data, setData] = useState([]);
  const [giangVienList, setGiangVienList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    giangVien: null,
  });

  useEffect(() => {
    fetchData();
    fetchGiangVien();
  }, []);
  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/user");
    setData(res.data);
  };
  const fetchGiangVien = async () => {
    const res = await axios.get("http://localhost:8080/giangVien");
    setGiangVienList(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      giangVien: formData.giangVien ? { id: formData.giangVien } : null,
    };
    if (currentItem) {
      await axios.put(`http://localhost:8080/user/${currentItem.id}`, payload);
    } else {
      await axios.post("http://localhost:8080/user", payload);
    }
    fetchData();
    setShowModal(false);
    setCurrentItem(null);
    setFormData({ username: "", password: "", giangVien: null });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa?")) {
      await axios.delete(`http://localhost:8080/user/${id}`);
      fetchData();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>User</h2>
        <Button
          onClick={() => {
            setShowModal(true);
            setCurrentItem(null);
            setFormData({ username: "", password: "", giangVien: null });
          }}
        >
          Thêm mới
        </Button>
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>Username</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.username}</td>
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
                      username: item.username,
                      password: item.password,
                      giangVien: item.giangVien?.id || null,
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
          <Modal.Title>{currentItem ? "Sửa" : "Thêm"} user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giảng viên</Form.Label>
              <Form.Select
                value={formData.giangVien || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    giangVien: e.target.value ? Number(e.target.value) : null,
                  })
                }
              >
                <option value="">-- Không chọn --</option>
                {giangVienList.map((gv) => (
                  <option key={gv.id} value={gv.id}>
                    {gv.ten} (ID: {gv.id})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button type="submit">
              {currentItem ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Username:</b> {currentItem?.username}
          </div>
          <div>
            <b>Giảng viên:</b>{" "}
            {currentItem?.giangVien
              ? `${currentItem.giangVien.ten} (ID: ${currentItem.giangVien.id})`
              : ""}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default User;
