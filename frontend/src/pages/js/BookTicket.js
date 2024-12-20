import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/bookTicket.css";

const BookTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const fromLocation = queryParams.get("from");
  const toLocation = queryParams.get("to");
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/flights");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Đã xảy ra lỗi khi tìm kiếm chuyến bay.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    const filtered = flights.filter(
      (flight) => flight.from === fromLocation && flight.to === toLocation
    );
    setFilteredFlights(filtered);
  }, [flights, fromLocation, toLocation]);

  const handleSelectClass = (flight, seatClass) => {
    setSelectedFlight(flight);
    setSelectedClass(seatClass);
  };

  const handleBookTicket = () => {
    if (selectedFlight && selectedClass) {
      const bookingDetails = {
        flight: {
          ...selectedFlight,
          departureTime: selectedFlight.departureTime,
          arrivalTime: selectedFlight.arrivalTime,
          flightNumber: selectedFlight.flightNumber,
          from: selectedFlight.from,
          to: selectedFlight.to,
        },
        seatClass: selectedClass,
        price:
          selectedClass === "economy"
            ? Number(selectedFlight.economySeats.price)
            : Number(selectedFlight.businessSeats.price),
        availableSeats:
          selectedClass === "economy"
            ? selectedFlight.economySeats.available
            : selectedFlight.businessSeats.available,
        // Thêm các thông tin cần thiết
        bookingDate: new Date().toISOString(),
        status: "Active",
        flightId: selectedFlight.id,
      };

      navigate("/user/shopping-cart", {
        state: { bookingDetails },
      });
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="flight-results-container">
      <div className="header-booking">
        <h1>
          Chuyến bay từ {fromLocation} đến {toLocation}
        </h1>
      </div>

      {error && <p className="error-message">{error}</p>}
      {filteredFlights.length > 0 ? (
        <div className="flight-list-container">
          <div className="flight-list">
            {filteredFlights.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div className="flight-info">
                  <div className="flight-times">
                    <div className="departure">
                      <span className="time">{flight.departureTime}</span>
                      <span className="code">{flight.from}</span>
                      <span className="terminal">Sân bay {flight.from}</span>
                    </div>

                    <div className="flight-line">
                      <span className="flight-type">Bay thẳng</span>
                      <div className="dotted-line"></div>
                    </div>

                    <div className="arrival">
                      <span className="time">{flight.arrivalTime}</span>
                      <span className="code">{flight.to}</span>
                      <span className="terminal">Sân bay {flight.to}</span>
                    </div>
                  </div>

                  <div className="flight-details">
                    <div className="duration">
                      <span>Thời gian bay ...</span>
                    </div>
                    <div className="airline">
                      <span>Mã vé: {flight.flightNumber} </span>
                    </div>
                    <a href="#" className="view-details">
                      Xem chi tiết hành trình
                    </a>
                  </div>
                </div>

                <div className="price-cards">
                  <div
                    className={`price-card economy ${
                      selectedFlight?.id === flight.id &&
                      selectedClass === "economy"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleSelectClass(flight, "economy")}
                  >
                    <div className="seats-left">...</div>
                    <div className="class-name">Economy</div>
                    <div className="price-label">từ</div>
                    <div className="price">
                      {Number(flight.economySeats.price).toLocaleString()}
                    </div>
                    <div className="currency">VND</div>
                  </div>

                  <div
                    className={`price-card business ${
                      selectedFlight?.id === flight.id &&
                      selectedClass === "business"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleSelectClass(flight, "business")}
                  >
                    <div className="seats-left">....</div>
                    <div className="class-name">Business</div>
                    <div className="price-label">từ</div>
                    <div className="price">
                      {(
                        Number(flight.businessSeats.price) * 2
                      ).toLocaleString()}
                    </div>
                    <div className="currency">VND</div>
                  </div>
                </div>
                {selectedFlight?.id === flight.id && selectedClass && (
                  <div className="book-ticket-container">
                    <button className="book-ticket" onClick={handleBookTicket}>
                      Tiếp tục đặt vé
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="no-flights">Không tìm thấy chuyến bay nào.</p>
      )}
      <footer class="footer-book-ticket">
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

export default BookTicket;