import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Symptoms from "../../components/Symptoms/Symptoms";
import styles from "./DoctorDashboard.module.css";
// import diseasedata from "../../assets/data/disease-symptoms.json";
import axios from "axios";
import baseurl from "../../assets/baseurl";

function PatientDashboard() {
  const [namee, setNamee] = useState("");
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [slots, setSlots] = useState([]);
  const date = 1;

  

  useEffect(() => {
    axios
    .get(
      `${baseurl}/doctor-dashboard/${id}`,

      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      setNamee(res.data.name);
      console.log(res.data.name);
      console.log(res.data.token)
    });
  }, [id]);

  useEffect(() => {
    axios.get(`${baseurl}/appointment-info1/${id}/${date}`).then((res) => {
      setSlots(res.data.appointments);
    });
  }, [id, date]);

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

  const dates = [];

  slots.map((dateslot) => {
    dates.push(dateslot.date);
    return null;
  });
  const udates = [...new Set(dates)];
  udates.sort();

  return (
    <div className={styles.container}>
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
          <h1 style={{ color: "black" }}>Appointment Lists</h1>
          {udates?.map((dtaes) => {
            return (
              <div className={styles.infosectionapp}>
                <h3 style={{ width: "fit-content" }}>
                  Date : {dtaes.slice(0, 10)}
                </h3>
                <table>
                  <tr style={{ fontSize: "20px" }}>
                    <th>Patient Name</th>
                    <th>Patient Email</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                  {slots?.map((app) => {
                    if (dtaes === app.date) {
                      let color1 = app.isConfirmed;
                      return (
                        <tr style={{ borderBottom: "1px solid black" }}>
                          <td>{app.patientName}</td>
                          <td>{app.patientEmail}</td>
                          <td>{app.date.slice(0, 10)}</td>
                          <td>{app.time}</td>
                          <td
                            style={{
                              fontSize: "20px",
                              color: color1 ? "green" : "red",
                            }}
                          >
                            <b>{app.isConfirmed ? "Confirmed" : "Pending"}</b>
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
