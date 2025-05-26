import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/layout/Sidebar';
import ThongTinChung from './components/pages/ThongTinChung';
import HocPhan from './components/pages/HocPhan';
import DeCuongChiTiet from './components/pages/DeCuongChiTiet';
import MoNhomPhanCong from './components/pages/MoNhomPhanCong';
import GiangVien from './components/pages/GiangVien';
import User from './components/pages/User';
import KeHoachDayHoc from './components/pages/KeHoachDayHoc';
import DangNhap from './components/pages/DangNhap';
import Layout from './components/layout/Layout';
import PrivateRoute from './components/PrivateRoute';

// Tạo instance của QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/DangNhap';

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/DangNhap" element={<DangNhap />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Layout>
            <ThongTinChung />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/HocPhan" element={
        <PrivateRoute>
          <Layout>
            <HocPhan />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/DeCuongChiTiet" element={
        <PrivateRoute>
          <Layout>
            <DeCuongChiTiet />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/KeHoachDayHoc" element={
        <PrivateRoute>
          <Layout>
            <KeHoachDayHoc />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/MoNhomPhanCong" element={
        <PrivateRoute>
          <Layout>
            <MoNhomPhanCong />
          </Layout>
        </PrivateRoute>
      } />

      <Route path="/User" element={
        <PrivateRoute>
          <Layout>
            <User />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/GiangVien" element={
        <PrivateRoute>
          <Layout>
            <GiangVien />
          </Layout>
        </PrivateRoute>
      } />
      
    </Routes>
  );
}

export default App;
