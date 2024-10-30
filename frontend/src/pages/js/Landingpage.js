import React from 'react';
import { Helmet } from 'react-helmet';
import '../css/Landingpage.css';

const Landingpage = () => {
    return (
        <div className="landingpage-container">
            <Helmet>
                <title>exported project</title>
            </Helmet>
            <div className="landingpage-landingpage">
                <div className="navbar">
                    <div className="logo">Logo</div>
                    <div className="nav-items">
                        <a href="#home" className="nav-link active">Home</a>
                        <a href="#about" className="nav-link">About</a>
                        <a href="#hotels" className="nav-link">Hotels & Villas</a>
                        <a href="#flights" className="nav-link">Đặt vé</a>
                        <a href="#blog" className="nav-link">Tìm chuyến bay</a>
                    </div>
                    <div className="auth-buttons">
                        <a href="#signin" className="signin-link">Sign In</a>
                        <a href="#signup" className="signup-link">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landingpage;
