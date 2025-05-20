import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChuongTrinhDaoTao from './components/pages/ChuongTrinhDaoTao';
import HocPhan from './components/pages/HocPhan';
import KhoiKienThuc from './components/pages/KhoiKienThuc';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<ChuongTrinhDaoTao />} />
            <Route path="/HocPhan" element={<HocPhan />} />
            <Route path="/KhoiKienThuc" element={<KhoiKienThuc />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
