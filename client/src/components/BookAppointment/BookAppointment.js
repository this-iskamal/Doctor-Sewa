import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BookAppointment.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function BookAppointment() {
  const { id } = useParams();
  const { id1 } = useParams();
  const [namee, setNamee] = useState("");

  const [date, setdate] = useState("");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.0.114:8078/doctor-dashboard/${id1}`)
      .then((res) => {
        setNamee(res.data.name);

        setdate(res.data.date);
      });

  }, [namee, date]);

  const handleviewslotsclick = () => {
    axios
      .get(`http://192.168.0.114:8078/appointment-info/${id1}/${date}`)
      .then((res) => {
        setSlots(res.data.appointments);
      });
  };

  const handletimeslotclick = (t1) => {
    axios
      .post(`http://192.168.0.114:8078/book-now/${id1}/${id}`, { t1, date })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      });
  };

  return (
    <>
      <div className={styles.container1}>
        <ToastContainer />
        {console.log(namee)}
        <h1> {namee}</h1>
        <h2>Date: {date}</h2>
        <button onClick={handleviewslotsclick}>View Slots</button>
        <div className={styles.timeslot}>
          {slots.map((slot) => {
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
              <div
                key={slot._id}
                className={classname}
                id={styles.timebox}
                onClick={() => handletimeslotclick(slot.time)}
              >
                {slot.time}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BookAppointment;
