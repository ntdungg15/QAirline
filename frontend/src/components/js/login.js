import React, { useState } from "react";
import "../css/Login.css";
import { auth } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../../services/auth";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      if (isSignUp) {
        if (!formData.name) {
          setError("Vui lòng nhập tên để đăng ký!");
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError("Mật khẩu và xác nhận mật khẩu không khớp!");
          return;
        }

        // Tạo Firebase auth user trước
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Sau đó tạo user trong backend
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            username: formData.name,
            email: formData.email,
            password: formData.password,
            firebaseUid: userCredential.user.uid, // Thêm Firebase UID
          },
          {
            headers: {
              Authorization: `Bearer ${await userCredential.user.getIdToken()}`,
            },
          }
        );

        if (response.status === 201) {
          console.log("Đăng ký thành công");
          // Sau khi đăng ký thành công, tự động đăng nhập
          await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );
          const user = auth.currentUser;
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/user-dashboard");
          localStorage.setItem("currentPath", "/user-dashboard");
        }
      } else {
        // Đăng nhập vẫn giữ nguyên logic cũ
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        console.log("Đăng nhập thành công");

        // Lấy thông tin user và role
        const user = await authService.getCurrentUser();
        localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin người dùng
        const role = await authService.getUserRole(user.uid);

        if (role === "admin") {
          navigate("/admin-dashboard");
          localStorage.setItem("currentPath", "/admin-dashboard");
        } else {
          navigate("/user-dashboard");
          localStorage.setItem("currentPath", "/user-dashboard");
        }
      }
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.code) {
        // Handle Firebase Auth errors
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email đã được đăng ký");
            break;
          case "auth/wrong-password":
            setError("Sai mật khẩu");
            break;
          case "auth/user-not-found":
            setError("Không tìm thấy tài khoản với email này");
            break;
          case "auth/invalid-email":
            setError("Email không hợp lệ");
            break;
          default:
            setError("Đăng nhập không thành công. Vui lòng thử lại.");
        }
      }
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
    console.log(isSignUp);
    setError("");
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
            <input
              className="input-login"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="input-login"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="input-login"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className="input-login"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button className="button-login" type="submit">
              Sign Up
            </button>
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
            <input
              className="input-login"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="input-login"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="#">Forget Your Password?</a>
            <button className="button-login" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p className="abc">
                Enter your personal details to use all of site features
              </p>
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
