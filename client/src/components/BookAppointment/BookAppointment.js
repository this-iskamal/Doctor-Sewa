import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BookAppointment.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import baseurl from "../../assets/baseurl";
import io from "socket.io-client";
const socket = io.connect(`${baseurl}`);

// import moment from "moment";

function BookAppointment() {
  const { id } = useParams();
  const { id1 } = useParams();
  const [namee, setNamee] = useState("");

  const [date, setdate] = useState("");
  const [slots, setSlots] = useState([]);
  const [paymentPhoto, setInput] = useState(null);
  const [showalert, setShowAlert] = useState(false);

  const [time, setTime] = useState("");
  const [datess, setDates] = useState("");

  useEffect(() => {
    axios.get(`${baseurl}/doctor-dashboard/${id1}`,

    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      setNamee(res.data.name);

      setdate(res.data.date);
    });
  }, [namee, date, id1]);

  useEffect(() => {
    axios.get(`${baseurl}/appointment-info/${id1}/${date}`).then((res) => {
      setSlots(res.data.appointments);
    });
  }, [date, id1]);
  useEffect(() => {
    socket.on("appointtimee", (appointtime) => {
      setSlots(appointtime);
      // window.location.reload()
    });
  }, []);

  // const handletimeslotclick = (t1) => {

  // };

  const handleInput = (paymentPhoto) => {
    if (paymentPhoto != null) {
      console.log(time);
      const formData = new FormData();
      formData.append('paymentPhoto', paymentPhoto);
      formData.append('time',time);
      formData.append('datess',datess);
      axios
        .post(`${baseurl}/book-now/${id1}/${id}`,formData ,{
          headers:{
            "Content-Type":"multipart/form-data",
          }
        })
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);
            setTimeout(() => {
              window.close();
            }, 2500);
          }
          if (res.data.success === false) toast.warn(res.data.message);
        });

      //
      setTimeout(() => {
        setShowAlert(false);
      }, 800);
    }
    if(paymentPhoto === null){
      toast.warn('Please upload your payment')
    }
  };
  const showAlert = (tim, d1) => {
    setTime(tim);
    setDates(d1);
    setShowAlert(true);
  };
  const handleClose = () => {
    setShowAlert(false);
  };

  const dates = [];

  slots.map((dateslot) => {
    dates.push(dateslot.date);
    return null;
  });
  const udates = [...new Set(dates)];
  udates.sort();


  return (
    <>
      <div className={styles.container1}>
        <Modal show={showalert} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload your payment slip :</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="file"
              name="paymentPhoto"
              accept="image/*"
              onChange={(event)=>setInput(event.target.files[0])}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => handleInput(paymentPhoto)}>
              Book
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />

        <h1>Dr. {namee}</h1>

        {/* <button onClick={handleviewslotsclick}>View Slots</button> */}
        {/* <div className={styles.timeslot}>
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
        </div> */}
        <div className={styles.mainsection}>
          {udates?.map((slotss) => {
            const selecteddata = slotss;
            return (
              <div className={styles.appoint}>
                <h2 style={{ textAlign: "left" }}>
                  Date : {slotss.slice(0, 10)}
                </h2>

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
                    if (selecteddata === slot.date) {
                      return (
                        <div
                          key={slot._id}
                          className={classname}
                          id={styles.timebox}
                          onClick={() => showAlert(slot.time, slot.date)}
                        >
                          {slot.time}
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BookAppointment;
