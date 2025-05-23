import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

const User = () => {
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
      username: "",
      password: "",
      giangVien: null,
    },
  });

  // Fetch data with React Query
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_BASE}/user`);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        throw err;
      }
    },
  });

  const { data: giangVienList = [] } = useQuery({
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

  // Mutations with React Query
  const createMutation = useMutation({
    mutationFn: (newUser) => {
      const payload = {
        ...newUser,
        giangVien: newUser.giangVien ? { id: newUser.giangVien } : null,
      };
      return axios.post(`${API_BASE}/user`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setShowModal(false);
      reset();
      setError(null);
    },
    onError: (err) => {
      setError(err.response?.data?.message || err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedUser) => {
      const payload = {
        ...updatedUser,
        giangVien: updatedUser.giangVien ? { id: updatedUser.giangVien } : null,
      };
      return axios.put(
        `${API_BASE}/user/${currentItem.id}`,
        payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
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
    mutationFn: (id) => axios.delete(`${API_BASE}/user/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
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

  const handleEdit = (user) => {
    setCurrentItem(user);
    reset({
      username: user.username,
      password: user.password,
      giangVien: user.giangVien?.id || null,
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setCurrentItem(null);
    reset({
      username: "",
      password: "",
      giangVien: null,
    });
    setShowModal(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="container mt-4">
      {/* Error Alert */}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <div className="d-flex justify-content-between mb-3">
        <h2>User</h2>
        <Button onClick={handleAddNew}>Thêm mới</Button>
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
          <Modal.Title>{currentItem ? "Sửa" : "Thêm"} user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                {...register("username", { required: "Username là bắt buộc" })}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", {
                  required: "Password là bắt buộc",
                  minLength: {
                    value: 6,
                    message: "Password phải có ít nhất 6 ký tự",
                  },
                })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giảng viên</Form.Label>
              <Form.Select
                {...register("giangVien", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
              >
                <option value="">-- Không chọn --</option>
                {giangVienList.map((gv) => (
                  <option key={gv.id} value={gv.id}>
                    {gv.ten} (ID: {gv.id})
                  </option>
                ))}
              </Form.Select>
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
              : "Không có"}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default User;
