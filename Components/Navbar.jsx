import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";



function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    toast.warn(
      <div>
        <p style={{ marginBottom: "10px" }}>Are you sure you want to logout?</p>
        <button onClick={confirmLogout} className="toast-yes">Yes</button>
        <button onClick={() => toast.dismiss()} className="toast-no">No</button>
      </div>,
      { autoClose: false }
    );
  };

  const confirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.dismiss();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <>
      <nav className="main-navbar">
        <div className="nav-logo">🎓 AdminPortal</div>

        <ul className="nav-links">
          <li onClick={() => navigate("/home")}>Home</li>
          
          {/* <li onClick={() => navigate("/students")}>Students</li> */}

          <li onClick={() => navigate("/home/students")}>Students</li>


          <li onClick={() => navigate("/staff")}>Teaching Staff</li>
          <li onClick={() => navigate("/courses")}>Courses</li>
          <li onClick={() => navigate("/complaint")}>Complaint Box</li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      <ToastContainer position="top-right" />
    </>
  );
}

export default Navbar;
