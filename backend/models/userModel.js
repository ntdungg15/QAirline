class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password; // Lưu ý: cần hash mật khẩu
    this.role = "user"; // 'customer' hoặc 'admin'
    this.bookings = data.bookings || []; // Danh sách các booking ID
  }
}

export default User;
