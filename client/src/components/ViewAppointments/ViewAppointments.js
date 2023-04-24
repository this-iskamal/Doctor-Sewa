import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./ViewAppointments.module.css";

import axios from "axios";

function PatientDashboard() {
  const [namee, setNamee] = useState("");
  const [t1, sett1] = useState("");
  const [t2, sett2] = useState("");
  const [date, setdate] = useState("");
  const [slots, setSlots] = useState([]);

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
    // axios
    //   .get(`http://192.168.0.114:8078/appointment-info/${id}/${date}`)
    //   .then((res) => {
    //     setSlots(res.data.appointments);
    //     console.log(date);
    //   });
  }, [namee, t1, t2, date]);
  const handlerefreshbuttonclick = () =>{
    axios
      .get(`http://192.168.0.114:8078/appointment-info/${id}/${date}`)
      .then((res) => {
        setSlots(res.data.appointments);
        console.log(date)
      });
  }
  // useEffect(() => {
  //   axios
  //     .post(`http://192.168.0.114:8078/appointment-info/${id}`,{namee,date})
  //     .then((res) => {
  //       setSlots(res.data.appointments);
  //     });
  // }, [slots]);

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
          <div className={styles.yourtiming}>
            <h1>Your Timing</h1>
            <h3>{date}</h3>
            <h3>
              {t1} -- {t2}
            </h3>
            <button className={styles.buttonclick} onClick={handlerefreshbuttonclick}>View Slots</button>
          </div>
          <div className={styles.timeslot}>
            {slots?.map((slot) => {
              const now = new Date();
              const slotDate = new Date(slot.date);
              const isPast = slotDate < now;
              const isAvailable = slot.status === "available";
              const classname = isPast
                ? styles.pastslot
                : isAvailable
                ? styles.availableslot
                : styles.occupiedslot;
              return (
                <div key={slot._id} className={classname} id={styles.timebox}>
                  {slot.time }
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
