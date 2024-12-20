import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/js/login"; // Nhập Login component
import Landingpage from "./pages/js/Landingpage";
import AdminDashboard from "./pages/js/AdminDashboard";
import UserDashboard from "./pages/js/UserDashboard";
import BookTicket from "./pages/js/BookTicket";
import ShoppingCart from "./pages/js/ShoppingCart";
import InforUser from "./pages/js/inforUser";

import About from "./pages/js/About";
import Explore from "./pages/js/Explore";
import Booking from "./pages/js/Booking";
import LamThuTuc from "./pages/js/blogs/LamThuTuc";
import ThongTinHanhLy from "./pages/js/blogs/ThongTinHanhLy";
import SanBayNoiChuyen from "./pages/js/blogs/SanBayNoiChuyen";
import YeuCauGiayTo from "./pages/js/blogs/YeuCauGiayTo";
import LamThuTucTrucTuyen from "./pages/js/blogs/LamThuTucTrucTuyen";
import LamThuTucTaiSanBay from "./pages/js/blogs/LamThuTucTaiSanBay";
import Payment from "./components/js/pay";
import FillData from "./components/js/filldata";


import { authService } from "./services/auth";
// import Register from './components/js/register';

const App = () => {
  // Lấy path từ localStorage khi reload
  const savedPath = localStorage.getItem("currentPath") || "/";

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user/book-ticket" element={<BookTicket />} />
          <Route path="user/shopping-cart" element={<ShoppingCart />} />
          {/* Redirect to saved path or home */}
          <Route path="*" element={<Navigate to={savedPath} replace />} />

          <Route path="/infor-user" element={<InforUser />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/booking" element={<Booking />} />

          <Route path="/blog/lam-thu-tuc" element={<LamThuTuc />} />
          <Route path="/blog/thong-tin-hanh-ly" element={<ThongTinHanhLy />} />
          <Route path="/blog/san-bay-noi-chuyen" element={<SanBayNoiChuyen />} />
          <Route path="/blog/yeu-cau-giay-to" element={<YeuCauGiayTo />} />
          <Route path="/blog/lam-thu-tuc-truc-tuyen" element={<LamThuTucTrucTuyen />} />
          <Route path="/blog/lam-thu-tuc-tai-san-bay" element={<LamThuTucTaiSanBay />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/filldata" element={<FillData />} />
        </Routes>
      </div>
    </Router>


  );
};

export default App;