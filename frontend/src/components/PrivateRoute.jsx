import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user');
  
  if (!isAuthenticated) {
    return <Navigate to="/DangNhap" />;
  }

  return children;
};

export default PrivateRoute;