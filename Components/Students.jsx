import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Students.css";

function Students() {

  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    userFullName: "",
    phoneNumber: "",
    course: ""
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await axios.get("http://localhost:8080/api/user/allUsers");
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("userFullName", form.userFullName);
      fd.append("phoneNumber", form.phoneNumber);
      fd.append("course", form.course);

      const res = await axios.post(
        "http://localhost:8080/api/user/userRegister",
        fd
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Student Registered Successfully");
        setForm({ userFullName: "", phoneNumber: "", course: "" });
        loadStudents();
      }

    } catch (err) {
      toast.error("Registration Failed (400)");
    }
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h1>Students Management</h1>
        <p>Register and manage enrolled students</p>
      </div>

      <div className="students-container">

        <div className="student-form-card">
          <h3>Add Student</h3>
          <form onSubmit={handleSubmit}>

            <input
              name="userFullName"
              value={form.userFullName}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />

            <select name="course" value={form.course} onChange={handleChange}>
              <option value="">Select Course</option>
              <option>Java Full Stack</option>
              <option>Python Full Stack</option>
              <option>Data Science</option>
              <option>Data Engineer</option>
            </select>

            <button>Add Student</button>
          </form>
        </div>

        <div className="students-table-card">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{s.userFullName}</td>
                  <td>{s.phoneNumber}</td>
                  <td>{s.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Students;
