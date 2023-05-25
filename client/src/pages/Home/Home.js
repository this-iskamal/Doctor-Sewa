import React from "react";
import styles from "./Home.module.css";

// import baseurl from '../../assets/baseurl'
import doctorpatient from "../../assets/data/doctorpatient.mp4"
// import Header from "../../components/Header/Header";

function Home() {


  return (
    <>
    {/* <Header/> */}
    <div className={styles.container}>
      <video className={styles.video} autoPlay muted loop>
        <source src={doctorpatient} type="video/mp4" />
      </video>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <header>
          <h1 className={styles.title}>Doctor Sewa</h1>
          <p className={styles.subtitle}>Your Online Doctor Appointment System</p>
        </header>
        <main>
          <p className={styles.description}>Welcome to Doctor Sewa, your one-stop solution for booking doctor appointments online. Say goodbye to long waiting times and tedious paperwork!</p>
          <button className={styles.button} onClick={()=>window.open('/register','_self')}>Get Started</button>
        </main>
        <footer>
          <p className={styles.footerText}>© 2023 Doctor Sewa. All rights reserved.</p>
        </footer>
      </div>
    </div>
    </>
  );
}

export default Home;
