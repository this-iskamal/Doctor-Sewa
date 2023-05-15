import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./VerifyAppointments.module.css";

// import { useNavigate } from "react-router-dom";
import baseurl from "../../assets/baseurl";
// import io from 'socket.io-client';
// const socket = io.connect(`${baseurl}`);
import VerifyPayments from "../Verifypayments/VerifyPayments";
//import DoctorProfile from "../DoctorProfile/DoctorProfile";
// import App from "../../App";

function VerifyAppointments() {
  // const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  const [id, setId] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const [showdoctorprofilepeding, setShowdoctorprofilepending] =
    useState(false);

  useEffect(() => {
    axios.get(`${baseurl}/admin-appointment-info-verify`).then((res) => {
      setAppointments(res.data.adminappointmentinfo);
    });
  }, []);

  const handlereviewclick = (idd) => {
    setId(idd);
    setShowdoctorprofilepending(!showdoctorprofilepeding);
  };

  const handledoctorsclick = () => {
    window.open("/admin-dashboard/doctor-list", "_self");
  };

  const handleavailabledoctorsclick = () => {
    window.open("/admin-dashboard/available-doctor-list", "_self");
  };

  const handlepatientsclick = () => {
    window.open("/admin-dashboard/patient-list", "_self");
  };

  const handledashboardclick = () => {
    window.open("/admin-dashboard", "_self");
  };

  const handleverifieddoctorsclick = () => {
    window.open("/admin-dashboard/verify-doctor-list", "_self");
  };
  const handleverifyappointmentsclick = () => {
    window.open("/admin-dashboard/verify-appointments", "_self");
  };

  return (
    <>
      {showdoctorprofilepeding ? <VerifyPayments id={id} /> : null}

      <div className={styles.containerA}>
        <div className={styles.headerA}>
          <h3>Admin Portal</h3>
          <button
            className={styles.menuButton}
            onClick={() => setShowMenu(!showMenu)}
          >
            <h1>=</h1>
          </button>
        </div>
        <div className={styles.sectionA}>
          <div
            className={`${styles.leftsideA} ${showMenu ? styles.showMenu : ""}`}
          >
            <div className={styles.dashboardA} onClick={handledashboardclick}>
              Dashboard
            </div>
            <div className={styles.dashboardA} onClick={handledoctorsclick}>
              Doctors
            </div>
            <div
              className={styles.dashboardA}
              onClick={handleavailabledoctorsclick}
            >
              Appointments
            </div>
            <div className={styles.dashboardA} onClick={handlepatientsclick}>
              Patients
            </div>
            <div
              className={styles.dashboardA}
              onClick={handleverifieddoctorsclick}
            >
              Verify Doctors
            </div>
            <div
              className={styles.dashboardA}
              onClick={handleverifyappointmentsclick}
            >
              Verify Appointments
            </div>
          </div>
          <div className={styles.mainbodyA}>
            <div className={styles.tcontainer}>
              <h1>Pending Appointment List</h1>
              <div className={styles.flexlist}>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th>Doctor Name</th>

                    <th>Patient Name</th>
                    <th>Patient Email</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Appointment Taken</th>
                    <th>Action</th>
                  </tr>
                  {appointments &&
                    appointments.map((doctordetail) => {
                      const utcTime = new Date(doctordetail.updatedAt);
                      const nepalTime = new Date(
                        utcTime.getTime() + (5 * 60 + 45) * 60000
                      );
                      const hours = nepalTime.getUTCHours();
                      const minutes = nepalTime.getUTCMinutes();
                      return (
                        <tr>
                          <td>{doctordetail.doctorName}</td>

                          <td>{doctordetail.patientName}</td>
                          <td>{doctordetail.patientEmail}</td>
                          <td>{doctordetail.date.slice(0, 10)}</td>

                          <td>{doctordetail.time}</td>
                          <td>
                            {doctordetail.updatedAt.slice(0, 10)} -- {" "}
                            {hours}:{minutes}
                          </td>

                          <td>
                            <button
                              className={styles.btnverify}
                              onClick={() =>
                                handlereviewclick(doctordetail._id)
                              }
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyAppointments;
