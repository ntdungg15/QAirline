import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src="path_to_logo" alt="QAirline Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Flights</a></li>
                    <li><a href="#">Booking</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
