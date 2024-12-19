import React from "react";
import "../css/Explore.css";

const Explore = () => {
  return (
    <div className="explore-container">
      <h1>Khám phá</h1>
      <div className="grid-container">
        <div className="section">
          <h2>Mua vé & thanh toán</h2>
          <p>
            Thông tin chi tiết về các bước đặt vé máy bay và cách thanh toán an toàn, nhanh chóng.
          </p>
        </div>
        <div className="section">
          <h2>Quản lý đặt chỗ</h2>
          <p>
            Tìm hiểu cách mua vé, thay đổi thông tin đặt chỗ và các tùy chọn khác.
          </p>
        </div>
        <div className="section">
          <h2>Điều kiện giá</h2>
          <p>
            Tham khảo các điều kiện giá vé của QAirline bao gồm hoàn vé, đổi vé, và các quy định khác.
          </p>
        </div>
        <div className="section">
          <h2>Dịch vụ bổ trợ</h2>
          <p>
            Tìm hiểu về các dịch vụ bổ trợ như chọn ghế ngồi, suất ăn đặc biệt, và nhiều lựa chọn khác.
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

export default Explore;