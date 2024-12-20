import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import logo from "../img/pngwing.com.png";
import "../img/post.jpg";
import "../css/Landingpage.css";
import "../css/user.css";
import "../css/footer.css";
import "../../services/css/book_ticket.css";
import { useNavigate } from "react-router-dom";
import userImage from "../img/user.png";
import { LocationInput } from "../../components/js/locationComponent.js";
import { authService } from "../../services/auth.js";

const Landingpage = () => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    window.location.href = "/login";
  };

  const handleserviceClick = () => {
    navigate("/package_service");
  };

  const handleBookingClick = () => {
    window.location.href = "/booking";
  };
  const [activeTab, setActiveTab] = useState("flight"); // Khởi tạo state cho tab
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Cập nhật tab hiện tại
  };

  const handleAboutClick = () => {
    window.location.href = "/about";
  };

  const handleExploreClick = () => {
    window.location.href = "/explore";
  };

  const [locations, setLocations] = useState({
    fromLocation: "",
    toLocation: "",
  });

  const handleFromLocationSelect = (location) => {
    setLocations((prevLocations) => ({
      ...prevLocations,
      fromLocation: location,
    }));
  };

  const handleToLocationSelect = (location) => {
    setLocations((prevLocations) => ({
      ...prevLocations,
      toLocation: location,
    }));
  };
  const handleSearchFlights = () => {
    const { fromLocation, toLocation } = locations;
    const url = `/flights?from=${fromLocation}&to=${toLocation}`;
    // Mở URL trong tab mới
    window.open(url, "_blank");
  };

  // Đăng xuất
  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const [videoOffset, setVideoOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxOffset = window.innerHeight * 0.95; // Tính 95vh
      const scrollY = window.scrollY;
      setVideoOffset(Math.min(scrollY, maxOffset));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //test đăng thông tin
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch bài đăng
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Cập nhật ảnh hiển thị mỗi 3 giây
  useEffect(() => {
    if (posts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
      }, 5000);

      return () => clearInterval(interval); // Clean up khi component bị hủy
    }
  }, [posts]);

  return (
    <div className="landingpage-container">
      <Helmet>
        <title>Sunrise Airlines</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Nội dung */}

      <div className="landingpage-landingpage">
        <div className="post-infor">
          <div className="navbar">
            <div className="logo">
              <div>
                <span>Sunrise Airlines</span>
                {/* <span><br></br>Airline</span> */}
              </div>
              <div>
                <img className="sun" src={logo}></img>
              </div>
            </div>
            <div className="nav-items">
              <a href="#home" className="nav-link">
                Home
              </a>

              <a href="#about" onClick={handleAboutClick} className="nav-link">
                Thông tin hành trình
              </a>

              <a
                href="#explore"
                onClick={handleExploreClick}
                className="nav-link"
              >
                Khám phá
              </a>

              <a
                href="#booking"
                onClick={handleBookingClick}
                className="nav-link"
              >
                Đặt vé
              </a>
            </div>
            <div className="auth-buttons">
              <a
                href="#signin"
                onClick={handleSignInClick}
                className="signin-link"
              >
                Sign In
              </a>
              <a href="#signup" className="signup-link">
                Sign Up
              </a>
            </div>
          </div>

          <div className="post-image">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className={`post-item-img ${
                  index === currentIndex ? "active" : ""
                }`}
              >
                <img src={post.imageUrl} alt="Post" />
                <p className="post-description">{post.description}</p>
              </div>
            ))}
          </div>

          <div className="post-button">
            <button className="post-button-detail">Chi tiết</button>
          </div>
          <div className="flight-booking-container">
            <div className="tabs">
              <button className="tab" onClick={() => handleTabClick("flight")}>
                ✈️ Đặt chuyến bay
              </button>
              <button className="tab" onClick={() => handleTabClick("service")}>
                ➕ Stopover / Gói dịch vụ
              </button>
              <button className="tab" onClick={() => handleTabClick("manage")}>
                📅 Quản lý / Làm thủ tục
              </button>
              <button className="tab" onClick={() => handleTabClick("status")}>
                📍 Trạng thái chuyến bay
              </button>
            </div>

            <div className="booking-options">
              <label>
                <input
                  type="radio"
                  name="flightType"
                  value="Khứ hồi"
                  id="roundTripRadio"
                />{" "}
                Khứ hồi
              </label>
              <label>
                <input
                  type="radio"
                  name="flightType"
                  value="Một chiều"
                  id="oneWayRadio"
                />{" "}
                Một chiều
              </label>
              <label>
                <input
                  type="radio"
                  name="flightType"
                  value="Nhiều thành phố"
                  id="multiCityRadio"
                />{" "}
                Nhiều thành phố
              </label>
            </div>

            <div className="booking-form">
              {activeTab === "flight" && (
                <div className="aa">
                  <div className="location-fields">
                    <LocationInput
                      id="fromLocation"
                      placeholder="Từ"
                      onLocationSelect={handleFromLocationSelect}
                      isFrom={true} // Đánh dấu đây là trường "Từ"
                    />
                    <span className="swap-icon">⇆</span>
                    <LocationInput
                      id="toLocation"
                      placeholder="Đến"
                      onLocationSelect={handleToLocationSelect}
                      isFrom={false} // Đánh dấu đây là trường "Đến"
                    />
                  </div>
                  <div className="bottom-book">
                    <div className="date-passenger-container">
                      <div className="date-fields">
                        <div className="date-field">
                          <label>Ngày đi</label>
                          <input type="date" id="departDate" />
                        </div>
                        <div className="date-field">
                          <label>Ngày về</label>
                          <input type="date" id="returnDate" />
                        </div>
                      </div>

                      <div className="passenger-class-field">
                        <label>Hành khách / Hạng ghế</label>
                        <select id="passengerClass">
                          <option>1 Hành khách Phổ thông</option>
                          <option>2 Hành khách Phổ thông</option>
                          <option>1 Hành khách Hạng thương gia</option>
                        </select>
                      </div>

                      <div className="discount-search-container">
                        <div className="discount-code">
                          <input
                            type="text"
                            placeholder="Mã ưu đãi"
                            id="toLocation"
                          />
                        </div>
                        <button
                          className="search-button"
                          id="searchButton"
                          onClick={handleSearchFlights}
                        >
                          Tìm chuyến bay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "service" && (
                <div>
                  <div className="location-fields">
                    <input type="text" placeholder="Từ" id="fromLocation" />
                    <span className="swap-icon" id="swapIcon">
                      ⇆
                    </span>
                    <input type="text" placeholder="Đến" id="toLocation" />
                  </div>

                  <div className="date-passenger-container">
                    <div className="stopover">
                      <div className="date-fields">
                        <div className="date-field">
                          <label>Ngày đi</label>
                          <input type="date" id="departDate" />
                        </div>
                        <div className="date-field">
                          <label>Ngày về</label>
                          <input type="date" id="returnDate" />
                        </div>
                      </div>

                      <div className="passenger-class-field">
                        <label>Hành khách / Hạng ghế</label>
                        <select id="passengerClass">
                          <option>1 Hành khách Phổ thông</option>
                          <option>2 Hành khách Phổ thông</option>
                          <option>1 Hành khách Hạng thương gia</option>
                        </select>
                      </div>

                      <div class="form-group">
                        <label for="passengers">Hành khách / Phòng</label>
                        <input
                          type="text"
                          id="passengers"
                          placeholder="2 Hành khách, 1 phòng"
                        />
                      </div>

                      <div className="discount-search-container">
                        <div className="discount-code">
                          <input
                            type="text"
                            placeholder="Mã ưu đãi"
                            id="toLocation"
                          />
                        </div>
                        <button className="search-button" id="searchButton">
                          Tìm chuyến bay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "manage" && (
                <div>
                  <div className="location-fields">
                    <input
                      type="text"
                      placeholder="Số mã đặt chỗ"
                      id="LocationID"
                    />
                    <button className="search-button" id="">
                      Truy xuất vé
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "status" && (
                <div>Content for Trạng thái chuyến bay</div>
              )}
            </div>
          </div>
        </div>

        <div className="place-list">
          {/* Place */}
          <div className="heading">
            <p>Những điểm đến hấp dẫn</p>
          </div>
          {/* Place image */}
          <div className="place">
            {/* Place image 1 */}
            <div className="place-image">
              <a href="#">
                <img
                  className="img-big"
                  src="https://travel.usnews.com/dims4/USNEWS/abd9e30/2147483647/resize/976x652%5E%3E/crop/976x652/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FMaldives-GettyImages-graphixel_mxYIcpF.jpg"
                  alt="Beautiful Place"
                />
                <span>Maldives</span>
              </a>
              <button className="book-button">Đặt vé</button>
            </div>
            {/* Place image 2 */}
            <div className="place-image">
              <a href="#">
                <img
                  className="img-small"
                  src="https://travel.usnews.com/dims4/USNEWS/4ef5ab1/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2Fmain_image_2017_getty_resized_445x280_lr3LLEU.jpg"
                  alt="Beautiful Place"
                />
                <span>Phuket</span>
              </a>
              <button className="book-button">Đặt vé</button>
            </div>
            {/* Place image 3 */}
            <div className="place-image">
              <a href="#">
                <img
                  className="img-small"
                  src="https://travel.usnews.com/dims4/USNEWS/a600cb2/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2Ftahiti_main_getty_samantha_t_photography_edited_445x280_v43QKbF.jpg"
                  alt="Beautiful Place"
                />
                <span>Tahiti</span>
              </a>
              <button className="book-button">Đặt vé</button>
            </div>
            {/* Place image 4 */}
            <div className="place-image">
              <a href="#">
                <img
                  className="img-big"
                  src="https://travel.usnews.com/dims4/USNEWS/d534628/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FTokyo-GettyImages-Jackyenjoyphotography_vj34vhs.jpg"
                  alt="Beautiful Place"
                />
                <span>Tokyo</span>
              </a>
              <button className="book-button">Đặt vé</button>
            </div>
            {/* Place image 5 */}
            <div className="place-image">
              <a href="#">
                <img
                  className="img-small"
                  src="https://travel.usnews.com/dims4/USNEWS/155aaa2/2147483647/resize/976x652%5E%3E/crop/976x652/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FGeorge_PachantourisCity-center-square-buildings-flowers-sky-sunset.jpg"
                  alt="Beautiful Place"
                />
                <span>Amsterdam</span>
              </a>
              <button className="book-button">Đặt vé</button>
            </div>
            {/* Place image 6 */}
            <div className="place-image">
              <a href="#">
                <img
                  className="img-small"
                  src="https://travel.usnews.com/dims4/USNEWS/8c65c6b/2147483647/resize/976x652%5E%3E/crop/976x652/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FParc_Guell_Gatsi_Getty.jpg"
                />
                <span>Barcelona</span>
              </a>
              <button className="book-button">Đặt vé</button>
            </div>
          </div>
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

export default Landingpage;