import React from 'react'
import '../../assets/css/Sidebar.css'
import { Nav, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Nav 
      className="flex-column bg-light p-3" 
      style={{width: '250px'}}
    >

        <Nav.Item> 
            <NavLink 
                to='/'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }
            >
                <i className="bi bi-house-door me-2"></i>
                Chương trình đào tạo
            </NavLink>
        </Nav.Item>

        <Nav.Item> 
            <NavLink 
                to='/hocphan'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }
            >
                <i className="bi bi-book me-2"></i>
                Học phần
            </NavLink>
        </Nav.Item>

        <Nav.Item> 
            <NavLink 
                to='/decuongchitiet'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }
            >
                <i className="bi bi-file-text me-2"></i>
                Đề cương chi tiết
            </NavLink>
        </Nav.Item>
        
        <Nav.Item> 
            <NavLink 
                to='/kehoachdayhoc'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }
            >
                <i className="bi bi-calendar-check me-2"></i>
                Kế hoạch dạy học
            </NavLink>
        </Nav.Item>

        <Nav.Item> 
            <NavLink 
                to='/kehoachmonhoc'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }
            >
                <i className="bi bi-calendar-plus me-2"></i>
                Kế hoạch mở nhóm
            </NavLink>
        </Nav.Item>

        <Nav.Item> 
            <NavLink 
                to='/phanconggiangday'
                className={({isActive}) => 
                  `nav-link d-flex align-items-center p-3 ${isActive ? 'active' : ''}`
                }
            >
                <i className="bi bi-clipboard-check me-2"></i>
                Phân công giảng dạy
            </NavLink>
        </Nav.Item>
    </Nav>
  )
}

export default Sidebar