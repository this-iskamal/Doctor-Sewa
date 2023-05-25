import React from "react";
import styles from "./DoctorP.module.css";
import profilePicture from "../../assets/images/Bishes.jpg";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

function DoctorP() {
  const { id1, id } = useParams();
  const handletakeappointment = () => {
    window.open(`/book-appointment/${id1}/${id}`, "_self");
  };
  return (
    <div className={styles.profile}>
      <img
        className={styles.profilePicture}
        src={profilePicture}
        alt="Profile"
      />
      <h2>Dr. John Doe</h2>
      <div className={styles.info}>
        <div className={styles.label1}>
          <span className={styles.label}>Age:</span>
          <span className={styles.value}>35</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Gender:</span>
          <span className={styles.value}>Male</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>johndoe@example.com</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Speciality:</span>
          <span className={styles.value}>Cardiology</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Experience:</span>
          <span className={styles.value}>10 years</span>
        </div>
        <div className={styles.label1}> 
          <span className={styles.label}>Phone:</span>
          <span className={styles.value}>123-456-7890</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Address:</span>
          <span className={styles.value}>123 Main Street, City, State</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Education:</span>
          <span className={styles.value}>MD, Cardiology</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Languages:</span>
          <span className={styles.value}>English, Spanish</span>
        </div>
      </div>
      <Button
        variant="primary"
        className={styles.buttonondoctor}
        onClick={() => handletakeappointment()}
      >
        Take Appointment
      </Button>
    </div>
  );
}

export default DoctorP;
