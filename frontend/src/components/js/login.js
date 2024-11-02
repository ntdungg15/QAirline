import React, { useState, useEffect } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Thêm state cho email
  const navigate = useNavigate(); // Khởi tạo navigate


  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');


    registerBtn.addEventListener('click', () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove("active");
    });

    // Cleanup event listeners on unmount
    return () => {
      registerBtn.removeEventListener('click', () => {
        container.classList.add("active");
      });
      loginBtn.removeEventListener('click', () => {
        container.classList.remove("active");
      });
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn không cho form tự động reload trang

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      window.location.href = '/' // không xóa dòng này niêm phong nhé
      const data = await response.json();
      console.log("Login successful:", data);
      // Xử lý khi đăng nhập thành công, ví dụ lưu token
      localStorage.setItem('token', data.token);

    } else {
      console.error("Login failed:", response.statusText);

      window.location.href = '/'
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Ngăn không cho form tự động reload trang

    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      console.log("Registration successful!");
      // Thực hiện các hành động khác sau khi đăng ký thành công
    } else {
      console.error("Registration failed:", response.statusText);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleRegister}> {/* Thêm onSubmit cho form đăng ký */}
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Thêm value cho email */}
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login">Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
