import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <header>
      <div className={styles.logo}>
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
          <hr/>
          <li>
            <div class="dropdown">
              <a href="/login" className={styles.btn}>
              <i class="fa-regular fa-user"></i>
                 Login
              </a>
            </div>
          </li>
          <li>
          <div class="dropdown">
              <a href="/register" className={styles.btn}>
                SignUp<i class="fa-solid fa-angle-right"></i>
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;