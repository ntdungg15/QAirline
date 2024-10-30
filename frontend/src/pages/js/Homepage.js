import React, { useState } from 'react';
import '../css/homepage.css';
import { Link, useNavigate } from 'react-router-dom';


const Homepage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // Điều hướng đến route /login
    };
    return (

        <header class="header">
            <div class="menu">
                <nav class="nav-links">
                    <a href="#" id="find_flight">Tìm chuyến bay</a>
                    <a href="#" id="book_ticket">Đặt vé</a>
                    <a href="#">Thông tin hành trình</a>
                </nav>
            </div>
            <div class="login_register">
                <a href="#" id="login">Đăng nhập</a>
                <a href="#" id="register">Đăng ký</a>
                <div class="user-icon">👤</div>
            </div>
        </header>
    );
};

export default Homepage;




