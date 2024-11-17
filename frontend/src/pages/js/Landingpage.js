import React from "react";
import { Helmet } from "react-helmet";
import videoFile from "../img/back.mp4";
import "../css/Landingpage.css";
import "../../services/css/book_ticket.css";
// import { handleserviceClick } from '../../services/js/book_ticket.js';
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    window.location.href = "/login";
  };

  const handleflightClick = () => {
    // window.location.href = '/login';
  };
  const handleserviceClick = () => {
    navigate("/package_service");
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
          <div className="auth-buttons">
            <a onClick={handleSignInClick} className="signin-link">
              Sign In
            </a>
            <a onClick={handleserviceClick} className="signup-link">
              Sign Up
            </a>
          </div>
        </div>
        <div className="flight-booking-container">
          <div className="tabs">
            <button className="tab">✈️ Đặt chuyến bay</button>
            <button className="tab" onClick={handleserviceClick}>
              ➕ Stopover / Gói dịch vụ
            </button>
            <button className="tab">📅 Quản lý / Làm thủ tục</button>
            <button className="tab">📍 Trạng thái chuyến bay</button>
          </div>

          <div className="booking-options">
            <label>
              <input
                type="radio"
                name="flightType"
                value="Khứ hồi"
                id="roundTripRadio"
              />{" "}
              Khứ hồi
            </label>
            <label>
              <input
                type="radio"
                name="flightType"
                value="Một chiều"
                id="oneWayRadio"
              />{" "}
              Một chiều
            </label>
            <label>
              <input
                type="radio"
                name="flightType"
                value="Nhiều thành phố"
                id="multiCityRadio"
              />{" "}
              Nhiều thành phố
            </label>
          </div>

          <div className="booking-form">
            <div className="location-fields">
              <input type="text" placeholder="Từ" id="fromLocation" />
              <span className="swap-icon" id="swapIcon">
                ⇆
              </span>
              <input type="text" placeholder="Đến" id="toLocation" />
            </div>

            <div className="date-passenger-container">
              <div className="date-fields">
                <div className="date-field">
                  <label>Ngày đi</label>
                  <input type="date" id="departDate" />
                </div>
                <div className="date-field">
                  <label>Ngày về</label>
                  <input type="date" id="returnDate" />
                </div>
              </div>

              <div className="passenger-class-field">
                <label>Hành khách / Hạng ghế</label>
                <select id="passengerClass">
                  <option>1 Hành khách Phổ thông</option>
                  <option>2 Hành khách Phổ thông</option>
                  <option>1 Hành khách Hạng thương gia</option>
                </select>
              </div>

              <div className="discount-search-container">
                <div className="discount-code">
                  <a href="#add-code">+ Thêm mã ưu đãi</a>
                </div>
                <button className="search-button" id="searchButton">
                  Tìm chuyến bay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
