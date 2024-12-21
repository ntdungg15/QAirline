import React from "react";
import { useNavigate } from "react-router-dom";

const UuDai = () => {
  const navigate = useNavigate();
  
  return (
    <div className="uudai-container">
      <button className="back-button" onClick={() => navigate("/explore")}>
        &#8678;
      </button>
      <h1>Ưu đãi</h1>
      
      <div className="grid-container">
        <div className="section">
          <h2 onClick={() => navigate("/blog/san-ve-dem")}>Săn vé đêm, giảm tới 20%</h2>
        </div>
        <div className="section">
          <h2>Mở bán vé Tết chỉ từ 627K/chiều</h2>
        </div>
        <div className="section">
          <h2>
          Giảm 38% cho hội viên khi chọn trước chỗ ngồi
          </h2>
        </div>
        <div className="section">
          <h2>
            Ưu đãi hội viên
          </h2>
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
          <button class="submit1-button">Đăng Ký</button>
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

export default UuDai;
