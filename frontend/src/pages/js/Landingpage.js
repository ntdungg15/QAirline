import React from 'react';
import { Helmet } from 'react-helmet';

import '../css/Landingpage.css';
import '../../services/css/book_ticket.css';
const Landingpage = () => {

    const handleSignInClick = () => {
        window.location.href = '/login'; // Chuyển hướng đến trang Sign In

    };

    const handleflightClick = () => {
        // window.location.href = '/login';

    };
    return (
        <div className="landingpage-container">
            <Helmet>
                <title>QAirline</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            </Helmet>
            <div className="landingpage-landingpage">
                <div className="navbar">
                    <div className="logo">Logo</div>
                    <div className="nav-items">
                        <a href="#home" className="nav-link active">Home</a>
                        <a href="#about" className="nav-link">Thông tin hành trình</a>
                        <a href="#hotels" className="nav-link">Khám phá</a>
                        <a href="#flights" onClick={handleflightClick} className="nav-link">Đặt vé</a>
                        {/* <a href="#blog" className="nav-link">Tìm chuyến bay</a> */}
                    </div>
                    <div className="auth-buttons">
                        <a href="#signin" onClick={handleSignInClick} className="signin-link">Sign In</a>
                        <a href="#signup" className="signup-link">Sign Up</a>
                    </div>
                </div>
                <div class="flight-booking-container">
                    <div class="tabs">
                        <button class="tab active">✈️ Đặt chuyến bay</button>
                        <button class="tab">➕ Stopover / Gói dịch vụ</button>
                        <button class="tab">📅 Quản lý / Làm thủ tục</button>
                        <button class="tab">📍 Trạng thái chuyến bay</button>
                    </div>
                    <div class="booking-options">
                        <label><input type="radio" name="flightType" checked /> Khứ hồi</label>
                        <label><input type="radio" name="flightType" /> Một chiều</label>
                        <label><input type="radio" name="flightType" /> Nhiều thành phố</label>
                    </div>
                    <div class="booking-form">
                        <div class="location-fields">
                            <input type="text" placeholder="Từ" />
                            <span class="swap-icon">⇆</span>
                            <input type="text" placeholder="Đến" />
                        </div>
                        <div class="date-fields">
                            <div class="date-field">
                                <label>Ngày đi</label>
                                <span>31 T10 2024</span>
                            </div>
                            <div class="date-field">
                                <label>Ngày về</label>
                                <span>7 T11 2024</span>
                            </div>
                            <div class="passenger-class-field">
                                <label>Hành khách / Hạng ghế</label>
                                <select>
                                    <option>1 Hành khách Phổ thông</option>
                                    <option>2 Hành khách Phổ thông</option>
                                    <option>1 Hành khách Hạng thương gia</option>
                                </select>
                            </div>
                        </div>
                        <div class="discount-code">
                            <a href="dhbhvbhv">+ Thêm mã ưu đãi</a>
                        </div>
                        <button class="search-button">Tìm chuyến bay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landingpage;
