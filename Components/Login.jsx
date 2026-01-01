import React, { useState } from "react";
import { FaUserShield, FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username) {
      toast.error("All fields are required!");
      return;
    }

    if (!password) {
      toast.error("Enter Currect Password...");
      return;
    }

    try {
      const sendData = new FormData();
      sendData.append("userName", username);
      sendData.append("password", password);

      const response = await axios.post("http://localhost:8080/api/admin/login", sendData);

      if (response.status === 200 || response.status === 201) {
        toast.success("✅ Login Successful");
        setFormData({ username: "", password: "" });
        setTimeout(() => navigate("/home"), 1200);
      }
    } catch (err) {
      toast.error("❌ Invalid Username or Password!");
    }
  };

  return (
    <div className="login-page">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="login-card">
        <div className="login-header">
          <FaUserShield className="admin-icon" />
          <h2>Admin Login</h2>
          <p>Students Course Dashboard Access</p>
        </div>

        <form onSubmit={handleLoginSubmit}>
          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="login-btn">Login</button>

          <div className="login-links">
            <a onClick={() => navigate("/register")}>Create Account</a>
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
