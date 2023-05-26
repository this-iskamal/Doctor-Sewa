import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import baseurl from '../../assets/baseurl'
import { Modal, Button } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
// import DateTimePicker from "react-datetime-picker";
import styles from "./EditTiming.module.css";
import moment from 'moment'
import axios from "axios";

function PatientDashboard() {
  const [namee, setNamee] = useState("");
  const [slots, setSlots] = useState([]);
 const date = '2023-05-25T00:00:00.000+00:00';
 const [showMenu, setShowMenu] = useState(false);
 const [showPrompt, setShowPrompt] = useState(false);
const [cancellationReason, setCancellationReason] = useState('');


  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${baseurl}/doctor-dashboard/${id}`,

      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNamee(res.data.name);
  
      });
  }, [id]);

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
  useEffect(() => {
    axios
      .get(`${baseurl}/appointment-info/${id}/${date}`)
      .then((res) => {
        setSlots(res.data.appointments);
        
      });
  },[date,id]);

  const handleupdataclick = () => {

    if( time.date===""){toast.warn("Enter your date")}
    else if( time.timing1===""){toast.warn("Enter your initial timing")}
    else if( time.timing2===""){toast.warn("Enter your final timing")}
    else{

    axios
      .post(`${baseurl}/doctor-dashboard/timing/${id}`, time)
      .then((res) => {
        toast.success("Timing updated successfully")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        console.log(time);
      });

      
    }
  };
  const dates = [];
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
 
  const handlebuttonclick = () => {
    //
    navigate(`/doctor-dashboard/${id}`);

    //
  };
  slots.map((dateslot) => {
    dates.push((dateslot.date).slice(0,10));
    return null;
  });
  const udates = [...new Set(dates)];
  udates.sort();
console.log(udates)

const [d,sd]=useState('')
const deleteappointment = (date1) => {
  sd(date1)
  setShowPrompt(true);
  
};

const handlePromptSubmit = () => {
  if (cancellationReason.trim() !== '') {
    axios
      .post(`${baseurl}/docor-cancel-appointment/${id}`, { d, reason: cancellationReason })
      .then((res) => {
        if (res.data.success === true) toast.success(res.data.message);
        else toast.warn(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  } else {
    toast.warn('Please enter the cancellation reason');
  }
};
const handlePromptClose = () => {
  setShowPrompt(false);
  setCancellationReason('');
};

  return (
    <div className={styles.container}>
       <Modal show={showPrompt} onHide={handlePromptClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Appointment Cancellation Reason</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={cancellationReason}
          onChange={(e) => setCancellationReason(e.target.value)}
          placeholder="Enter the cancellation reason"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handlePromptClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handlePromptSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
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
            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handleviewappointmentclick}>View Appointments</li>
            <li onClick={handleedittiming}>Edit Timing</li>
          
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
            <h1>Your Appointment Dates</h1>
            {
              udates?.map((date)=>{
                return(
                  <div className={styles.apptime}>
                    
                  <h1> 
                  <button
                  className={styles.redbackground}
                  style={{marginRight:'50px' , background:'none' , backgroundColor:'red'}}
                  onClick={() => deleteappointment(date)}
                >
                  <i class="fa-sharp fa-solid fa-trash"></i>
                </button>
                    {moment(date)
                  
                  .format("dddd ,  DD MMM YYYY")
                  .toString()}  </h1>
                  
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
