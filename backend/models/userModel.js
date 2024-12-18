class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.role = data.role || "customer"; // 'customer' hoặc 'admin'
    this.bookings = data.bookings || []; // Danh sách các booking ID
  }
}

export default User;
