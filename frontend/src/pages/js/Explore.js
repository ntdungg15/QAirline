import React from "react";
import "../css/Explore.css";

const Explore = () => {
  return (
    <div className="explore-container">
      <h1>Khám phá</h1>
      <div className="grid-container">
        <div className="section">
          <h2>Hướng dẫn mua vé & thanh toán</h2>
          <p>
            Thông tin chi tiết về các bước đặt vé máy bay và cách thanh toán an toàn, nhanh chóng.
          </p>
        </div>
        <div className="section">
          <h2>Mua vé & Quản lý đặt chỗ</h2>
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
    </div>
  );
};

export default Explore;