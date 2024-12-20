import React from "react";
import "../css/inforuser.css"; 

const InforUser = () => {
  const user = {
    name: "Nguyễn Tiến Dũng",
    email: "sunrise@gmail.com",
    phone: "111111111111",
    address: "xuan thuy cau giay",
    membership: "Gold Member",
  };

  return (
    <div className="account-info-container">
      <h1 className="account-info-header">Thông Tin Tài Khoản</h1>
      <div className="account-info-card">
        <div className="account-info-row">
          <label className="account-info-label">Họ và tên:</label>
          <span className="account-info-value">{user.name}</span>
        </div>
        <div className="account-info-row">
          <label className="account-info-label">Email:</label>
          <span className="account-info-value">{user.email}</span>
        </div>
        <div className="account-info-row">
          <label className="account-info-label">Số điện thoại:</label>
          <span className="account-info-value">{user.phone}</span>
        </div>
        <div className="account-info-row">
          <label className="account-info-label">Địa chỉ:</label>
          <span className="account-info-value">{user.address}</span>
        </div>
        <div className="account-info-row">
          <label className="account-info-label">Hạng thành viên:</label>
          <span className="account-info-value">{user.membership}</span>
        </div>
      </div>
      <button className="account-info-edit-button">Chỉnh sửa thông tin</button>
    </div>
  );
};

export default InforUser;
