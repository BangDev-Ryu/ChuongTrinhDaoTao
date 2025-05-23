import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import ChucDanh from "./components/pages/ChucDanh";
import DeCuongChiTiet from "./components/pages/DeCuongChiTiet";
import GiangVien from "./components/pages/GiangVien";
import HocPhan from "./components/pages/HocPhan";
import KeHoachDayHoc from "./components/pages/KeHoachDayHoc";
import MoNhomPhanCong from "./components/pages/MoNhomPhanCong";
import ThongTinChung from "./components/pages/ThongTinChung";
import User from "./components/pages/User";
import VienChuc from "./components/pages/VienChuc";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
