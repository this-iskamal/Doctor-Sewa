import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from '../../assets/baseurl'

import styles from "./DoctorProfile.module.css";

function DoctorProfile(props) {
  const [doctorprofile, setDoctorprofile] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseurl}/get-pending-doctor-profile/${props.id}`)
      .then((res) => {
        setDoctorprofile(res.data.prendingdoctorlist);
      });
  }, [doctorprofile , props.id]);

  const handleviewfile = () =>{
    window.open(`${baseurl}/${doctorprofile.certificates[0]}`, '_blank', 'noopener');
  }

  const handleselectclick = () =>{
    axios.post(`${baseurl}/select-doctor/${props.id}`)
    .then((res)=>{
      window.location.reload();
    })
    
  }

  const handlerejectclick = () =>{
    axios.delete(`${baseurl}/delete-doctor/${props.id}`)
    .then((res)=>{})
  }
  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.buttonclass}
          onClick={() => window.location.reload()}
        >
          Back
        </button>
        <div className={styles.card}>
          <div className={styles.cardbordertop}></div>
          <div className={styles.img}>
            <img
              src={`${baseurl}/${doctorprofile.profilePhoto}`}
              alt="bishes"
            />
          </div>
          
          <span>{doctorprofile.name}</span>
          <div className={styles.doctoridsection}>
          <p className={styles.job}>Speciality : {doctorprofile.speciality}</p>
          <p className={styles.job}>Age : {doctorprofile.age}</p>
          <p className={styles.job}>Experience : {doctorprofile.experience}</p>
          </div>
          <button onClick={handleviewfile}>View Certificates</button>
          <div className={styles.buttonflex}>
          <button onClick={handleselectclick}>Select</button>
          <button onClick={handlerejectclick}>Reject</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorProfile;
