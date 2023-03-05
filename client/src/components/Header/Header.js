import React from "react";
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="logo">
        <h1>Doctor Sewa</h1>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Doctors</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <div class="dropdown">
              <a href="/login" className="btn">
                Login <i class="fa-solid fa-angle-right"></i>
              </a>
              
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
