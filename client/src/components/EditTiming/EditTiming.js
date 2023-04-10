import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import DateTimePicker from "react-datetime-picker";
import styles from "./EditTiming.module.css";

import axios from "axios";

function PatientDashboard() {
  const [namee, setNamee] = useState("");
  const [t1, sett1] = useState("");
  const [t2, sett2] = useState("");
  const [date, setdate] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://192.168.0.114:8078/doctor-dashboard/${id}`)
      .then((res) => {
        setNamee(res.data.name);
        sett1(res.data.timing1);
        sett2(res.data.timing2);
        setdate(res.data.date);
      });
  }, []);

  const [time, setTime] = useState({
    timing1: "",
    timing2: "",
    date: "",
  });

  const handletimingchange = (e) => {
    const { name, value } = e.target;
    setTime({
      ...time,
      [name]: value,
    });
  };

  const handleupdataclick = () => {

    if( time.date===""){toast.warn("Enter your date")}
    else if( time.timing1===""){toast.warn("Enter your initial timing")}
    else if( time.timing2===""){toast.warn("Enter your final timing")}
    else{

    axios
      .post(`http://192.168.0.114:8078/doctor-dashboard/timing/${id}`, time)
      .then((res) => {
        toast.success("Timing updated successfully")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        console.log(time);
      });

      
    }
  };

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
        

          <div className={styles.inputtimings}>
            <input
              type="Date"
              name="date"
              value={time.date}
              onChange={handletimingchange}
            />
            <input
              name="timing1"
              value={time.timing1}
              type="time"
              onChange={handletimingchange}
            />
            <h1>-</h1>
            <input
              name="timing2"
              value={time.timing2}
              type="time"
              onChange={handletimingchange}
            />
            <button onClick={handleupdataclick}>Update</button>
          </div>
          <div className={styles.yourtiming}>
          <ToastContainer />  
            <h1>Your Timing</h1>
            <h3>{date}</h3>
            <h3>
              {t1} -- {t2}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
