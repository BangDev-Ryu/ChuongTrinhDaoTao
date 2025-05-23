import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import axios from "axios";

const ChucDanh = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await axios.get("http://localhost:8080/chucDanh");
    setData(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      await axios.put(
        `http://localhost:8080/chucDanh/${currentItem.id}`,
        formData
      );
    } else {
      await axios.post("http://localhost:8080/chucDanh", formData);
    }
    fetchData();
    setShowModal(false);
    setCurrentItem(null);
    setFormData({ name: "", description: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa?")) {
      await axios.delete(`http://localhost:8080/chucDanh/${id}`);
      fetchData();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Chức danh</h2>
        <Button
          onClick={() => {
            setShowModal(true);
            setCurrentItem(null);
            setFormData({ name: "", description: "" });
          }}
        >
          Thêm mới
        </Button>
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
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
                      name: item.name,
                      description: item.description,
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
          <Modal.Title>{currentItem ? "Sửa" : "Thêm"} chức danh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
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
          <Modal.Title>Thông tin chức danh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Tên:</b> {currentItem?.name}
          </div>
          <div>
            <b>Mô tả:</b> {currentItem?.description}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ChucDanh;
