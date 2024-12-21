import React from "react";
import '../../css/Blog.css';
import  bgImg from '../../img/lamthutuctaisanbay1.jpg';
import { useNavigate } from "react-router-dom";

const LamThuTucTaiSanBay = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <button className="back-button" onClick={() => navigate("/blog/lam-thu-tuc")}>
        &#8678; 
      </button>
      <div className="blog-container">
        <h1>Làm thủ tục tại sân bay</h1>
        <p>Để hành trình với Bamboo Airways được bắt đầu suôn sẻ và thuận lợi, Quý khách vui lòng lưu ý một số thông tin dưới đây khi làm thủ tục tại sân bay: </p>
        <img src={bgImg}></img>
        <h2>Hướng dẫn làm thủ tục tại sân bay </h2>
        
        <p><strong>
          Bước 1. Tới quầy làm thủ tục ở sân bay 
        </strong></p>
        <p>
        Tại sân bay, quý khách vui lòng theo dõi bảng điện tử hiển thị thông tin các chuyến bay tại nhà ga hành khách để biết khu vực quầy làm thủ tục chuyến bay của mình. Mỗi hãng hàng không sẽ có khu vực quầy thủ tục khác nhau. Khi tới quầy, nhân viên phục vụ mặt đất sẽ kiểm tra mã đặt chỗ/ vé máy bay và giấy tờ tùy thân của hành khách cùng người đi kèm. Hành lý kí gửi mang theo sẽ được đặt lên băng truyền để cân và vận chuyển riêng.
        </p>
        
        <p><strong>
          Bước 2. Nhận thẻ lên máy bay (Boarding pass) 
        </strong></p>
        <p>
        Sau khi hoàn tất kiểm tra thông tin đặt chỗ và giấy tờ tùy thân của hành khách, nhân viên phục vụ sẽ gửi lại các giấy tờ liên quan kèm thẻ lên tàu bay và hướng dẫn hành khách số cổng lên tàu (gate). 
        </p>
  
        <p><strong>
          Bước 3. Di chuyển tới cổng an ninh của sân bay 
        </strong></p>
        <p>
        Sau khi nhận thẻ lên máy bay, quý khách di chuyển tới cổng an ninh. Tại đây, nhân viên an ninh sân bay sẽ yêu cầu quý khách cởi bỏ các phụ kiện như đồng hồ, giày dép, mũ, thắt lưng, túi xách… để vào 1 chiếc khay và bước qua máy soi chiếu an ninh. 
        </p>
        
        <p><strong>
          Bước 4. Di chuyển tới cửa ra máy bay 
        </strong></p>
        <p>
        Sau khi đã hoàn thành các thủ tục trước chuyến bay, kiểm tra an ninh, hải quan, xuất nhập cảnh, hành khách cần có mặt tại cửa ra máy bay từ 30 đến 40 phút trước giờ khởi hành của chuyến bay. 

        Trong thời gian chờ lên máy bay, hành khách đi hạng Thương gia hoặc đặt mua Voucher sử dụng phòng chờ Thương gia có thể sử dụng dịch vụ tại Phòng chờ Thương gia của Bamboo Airways. 

        Tại thời điểm 15 phút trước giờ khởi hành của chuyến bay, nếu hành khách không có mặt tại cửa ra máy bay, Bamboo Airways sẽ làm các thủ tục liên quan đến việc không thực hiện chuyến bay của hành khách. 
        </p>
        
        <p><strong>
          Bước 5. Lên máy bay
        </strong></p>
        <p>
        Sau khi lên tàu bay, quý khách hãy nhìn số ghế (seat) được ghi trên vé máy bay để di chuyển và tìm đúng vị trí ngồi của mình. Thông thường, ghế sẽ được ghi theo hàng chữ và cột số để bạn dễ tìm kiếm nhất. Đừng quên  cất vali, balo hoặc đồ đạc trên khoang hành lý phía trên đầu sau đó đóng cửa khoang lại và ngồi xuống, thắt dây an toàn, chờ máy bay cất cánh. 
        </p>
        <p><u><em>Lưu ý:</em></u></p>

        <ul>
          <li>Khi chuyến bay thay đổi kế hoạch, thời gian mở quầy, đóng quầy làm thủ tục sẽ được điều chỉnh phù hợp với giờ bay mới. </li>
          <li>Thời gian mở quầy, đóng quầy làm thủ tục tùy thuộc vào quy định của nhà chức trách tại sân bay và từng hãng hàng không. </li>
          <li>Hành khách phải thu xếp thời gian có mặt tại sân bay để đảm bảo hoàn thành các thủ tục chuyến bay, hải quan, an ninh, xuất nhập cảnh đúng giờ. </li>
          <li>Bamboo Airways không chấp nhận vận chuyển hành khách đến làm thủ tục chuyến bay từ sau thời điểm đóng quầy làm thủ tục. </li>
          <li>Bamboo Airways không phải chịu trách nhiệm về các chứng từ vận chuyển và các thủ tục pháp lý liên quan đến việc hành khách không thực hiện chuyến bay do không có mặt tại cửa ra máy bay theo thời gian quy định đã được đề cập ở trên. </li>
        </ul>

        <h2>Thời gian làm thủ tục tại sân bay </h2>
        <p>
          Với mong muốn cung cấp cho khách hàng sự thuận tiện và thoải mái nhất từ khi làm thủ tục cho đến khi hoàn thành chuyến bay, Bamboo Airways đem đến những tiện ích của các dịch vụ làm thủ tục như sau: 
        </p>

        <div>
          <h2>
            Thời gian mở, đóng quầy của các hình thức làm thủ tục
          </h2>
          <table className="blog-table">
            <thead>
              <tr>
                <th>Hình thức làm thủ tục</th>
                <th>Thời gian mở chuyến bay</th>
                <th>Thời gian đóng chuyến so với giờ khởi hành dự kiến</th>
                <th>Chuyến bay nội địa</th>
                <th>Chuyến bay quốc tế</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Làm thủ tục tại quầy Kiosk</td>
                <td>Trong vòng 24 giờ</td>
                <td>– 40 phút</td>
                <td>Áp dụng</td>
                <td>Không áp dụng</td>
              </tr>
              <tr>
                <td>Làm thủ tục trực tuyến</td>
                <td>Trong vòng 24 giờ</td>
                <td>– 60 phút</td>
                <td>Áp dụng</td>
                <td>Không áp dụng</td>
              </tr>
              <tr>
                <td>Làm thủ tục qua thiết bị di động</td>
                <td>Trong vòng 24 giờ</td>
                <td>– 60 phút</td>
                <td>Áp dụng</td>
                <td>Không áp dụng</td>
              </tr>
            </tbody>
          </table>

          <h2>
            Thời gian mở quầy, đóng quầy và đóng cửa khởi hành tại sân bay
          </h2>
          <table className="blog-table">
            <thead>
              <tr>
                <th>Loại chuyến bay</th>
                <th>Thời gian mở quầy</th>
                <th>Thời gian đóng quầy</th>
                <th>Lưu ý khác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chuyến bay nội địa</td>
                <td>– 02 giờ</td>
                <td>– 40 phút</td>
                <td>
                  Đối với khách hạng Business, khách là thành viên thẻ First của Bamboo Club: thời gian đóng quầy là 35 phút trước giờ khởi hành dự kiến.
                </td>
              </tr>
              <tr>
                <td>Chuyến bay quốc tế</td>
                <td>– 03 giờ</td>
                <td>– 50 phút hoặc – 60 phút</td>
                <td>
                  Thông thường, các chuyến bay quốc tế sẽ đóng quầy 50 phút trước giờ khởi hành dự kiến. Tuy nhiên, quầy làm thủ tục cho các chuyến bay của Bamboo Airways tại một số sân bay quốc tế sẽ đóng cửa 60 phút trước giờ khởi hành.
                </td>
              </tr>
            </tbody>
          </table>
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

export default LamThuTucTaiSanBay;
