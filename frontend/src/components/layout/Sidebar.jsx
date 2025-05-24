import React from 'react'
import '../../assets/css/Sidebar.css'
import { Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa thông tin đăng nhập từ localStorage nếu có
    localStorage.removeItem('user');
    // Chuyển hướng về trang đăng nhập
    navigate('/DangNhap');
  }

  return (
    <Nav 
      className="flex-column bg-light p-3 min-vh-100 position-relative" 
      style={{width: '250px'}}
    >

        <Nav.Item> 
            <NavLink 
                to='/'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }>
                <i className="bi bi-house-door me-2"></i>
                Thông tin chung
            </NavLink>
        </Nav.Item>

        <Nav.Item> 
            <NavLink 
                to='/HocPhan'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }>
                <i className="bi bi-book me-2"></i>
                Học phần
            </NavLink>
        </Nav.Item>

        <Nav.Item> 
            <NavLink 
                to='/DeCuongChiTiet'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }>
                <i className="bi bi-file-text me-2"></i>
                Đề cương chi tiết
            </NavLink>
        </Nav.Item>

        <Nav.Item> 
            <NavLink 
                to='/KeHoachDayHoc'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }>
                <i class="bi bi-calendar-event me-2"></i>
                Kế hoạch dạy học
            </NavLink>
        </Nav.Item>
        
        <Nav.Item> 
            <NavLink 
                to='/MoNhomPhanCong'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }>
                <i className="bi bi-calendar-plus me-2"></i>
                Kế hoạch mở nhóm & phân công giảng dạy
            </NavLink>
        </Nav.Item>

        <Nav.Item> 
            <NavLink 
                to='/GiangVien'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }>
                <i className="bi bi-clipboard-check me-2"></i>
                Giảng viên
            </NavLink>
        </Nav.Item>


        <Nav.Item className="mt-auto"> 
          <button 
            onClick={handleLogout}
            className="nav-link d-flex align-items-center p-3 text-danger border-0 bg-transparent w-100"
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Đăng xuất
          </button>
        </Nav.Item>
    </Nav>
  )
}

export default Sidebar