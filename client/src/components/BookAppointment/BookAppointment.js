import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import styles from "./BookAppointment.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import baseurl from '../../assets/baseurl'

// import moment from "moment";
import { Modal, Button } from "react-bootstrap";

function BookAppointment() {
  const { id } = useParams();
  const { id1 } = useParams();
  const [namee, setNamee] = useState("");

  const [date, setdate] = useState("");
  const [slots, setSlots] = useState([]);
  const [input, setInput] = useState();
  const [showalert, setShowAlert] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(false);
  const [time, setTime] = useState("")

  useEffect(() => {
    axios
      .get(`${baseurl}/doctor-dashboard/${id1}`)
      .then((res) => {
        setNamee(res.data.name);

        setdate(res.data.date);
      });

  }, [namee, date , id1]);

  const handleviewslotsclick = () => {
    axios
      .get(`${baseurl}/appointment-info/${id1}/${date}`)
      .then((res) => {
        setSlots(res.data.appointments);
      });
  };

  // const handletimeslotclick = (t1) => {
   
  // };

  const handleInput = (input) => {
    
    if (input.trim() === "yes") {
      console.log(time)
    
      axios
      .post(`${baseurl}/book-now/${id1}/${id}`, { time, date })
      .then((res) => {
        if(res.data.success===true){
          toast.success(res.data.message);
          setTimeout(() => {
            window.close();
          }, 2500);
        }
        if(res.data.success===false)toast.warn(res.data.message);
        
      });

      //
      setTimeout(() => {
        setShowAlert(false);
      }, 800);
    } else if (input.trim() === "") {
      setInputInvalid(true);
      setTimeout(() => {
        setInputInvalid(false);
      }, 500);
    } 
    else {
      setInputInvalid(true);
      setTimeout(() => {
        setInputInvalid(false);
      }, 500);
    }

  };
  const showAlert = (tim) => {
    setTime(tim);
    setShowAlert(true);
  };
  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className={styles.container1}>
      <Modal show={showalert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter "yes" to book Appointment :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter yes "
            className={inputInvalid ? styles.shake : ""}
            onChange={(e) => setInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleInput(input)}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>
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
                onClick={() => showAlert(slot.time)}
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
