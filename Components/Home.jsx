import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Students from "./Students";
import "./Home.css";

import {
  FaJava,
  FaReact,
  FaDatabase,
  FaAws,
  FaLayerGroup,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBriefcase
} from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* MAIN HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <div className="home-hero">
                <div className="hero-text">
                  <h1>Full Stack Java Developer Course</h1>
                  <p>
                    Become Industry Ready with Real-Time Projects & Placement
                    Support
                  </p>
                  <button>Enroll Now</button>
                </div>
              </div>

              <section className="stats">
                <div>
                  <FaUserGraduate className="stat-icon" />
                  <h2>35,000+</h2>
                  <p>Students Trained</p>
                </div>
                <div>
                  <FaChalkboardTeacher className="stat-icon" />
                  <h2>15+</h2>
                  <p>Years Teaching Staff</p>
                </div>
                <div>
                  <FaBriefcase className="stat-icon" />
                  <h2>100%</h2>
                  <p>Placement Support</p>
                </div>
              </section>

              <section className="course-section">
                <h2>Technologies You Will Learn</h2>
                <div className="tech-grid">
                  <div><FaJava className="tech-icon" /><p>Core Java</p></div>
                  <div><FaLayerGroup className="tech-icon" /><p>Spring Boot</p></div>
                  <div><FaReact className="tech-icon" /><p>React JS</p></div>
                  <div><FaDatabase className="tech-icon" /><p>MySQL</p></div>
                  <div><FaAws className="tech-icon" /><p>AWS</p></div>
                </div>
              </section>

              <section className="about">
                <h2>Why Choose Our Course?</h2>
                <p>
                  Our Full Stack Java Developer Program is designed to make you
                  industry-ready with real-time projects, modern coding
                  standards, and complete placement assistance. With 15+ years
                  of expert trainers and more than 35,000 successful students,
                  we are a trusted training brand.
                </p>
              </section>
            </>
          }
        />

        {/* STUDENTS PAGE */}
        <Route path="students" element={<Students />} />
      </Routes>
    </>
  );
}

export default Home;
