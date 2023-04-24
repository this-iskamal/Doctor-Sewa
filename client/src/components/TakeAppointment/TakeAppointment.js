import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./TakeAppointment.module.css";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TakeAppointment() {
  const [namee, setNamee] = useState("");
  const [appid, setAppid] = useState("");
  const [input, setInput] = useState();
  const [showalert, setShowAlert] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(false);

  const [appointmentsdata, setAppointmentsdata] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://192.168.0.114:8078/patient-dashboard/${id}`)
      .then((res) => {
        setNamee(res.data.name);
        // console.log(res.data.name);
      });
    axios
      .get(`http://192.168.0.114:8078/patient-appointment-info/${id}`)
      .then((res) => {
        setAppointmentsdata(res.data.data);
        // console.log(res.data.message);
      });
  }, []);

  const handleInput = (input) => {
    
    if (input.trim() === namee) {
      console.log(namee)
      //cancel appointment garni yeha bata
      axios
        .post(`http://192.168.0.114:8078/patient-cancel-appointment/${appid}`)
        .then((res) => {
          console.log(res.data.message);
          toast.success(res.data.message)
        });



      //
      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
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
  const showAlert = (iid) => {
    setAppid(iid);
    setShowAlert(true);
  };
  const handleClose = () => {
    setShowAlert(false);
  };

  const navigate = useNavigate();

  const handleprofileclick = () => {
    navigate(`/patient-dashboard/user-profile/${id}`);
  };
  const handlefinddoctorclick = () => {
    navigate(`/patient-dashboard/find-doctors/${id}`);
  };
  const handletakeappointmentclick = () => {
    navigate(`/patient-dashboard/take-appointment/${id}`);
  };
  const handletakehelpclick = () => {
    navigate(`/patient-dashboard/take-help/${id}`);
  };
  const handlecancelbuttonclick = () => {};

  return (
    <div className={styles.container}>
      <Modal show={showalert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your name to cancel appointment :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className={inputInvalid ? styles.shake : ""}
            onChange={(e) => setInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleInput(input)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      <div className={styles.topsection}>
        <h1>Doctor Sewa</h1>
        <p>Hello, {namee}</p>
      </div>
      <div className={styles.navbottom}>
        <div className={styles.leftsection}>
          <ul>
            {/* <button onClick={handlebuttonclick}>click</button> */}
            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handlefinddoctorclick}>Find Doctors</li>
            <li onClick={handletakeappointmentclick}>Take Appointment</li>
            <li onClick={handletakehelpclick}>Take Help</li>
          </ul>
        </div>
        <div className={styles.mainsection}>
          <h1 style={{ color: "black" }}>Your Appointments</h1>
          {appointmentsdata?.map((appointmentdata) => {
            return (
              <div className={styles.appointmentinfosection}>
                You have appointment with <br />
                <span> {appointmentdata.doctorName} </span>
                <br />
                {/* {appointmentdata.patientName} <br /> */}
                on{" "}
                {moment(appointmentdata.date)
                  .utc()
                  .format("dddd ,  DD MMM YYYY")
                  .toString()}{" "}
                <br />
                at {appointmentdata.time}
                <br />
                <Button
                  onClick={() => showAlert(appointmentdata._id)}
                  variant="danger"
                >
                  Cancel
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TakeAppointment;