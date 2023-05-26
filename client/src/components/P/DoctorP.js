import React from "react";
import styles from "./DoctorP.module.css";
// import profilePicture from "../../assets/images/Bishes.jpg";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import baseurl from "../../assets/baseurl";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function DoctorP() {
  const { id1, id } = useParams();
  const [doctordetails, setDoctordetails] = useState([]);

  const handletakeappointment = () => {
    window.open(`/book-appointment/${id1}/${id}`, "_self");
  };

  useEffect(() => {
    const fetchResults = async () => {
      axios.get(`${baseurl}/get-doctor-details/${id1}`).then((res) => {
        setDoctordetails(res.data.doctordetails);
      });
      
    };
    fetchResults();
  }, [id1]);

  const shouldDisplayButton = id !== 'admin';

  return (
    <div className={styles.profile}>
      <img
        className={styles.profilePicture}
        src={`${baseurl}/${doctordetails.profilePhoto}`     }
        alt="Profile"
      />
      <h2>Dr. {doctordetails?(doctordetails.name):""}</h2>
      <div className={styles.info}>
        <div className={styles.label1}>
          <span className={styles.label}>Age:</span>
          <span className={styles.value}>{doctordetails.age}</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Gender:</span>
          <span className={styles.value}>{doctordetails.gender}</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{doctordetails.email}</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Speciality:</span>
          <span className={styles.value}>{doctordetails.speciality}</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Experience:</span>
          <span className={styles.value}>{doctordetails.experience}</span>
        </div>
        <div className={styles.label1}> 
          <span className={styles.label}>Phone:</span>
          <span className={styles.value}>+977 {doctordetails.phone}</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Address:</span>
          <span className={styles.value}>{doctordetails.address}</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Education:</span>
          <span className={styles.value}>MD, Cardiology</span>
        </div>
        <div className={styles.label1}>
          <span className={styles.label}>Languages:</span>
          <span className={styles.value}>English , Nepali</span>
        </div>
      </div >
      {shouldDisplayButton && (
        <Button
          id="visible"
          variant="primary"
          className={styles.buttonondoctor}
          onClick={handletakeappointment}
        >
          Take Appointment
        </Button>
      )}
    </div>
  );
}

export default DoctorP;
