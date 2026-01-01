import React, { useState } from "react";
import { FaUserPlus, FaUser, FaPhoneAlt, FaLock, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    const { fullName, phone, username, password } = formData;

    // 🔒 Validation
    if (!fullName || !phone || !username || !password) {
      toast.error("All fields are required!");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Enter a valid 10-digit mobile number!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be minimum 6 characters!");
      return;
    }

    try {
      const sendData = new FormData();
      sendData.append("adminFullName", fullName);
      sendData.append("phoneNumber", phone);
      sendData.append("userName", username);
      sendData.append("password", password);

      const response = await axios.post("http://localhost:8080/api/admin/register", sendData);

      if (response.status === 200 || response.status === 201) {
        toast.success("🎉 Admin Registered Successfully!");
        setFormData({ fullName: "", phone: "", username: "", password: "" });
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      toast.error("❌ Registration Failed!");
    }
  };

  return (
    <div className="register-page">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="register-card">
        <div className="register-header">
          <FaUserPlus className="register-icon" />
          <h2>Admin Registration</h2>
          <p>Create your admin account</p>
        </div>

        <form onSubmit={handleRegistrationSubmit}>
          <div className="input-box">
            <FaUserShield className="input-icon" />
            <input type="text" placeholder="Full Name" name="fullName"
              value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="input-box">
            <FaPhoneAlt className="input-icon" />
            <input type="text" placeholder="Phone Number" name="phone"
              value={formData.phone} onChange={handleChange} />
          </div>

          <div className="input-box">
            <FaUser className="input-icon" />
            <input type="text" placeholder="Username" name="username"
              value={formData.username} onChange={handleChange} />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input type="password" placeholder="Password" name="password"
              value={formData.password} onChange={handleChange} />
          </div>

          <button className="register-btn" type="submit">Register</button>

          <div className="register-links">
            <a href="/">Go To Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
