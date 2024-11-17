import React, { useState } from "react";
import { Helmet } from "react-helmet";
import videoFile from "../img/back.mp4";
import "../css/Landingpage.css";
import "../../services/css/book_ticket.css";
// import { handleserviceClick } from '../../services/js/book_ticket.js';
import { useNavigate } from "react-router-dom";
import userImage from "../img/user.png";

const Landingpage = () => {
  const navigate = useNavigate();

  const handleflightClick = () => {
    // window.location.href = '/login';
  };
  const [activeTab, setActiveTab] = useState("flight"); // Khởi tạo state cho tab
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Cập nhật tab hiện tại
  };

  return (
    <div className="landingpage-container">
      <Helmet>
        <title>QAirline</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Video nền */}
      <div className="background-video">
        <video autoPlay loop muted playsInline>
          <source src={videoFile} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>

      {/* Nội dung */}
      <div className="landingpage-landingpage">
        <div className="navbar">
          <div className="logo">Logo</div>
          <div className="nav-items">
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#about" className="nav-link">
              Thông tin hành trình
            </a>
            <a href="#hotels" className="nav-link">
              Khám phá
            </a>
            <a href="#flights" onClick={handleflightClick} className="nav-link">
              Đặt vé
            </a>
          </div>
          <div className="account">
            <a href="#acc" className="account-link">
              <img
                src={userImage}
                alt="Avatar"
                className="account-avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              {/* {user.name} */}
            </a>
          </div>
        </div>

        <div className="flight-booking-container">
          <div className="tabs">
            <button className="tab" onClick={() => handleTabClick("flight")}>
              ✈️ Đặt chuyến bay
            </button>
            <button className="tab" onClick={() => handleTabClick("service")}>
              ➕ Stopover / Gói dịch vụ
            </button>
            <button className="tab" onClick={() => handleTabClick("manage")}>
              📅 Quản lý / Làm thủ tục
            </button>
            <button className="tab" onClick={() => handleTabClick("status")}>
              📍 Trạng thái chuyến bay
            </button>
          </div>

          <div className="booking-form">
            {activeTab === "flight" && (
              <div>
                <div className="location-fields">
                  <input type="text" placeholder="Từ" id="fromLocation" />
                  <span className="swap-icon" id="swapIcon">
                    ⇆
                  </span>
                  <input type="text" placeholder="Đến" id="toLocation" />
                </div>

                <div className="trip-type-container">
                  <div className="trip-type">
                    <label>Hành trình</label>
                    <select id="tripType">
                      <option value="one-way">Một chiều</option>
                      <option value="round-trip">Khứ hồi</option>
                    </select>
                  </div>
                </div>
                <div className="date-passenger-container">
                  <div className="date-fields">
                    <div className="date-field">
                      <label>Ngày đi</label>
                      <input type="date" id="departDate" />
                    </div>
                    <div className="date-field">
                      <label>Ngày về </label>
                      <input type="date" id="returnDate" />
                    </div>
                  </div>
                  <div className="passenger-field">
                    <label>Hành khách</label>
                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      id="passengerCount"
                    />
                  </div>
                </div>

                <button className="search-button">Tìm kiếm</button>
              </div>
            )}
            {activeTab === "service" && (
              <div>Content for Stopover / Gói dịch vụ</div>
            )}
            {activeTab === "manage" && (
              <div>Content for Quản lý / Làm thủ tục</div>
            )}
            {activeTab === "status" && (
              <div>Content for Trạng thái chuyến bay</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
