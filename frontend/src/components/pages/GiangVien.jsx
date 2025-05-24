import React, { useState } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const GiangVien = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [error, setError] = useState(null);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      ten: "",
      chucDanh: null,
      namSinh: "",
    },
  });

  // Fetch data with React Query
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["giangVien"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_BASE}/giangVien`);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        throw err;
      }
    },
  });

  const { data: chucDanhList = [] } = useQuery({
    queryKey: ["chucDanh"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_BASE}/chucDanh`);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        throw err;
      }
    },
  });

  // Mutations with React Query
  const createMutation = useMutation({
    mutationFn: (newGiangVien) => {
      const payload = {
        ...newGiangVien,
        chucDanh: newGiangVien.chucDanh ? { id: newGiangVien.chucDanh } : null,
      };
      return axios.post(`${API_BASE}/giangVien`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["giangVien"]);
      setShowModal(false);
      reset();
      setError(null);
    },
    onError: (err) => {
      setError(err.response?.data?.message || err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedGiangVien) => {
      const payload = {
        ...updatedGiangVien,
        chucDanh: updatedGiangVien.chucDanh
          ? { id: updatedGiangVien.chucDanh }
          : null,
      };
      return axios.put(
        `http://192.168.1.18:8080/giangVien/${currentItem.id}`,
        payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["giangVien"]);
      setShowModal(false);
      reset();
      setCurrentItem(null);
      setError(null);
    },
    onError: (err) => {
      setError(err.response?.data?.message || err.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://192.168.1.18:8080/giangVien/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["giangVien"]);
      setError(null);
    },
    onError: (err) => {
      setError(err.response?.data?.message || err.message);
    },
  });

  const onSubmit = (data) => {
    if (currentItem) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Xác nhận xóa?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (giangVien) => {
    setCurrentItem(giangVien);
    reset({
      ten: giangVien.ten,
      chucDanh: giangVien.chucDanh?.id || null,
      namSinh: giangVien.namSinh,
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setCurrentItem(null);
    reset({
      ten: "",
      chucDanh: null,
      namSinh: "",
    });
    setShowModal(true);
  };

  if (isLoading) return <div className="container mt-4">Loading...</div>;
  if (isError) return <div className="container mt-4">Error loading data</div>;

  return (
    <div className="container mt-4">
      {/* Error Alert */}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <div className="d-flex justify-content-between mb-3">
        <h2>Giảng viên</h2>
        <Button onClick={handleAddNew}>Thêm mới</Button>
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
                  : "Không có"}
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
                  onClick={() => handleEdit(item)}
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(item.id)}
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? "Đang xóa..." : "Xóa"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? "Sửa" : "Thêm"} giảng viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                {...register("ten", { required: "Tên là bắt buộc" })}
                isInvalid={!!errors.ten}
              />
              <Form.Control.Feedback type="invalid">
                {errors.ten?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Chức danh</Form.Label>
              <Form.Select
                {...register("chucDanh", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
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
                {...register("namSinh", {
                  required: "Năm sinh là bắt buộc",
                  min: {
                    value: 1900,
                    message: "Năm sinh phải lớn hơn hoặc bằng 1900",
                  },
                  max: {
                    value: new Date().getFullYear(),
                    message: `Năm sinh không được vượt quá ${new Date().getFullYear()}`,
                  },
                })}
                isInvalid={!!errors.namSinh}
              />
              <Form.Control.Feedback type="invalid">
                {errors.namSinh?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              disabled={createMutation.isLoading || updateMutation.isLoading}
            >
              {currentItem
                ? updateMutation.isLoading
                  ? "Đang cập nhật..."
                  : "Cập nhật"
                : createMutation.isLoading
                ? "Đang thêm..."
                : "Thêm mới"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Modal */}
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
              : "Không có"}
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
