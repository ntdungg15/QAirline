import React from "react";
import '../../css/Blog.css';
import  bgImg from '../../img/sanvedem.jpg';
import { useNavigate } from "react-router-dom";

const SanVeDem = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <button className="back-button" onClick={() => navigate("/blog/uu-dai")}>
        &#8678; 
      </button>
      
      <article className="blog-container">
        <header>
            <h1>Đêm chưa ngủ, Tranh thủ săn deal</h1>
        </header>
        <section>
            <p><strong>Xin chào, Cú đêm!</strong></p>
            <p>10 giờ đêm rồi bạn còn chưa ngủ, tương tư về những chuyến du lịch biết bao nhiêu cho đủ? Sunrise Airlines mang đến ưu đãi đặc biệt dành riêng cho những "cú đêm" đang trằn trọc lên kế hoạch cho chuyến đi sắp tới của mình. "Đêm chưa ngủ, tranh thủ săn deal" cùng Sunrise Airlines ngay thôi!</p>
        </section>
        <img src={bgImg}></img>
        <section>
            <h2>Ưu đãi tuyệt vời nhất</h2>
            <p><strong>Khung giờ áp dụng:</strong> 10:00 PM - 02:00 AM từ Thứ 6 đến Chủ Nhật hàng tuần - Đừng ngủ quên bạn nhé!</p>
            <p><strong>Nhập mã:</strong> <code>MIDNIGHT</code> - Giảm đến 20%* giá vé cơ bản khi đặt vé từ 01 khách</p>
            <h3>Chi tiết ưu đãi</h3>
            <ul>
                <li><strong>Nội địa:</strong> Giảm 8% giá vé cơ bản/khách/chặng</li>
                <li><strong>Quốc tế:</strong></li>
                <ul>
                    <li>Thời gian bay từ 15/11/2024 đến 31/12/2024: Giảm 20% giá vé cơ bản/khách/chặng</li>
                    <li>Thời gian bay từ 01/01/2025 đến 30/6/2025: Giảm 10% giá vé cơ bản/khách/chặng</li>
                </ul>
            </ul>
            <p><strong>Kênh bán:</strong> Website và ứng dụng di động chính thức của Sunrise Airlines</p>
            <p><strong>Đường bay áp dụng:</strong> Tất cả các đường bay nội địa Sunrise Airlines đang khai thác và đường bay TP. Hồ Chí Minh - Bangkok (SGN-DMK)</p>
        </section>
        <section>
            <h3>Giai đoạn bay áp dụng</h3>
            <ul>
                <li>Ngày khởi hành sau ít nhất 4 ngày kể từ ngày xuất vé</li>
                <li>Giai đoạn bay đến 30/6/2025, loại trừ các giai đoạn cao điểm lễ Tết (**)</li>
                <li><strong>Hạng giá vé áp dụng:</strong> Tất cả các hạng Economy, loại trừ Economy Flex</li>
            </ul>
            <p><em>Áp dụng cho người lớn và trẻ em, không áp dụng cho trẻ sơ sinh dưới 2 tuổi.</em></p>
        </section>
        <section>
            <h3>Chi tiết các giai đoạn cao điểm lễ Tết KHÔNG được áp dụng ưu đãi</h3>
            <h4>Nội địa</h4>
            <table className="blog-table">
                <thead>
                    <tr>
                        <th>Giai đoạn</th>
                        <th>Nhóm 1</th>
                        <th>Nhóm 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tết dương 2025</td>
                        <td>27/12/2024 - 29/12/2024</td>
                        <td>29/12/2024 - 01/01/2025</td>
                    </tr>
                    <tr>
                        <td>Tết âm 2025</td>
                        <td>09/01/2025 - 23/02/2025</td>
                        <td>30/01/2025 - 23/02/2025</td>
                    </tr>
                    <tr>
                        <td>Giỗ tổ Hùng Vương</td>
                        <td>03/4/2025 - 05/4/2025</td>
                        <td>06/4/2025 - 08/4/2025</td>
                    </tr>
                    <tr>
                        <td>30/04 - 01/05/2025</td>
                        <td>30/4/2025 - 02/5/2025</td>
                        <td>03/5/2025 - 05/5/2025</td>
                    </tr>
                </tbody>
            </table>
            <h4>Quốc tế</h4>
            <table className="blog-table">
                <thead>
                    <tr>
                        <th>Giai đoạn</th>
                        <th>Nhóm 1</th>
                        <th>Nhóm 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Giáng sinh/Tết dương 2025</td>
                        <td>24/12/2024 - 05/01/2025</td>
                        <td>24/12/2024 - 05/01/2025</td>
                    </tr>
                    <tr>
                        <td>Tết âm 2025</td>
                        <td>29/01/2025 - 02/02/2025</td>
                        <td>31/01/2025 - 05/02/2025</td>
                    </tr>
                    <tr>
                        <td>30/04 - 01/05/2025</td>
                        <td>28/4/2025 - 02/5/2025</td>
                        <td>01/5/2025 - 05/5/2025</td>
                    </tr>
                </tbody>
            </table>
        </section>
        <section>
            <h3>Lưu ý</h3>
            <ul>
                <li>Mức giảm giá chỉ áp dụng trên giá vé cơ bản, không áp dụng thuế, phí và phụ thu.</li>
                <li>Mọi trường hợp thực hiện thanh toán, xuất vé và thay đổi đặt chỗ sau thời gian triển khai chương trình, ưu đãi không còn hiệu lực.</li>
                <li>Chương trình có thể kết thúc sớm trước thời hạn khi số lượng code khuyến mại của chương trình hết.</li>
            </ul>
        </section>
    </article>

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

export default SanVeDem;
