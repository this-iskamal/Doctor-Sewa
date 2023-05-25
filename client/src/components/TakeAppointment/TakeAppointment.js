import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./TakeAppointment.module.css";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import baseurl from '../../assets/baseurl'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
const socket = io.connect(`${baseurl}`);

function TakeAppointment() {
  const [namee, setNamee] = useState("");
  const [appid, setAppid] = useState("");
  const [input, setInput] = useState();
  const [showalert, setShowAlert] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(false);
  const [showMenu, setShowMenu] = useState(false);


  const [appointmentsdata, setAppointmentsdata] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${baseurl}/patient-dashboard/${id}`,

      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNamee(res.data.name);
        // console.log(res.data.name);
      });
    axios
      .get(`${baseurl}/patient-appointment-info/${id}`)
      .then((res) => {
        setAppointmentsdata(res.data.data);
        // console.log(res.data.message);
      });
  }, [id]);

  const handleInput = (input) => {
    
    if (input.trim() === namee) {
      console.log(namee)
      //cancel appointment garni yeha bata
      axios
        .post(`${baseurl}/patient-cancel-appointment/${appid}`)
        .then((res) => {
          console.log(res.data.message);
          socket.on('adminappointment')
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

  // const handlecancelbuttonclick = () => {};
  const handlebuttonclick = () => {
    //
    navigate(`/patient-dashboard/${id}`);
    //
  };

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
      <button
          className={styles.menuButton}
          onClick={() => setShowMenu(!showMenu)}
        >
          <h1>
            <i class="fa fa-bars"></i>
          </h1>
        </button>
        <div
          className={`${styles.leftsection} ${showMenu ? styles.showMenu : ""}`}
        >
          <ul>
          <li onClick={handlebuttonclick}>Home</li>

            {/* <button onClick={handlebuttonclick}>click</button> */}
            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handlefinddoctorclick}>Find Doctors</li>
            <li onClick={handletakeappointmentclick}>Appointments</li>
            
          </ul>
        </div>
        <div className={styles.mainsection}>
          <h1 style={{ color: "black" }}>Your Appointments</h1>
          {appointmentsdata?.map((appointmentdata) => {
            let value;
            let color;
            if(appointmentdata.isConfirmed===true){
              value='Confirmed';
              color='green';
            }
            if(appointmentdata.isConfirmed===false){
              value='Not Confirmed'
              color='red'
            }
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
                at {appointmentdata.time} is
                <br />
                <h5 style={{backgroundColor:color}}>{value}</h5>
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
