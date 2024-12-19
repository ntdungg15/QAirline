import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>Thông tin hành trình</h1>
      <div className="grid-container">
        <div className="section">
          <h2>Làm thủ tục</h2>
          <p>
            Thông tin về quy trình làm thủ tục, các bước cần thiết và những lưu ý quan trọng khi làm thủ tục tại sân bay.
          </p>
        </div>
        <div className="section">
          <h2>Thông tin hành lý</h2>
          <p>
            Tra cứu thông tin hành lý để biết tổng quan chính sách hành lý của QAirline.
          </p>
        </div>
        <div className="section">
          <h2>Sân bay & Nối chuyến</h2>
          <p>
            Hướng dẫn về các sân bay, cách thức nối chuyến và những điều cần biết khi di chuyển giữa các sân bay.
          </p>
        </div>
        <div className="section">
          <h2>Yêu cầu giấy tờ</h2>
          <p>
            Danh sách các giấy tờ cần thiết khi đi máy bay, bao gồm hộ chiếu, visa và các giấy tờ tùy thân khác.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
