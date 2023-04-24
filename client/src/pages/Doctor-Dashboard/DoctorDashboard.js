import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
// import Symptoms from "../../components/Symptoms/Symptoms";
import styles from "./DoctorDashboard.module.css";
// import diseasedata from "../../assets/data/disease-symptoms.json";
import axios from "axios";
import baseurl from '../../assets/baseurl'


function PatientDashboard() {
  const [namee , setNamee ] = useState('')
  const {id} = useParams();
  useEffect(()=>{
    axios.get(`${baseurl}/doctor-dashboard/${id}`).then((res)=>{
      setNamee(res.data.name)
      console.log(res.data.name)
    })
  },[id])



  const navigate = useNavigate();


  const handleprofileclick = () => {
    navigate(`/doctor-dashboard/doctor-user-profile/${id}`);
  };
  const handleviewappointmentclick = () => {
    navigate(`/doctor-dashboard/view-appointments/${id}`);
  };
  const handleedittiming = () => {
    navigate(`/doctor-dashboard/edit-timing/${id}`);
  };
  const handletakehelpclick = () => {
    navigate(`/doctor-dashboard/doctor-take-help/${id}`);
  };
  const handlebuttonclick = () => {
    //
    //
  };


  return (

    <div className={styles.container}>
      <div className={styles.topsection}>
        <h1>Doctor Sewa</h1>
        <p>Hello, {namee}</p>
      </div>
      <div className={styles.navbottom}>
        <div className={styles.leftsection}>
          <ul>
            <button onClick={handlebuttonclick}>click</button>
            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handleviewappointmentclick}>View Appointments</li>
            <li onClick={handleedittiming}>Edit Timing</li>
            <li onClick={handletakehelpclick}>Take Help</li>
          </ul>
        </div>
        <div className={styles.mainsection}>
          
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
