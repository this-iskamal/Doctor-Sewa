import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseurl from "../../assets/baseurl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./ViewAppointments.module.css";
import io from "socket.io-client";
const socket = io.connect(`${baseurl}`);

function PatientDashboard() {
  const [namee, setNamee] = useState("");
  const [t1, sett1] = useState("");
  const [t2, sett2] = useState("");
  const [date, setdate] = useState("");
  const [slots, setSlots] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [appid,setAppid]=useState("")
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${baseurl}/doctor-dashboard/${id}`,

    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      setNamee(res.data.name);
      sett1(res.data.timing1);
      sett2(res.data.timing2);
      setdate(res.data.date);
    });
    // axios
    //   .get(`${baseurl}/appointment-info/${id}/${date}`)
    //   .then((res) => {
    //     setSlots(res.data.appointments);
    //     console.log(date);
    //   });
  }, [namee, t1, t2, date, id]);

  useEffect(() => {
    axios.get(`${baseurl}/appointment-info/${id}/${date}`).then((res) => {
      setSlots(res.data.appointments);
    });
  }, [id, date]);

  useEffect(() => {
    socket.on("appointtime", (appointtime) => {
      setSlots(appointtime);
      // window.location.reload()
    });
  }, []);
  useEffect(() => {
    const handleLeftClick = () => {
      setShowOptions(false);
    };

    document.addEventListener('click', handleLeftClick);

    return () => {
      document.removeEventListener('click', handleLeftClick);
    };
  }, []);

  // const handlerefreshbuttonclick = () =>{
  //   axios
  //     .get(`${baseurl}/appointment-info/${id}/${date}`)
  //     .then((res) => {
  //       setSlots(res.data.appointments);
  //       console.log(date)
  //     });
  // }
  // useEffect(() => {
  //   axios
  //     .post(`${baseurl}/appointment-info/${id}`,{namee,date})
  //     .then((res) => {
  //       setSlots(res.data.appointments);
  //     });
  // }, [slots]);

  const navigate = useNavigate();
  const handleContextMenu = (event,id2) => {
    event.preventDefault();
    setPosition({ x: event.pageX, y: event.pageY });
    setShowOptions(true);
    setAppid(id2)
    if(showOptions)
     setShowOptions(!showOptions)
  };

  const handleCloseOptions = () => {
    setShowOptions(false);
  };

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

  const handlebookclick = () =>{
    axios.post(`${baseurl}/doctor-book-slot/${appid}`)
    .then((res)=>{
      toast.success(res.data.message)
      setTimeout(() => {
       
        window.location.reload();
      }, 2000);
    })
  }
  const dates = [];

  slots.map((dateslot) => {
    dates.push(dateslot.date);
    return null;
  });
  const udates = [...new Set(dates)];
  udates.sort();

  return (
    <div className={styles.container}>
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

            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handleviewappointmentclick}>View Appointments</li>
            <li onClick={handleedittiming}>Edit Timing</li>
          
          </ul>
        </div>
        <div className={styles.mainsection}>
          {showOptions && (
            <div
              className={styles.custommenu}
              style={{ left: position.x, top: position.y }}
              onClick={handleCloseOptions}
            >
              <ul>
                <li onClick={handlebookclick}>Book</li>
                </ul>
            </div>
          )}
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
                      // setAppid(slot._id)
                      return (
                        <>
                          <div
                            key={slot._id}
                            className={classname}
                            id={styles.timebox}
                           
                            onContextMenu={handleContextMenu}
                            // onContextMenuCapture={()=>handleContextMenu(slot._id)}
                          >
                            {slot.time}
                          </div>
                        </>
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
    </div>
  );
}

export default PatientDashboard;
