import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="about-container">
      <button className="back-button" onClick={() => navigate("/blog/lam-thu-tuc")}>
        &#8678;
      </button>
      <h1>Thông tin hành trình</h1>
    </div>
  );
};

export default About;
