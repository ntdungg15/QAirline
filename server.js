// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();  // Load các biến môi trường từ .env file

const app = express();

app.use(cors());  // Kích hoạt CORS
app.use(bodyParser.json());  // Cho phép xử lý JSON request

// Test route
app.get('/', (req, res) => {
  res.send('QAirline booking system API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
