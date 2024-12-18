class Aircraft {
  constructor(data) {
    this.id = data.id;
    this.manufacturer = data.manufacturer;
    this.model = data.model;
    this.totalSeats = data.totalSeats;
    this.seatConfiguration = data.seatConfiguration; // Thông tin về các ghế
  }
}

export default Aircraft;
