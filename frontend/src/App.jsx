import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThongTinChung from './components/pages/ThongTinChung';
import HocPhan from './components/pages/HocPhan';
import DeCuongChiTiet from './components/pages/DeCuongChiTiet';
import MoNhomPhanCong from './components/pages/MoNhomPhanCong';
import GiangVien from './components/pages/GiangVien';
import KeHoachDayHoc from './components/pages/KeHoachDayHoc';
import VienChuc from './components/pages/VienChuc';
import User from './components/pages/User';
import ChucDanh from './components/pages/ChucDanh';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<ThongTinChung />} />
            <Route path="/HocPhan" element={<HocPhan />} />
            <Route path="/DeCuongChiTiet" element={<DeCuongChiTiet />} />
            <Route path="/KeHoachDayHoc" element={<KeHoachDayHoc />} />
            <Route path="/MoNhomPhanCong" element={<MoNhomPhanCong />} />
            <Route path="/GiangVien" element={<GiangVien />} />
            <Route path="/VienChuc" element={<VienChuc />} />
            <Route path="/User" element={<User />} />
            <Route path="/ChucDanh" element={<ChucDanh />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
