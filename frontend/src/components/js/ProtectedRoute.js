// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/auth";

const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser(); // Lấy thông tin người dùng từ Local Storage

  if (!user) {
    return <Navigate to="/login" />; // Nếu không có người dùng, chuyển hướng về trang đăng nhập
  }

  return children; // Nếu có người dùng, hiển thị nội dung
};

export default ProtectedRoute;
