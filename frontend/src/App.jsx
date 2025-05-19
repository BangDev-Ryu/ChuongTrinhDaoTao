import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChuongTrinhDaoTao from './components/pages/ChuongTrinhDaoTao';
import HocPhan from './components/pages/HocPhan';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<ChuongTrinhDaoTao />} />
            <Route path="/hocphan" element={<HocPhan />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
