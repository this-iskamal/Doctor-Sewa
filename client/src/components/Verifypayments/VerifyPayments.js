import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from '../../assets/baseurl'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./VerifyPayments.module.css";

function VerifyPayments(props) {
    const [appointments, setAppointments] = useState([]);
    const [patient, setPatient] = useState([]);
  const [doctor,setDoctor] = useState([]);
    
  useEffect(() => {
    axios
      .get(`${baseurl}/admin-appointment-info-verify/${props.id}`)
      .then((res) => {
        setAppointments(res.data.adminappointmentinfo);
        setPatient(res.data.patient)
      setDoctor(res.data.doctor)
      });
  }, [ props.id]);

  const handleviewfile = () =>{
    window.open(`${baseurl}/${appointments.paymentPhoto}`, '_blank', 'noopener');
  }

  const handleselectclick = () =>{
    axios.post(`${baseurl}/select-appointment/${props.id}`)
    .then((res)=>{
      window.location.reload();
    })
    
  }

  const handlerejectclick = () =>{
    axios.post(`${baseurl}/reject-appointment/${props.id}`)
    .then((res)=>{
      toast.success(res.data.message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    })
  }
  const date1 = (appointments.date)? (appointments.date).slice(0,10):"";
  return (
    <>
      <div className={styles.container}>
      <ToastContainer />

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
              src={`${baseurl}/${doctor.profilePhoto}`}
              alt="bishes"
            />
          </div>
          
          <span>{doctor.name}</span>
          <div className={styles.doctoridsection}>
          <p className={styles.job}>Speciality : {doctor.speciality}</p>
          <p className={styles.job}>Patient Name : {patient.username}</p>
          <p className={styles.job}>Appointment For : {date1}</p>
          </div>
          <button onClick={handleviewfile}>View Payment Slip</button>
          <div className={styles.buttonflex}>
          <button onClick={handleselectclick}>Select</button>
          <button onClick={handlerejectclick}>Reject</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyPayments;
