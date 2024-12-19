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
      <footer>
        <div className="email">
          <h1>Đăng Ký Email!</h1>
          <span>
            Đăng ký Email để nhận ngay các thông tin, ưu đãi mới nhất từ Sunrise
            Airline.
          </span>
          <input
            type="email"
            class="email-input"
            placeholder="Nhập email của bạn"
          />
          <button class="submit-button">Đăng Ký</button>
        </div>
        <div class="footer-container">
          <div class="footer-section about">
            <h2>About Us</h2>
            <p>
              Tại Sunrise Airlines, chúng tôi mang đến những trải nghiệm bay
              tuyệt vời và đáng nhớ cho hành khách. Với cam kết chất lượng dịch
              vụ cao cấp và an toàn hàng đầu, chúng tôi luôn đặt sự hài lòng của
              khách hàng lên hàng đầu.
            </p>
          </div>
          <div class="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div class="footer-section contact">
            <h2>Contact Us</h2>
            <ul>
              <li>
                <a href="mailto:info@sportswear.com">
                  sunriseAirline@gmail.com
                </a>
              </li>
              <li>
                <a href="#">0943894676</a>
              </li>
              <li>144 Xuân Thủy, Cầu Giấy, Hà nội , Việt Nam</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">&copy; 2024 | SunriseAirline</div>
      </footer>
    </div>
  );
};

export default About;
