import React, { useState } from 'react';
import '../css/homepage.css';

const Homepage = () => {
    return (
        <div className='homepage'>
            <div className='menu'>
                <nav>
                    <ul className='navbar'>
                        <div className='login'>
                            <input type='button' value="Login"/>
                            </div>
                        <div className='register'>
                        <input type='button' value="register"/>
                        </div>
                    </ul>
                </nav>
            </div>
            <div className='content'>
                {}
            </div>
        </div>
    );
};

export default Homepage;
