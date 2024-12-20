import React, { useState } from "react";
import "../css/pay.css";

const Pay = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "Sunrise Airline",
    accountNumber: "1234567890",
    bankName: "Ngân hàng BIDV",
    branch: "Chi nhánh Hà Nội",
  });

  const handlePayment = (e) => {
    e.preventDefault();
    if (paymentMethod === "creditCard") {
      console.log("Processing credit card payment:", cardDetails);
      alert("Thanh toán qua thẻ tín dụng thành công!");
    } else if (paymentMethod === "bankTransfer") {
      console.log("Processing bank transfer");
      alert("Vui lòng thực hiện chuyển khoản theo thông tin đã cung cấp.");
    }
  };

  return (
    <div className="pay-container">
      <h1>Thanh Toán</h1>
      <form onSubmit={handlePayment}>
        <div className="payment-method">
          <h2>Chọn phương thức thanh toán</h2>
          <label>
            <input
              type="radio"
              value="creditCard"
              name="paymentMethod"
              checked={paymentMethod === "creditCard"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Thẻ tín dụng/ghi nợ
          </label>
          <label>
            <input
              type="radio"
              value="bankTransfer"
              name="paymentMethod"
              checked={paymentMethod === "bankTransfer"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Chuyển khoản ngân hàng
          </label>
        </div>

        {paymentMethod === "creditCard" && (
          <div className="card-details">
            <h2>Nhập thông tin thẻ</h2>
            <label>
              Số thẻ:
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
                placeholder="1234 5678 9012 3456"
                required
              />
            </label>
            <label>
              Ngày hết hạn:
              <input
                type="text"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                }
                placeholder="MM/YY"
                required
              />
            </label>
            <label>
              CVV:
              <input
                type="password"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
                placeholder="123"
                required
              />
            </label>
          </div>
        )}

        {paymentMethod === "bankTransfer" && (
          <div className="bank-details">
            <h2>Thông tin chuyển khoản</h2>
            <p><strong>Tên chủ tài khoản:</strong> {bankDetails.accountHolder}</p>
            <p><strong>Số tài khoản:</strong> {bankDetails.accountNumber}</p>
            <p><strong>Ngân hàng:</strong> {bankDetails.bankName}</p>
            <p><strong>Chi nhánh:</strong> {bankDetails.branch}</p>
            <p>
              Vui lòng thực hiện chuyển khoản và giữ lại biên lai để đối chiếu.
            </p>
          </div>
        )}

        <button type="submit" className="pay-button">
          Thanh Toán
        </button>
      </form>
    </div>
  );
};

export default Pay;
