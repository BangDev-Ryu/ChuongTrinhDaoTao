import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ChucDanh = () => {
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
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Fetch data with React Query
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
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
    mutationFn: (newItem) =>
      axios.post(`${API_BASE}/chucDanh`, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries(["chucDanh"]);
      setShowModal(false);
      reset();
      setError(null);
    },
    onError: (err) => {
      setError(err.response?.data?.message || err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedItem) =>
      axios.put(
        `${API_BASE}/chucDanh/${currentItem.id}`,
        updatedItem
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["chucDanh"]);
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
    mutationFn: (id) => axios.delete(`${API_BASE}/chucDanh/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["chucDanh"]);
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

  const handleEdit = (item) => {
    setCurrentItem(item);
    reset({
      name: item.name,
      description: item.description,
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setCurrentItem(null);
    reset({
      name: "",
      description: "",
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
        <h2>Chức danh</h2>
        <Button onClick={handleAddNew}>Thêm mới</Button>
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
          <Modal.Title>{currentItem ? "Sửa" : "Thêm"} chức danh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                {...register("name", { required: "Tên là bắt buộc" })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control as="textarea" {...register("description")} />
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
