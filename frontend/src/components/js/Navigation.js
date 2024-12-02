// src/components/Navigation.js
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ Local Storage

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Trang Chủ</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/user-dashboard">Bảng Điều Khiển Người Dùng</Link>
            </li>
            <li>
              <Link to="/admin-dashboard">Bảng Điều Khiển Quản Trị</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Đăng Nhập</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
