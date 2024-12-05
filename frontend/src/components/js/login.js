import React, { useState } from "react";
import "../css/Login.css";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra thông tin đầu vào
    if (!formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      if (isSignUp) {
        // Kiểm tra thêm trường name khi đăng ký
        if (!formData.name) {
          setError("Vui lòng nhập tên để đăng ký!");
          return;
        }

        // Đăng ký
        await authService.register(
          formData.name,
          formData.email,
          formData.password,
          formData.comfirmPassword
        );
        console.log("Đăng ký thành công");
      } else {
        // Đăng nhập
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Đăng nhập thành công");

        // Lấy thông tin user và role
        const user = await authService.getCurrentUser();
        const role = await authService.getUserRole(user.uid);

        // Chuyển hướng dựa trên role
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "user") {
          navigate("/user-dashboard");
        } else {
          setError("Role không hợp lệ");
        }
      }
    } catch (error) {
      console.error("Lỗi:", error.message);
      setError(
        isSignUp
          ? "Đăng ký không thành công. Vui lòng thử lại."
          : "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin."
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(""); // Reset lỗi khi đổi chế độ
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id="container">
      <div className="root-form">
        <div className="form-container sign-up">
          <form onSubmit={handleAuth}>
            <h1>Create Account</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input className="input-login" 
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input className="input-login"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input className="input-login" 
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button className="button-login" type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleAuth}>
            <h1>Sign In</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email password</span>
            <input className="input-login"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input className="input-login"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="#">Forget Your Password?</a>
            <button className="button-login" type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p className="abc">Enter your personal details to use all of site features</p>
              <button className="button-login" onClick={toggleMode}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Sunrise Airlines!</h1>
              <p className="abc">
                Register with your personal details to use all of site features
              </p>
              <button className="button-login" onClick={toggleMode}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
