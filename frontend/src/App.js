import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/js/login"; // Nhập Login component
import Landingpage from "./pages/js/Landingpage";
import AdminDashboard from "./pages/js/AdminDashboard";
import UserDashboard from "./pages/js/UserDashboard";

import { authService } from "./services/auth";
// import Register from './components/js/register';

const App = () => {
  // Lấy path từ localStorage khi reload
  const savedPath = localStorage.getItem("currentPath") || "/";

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

          {/* Redirect to saved path or home */}
          <Route path="*" element={<Navigate to={savedPath} replace />} />
        </Routes>
      </div>
    </Router>

    // <div className="App">
    //   <Homepage />
    //   <Login />
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <comde>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
};

export default App;
