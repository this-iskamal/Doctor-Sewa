import React, { useEffect, useState } from "react";
import styles from "./AvailableDoctors.module.css";
import axios from "axios";
import baseurl from "../../assets/baseurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
const socket = io.connect(`${baseurl}`);

function AvailableDoctors() {
  const [appointments, setAppointments] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    axios.get(`${baseurl}/admin-appointment-info`).then((res) => {
      setAppointments(res.data.adminappointmentinfo);
    });
  }, []);

  useEffect(()=>{
    socket.on('adminappointment',adminappointmentinfo=>{
      setAppointments(adminappointmentinfo)
    })
  })

  const handledoctorsclick = () => {
    window.open("/admin-dashboard/doctor-list", "_self");
  };

  const handleavailabledoctorsclick = () => {
    window.open("/admin-dashboard/available-doctor-list", "_self");
  };

  const handlepatientsclick = () => {
    window.open("/admin-dashboard/patient-list", "_self");
  };
  const handleverifyappointmentsclick = () =>{
    window.open('/admin-dashboard/verify-appointments','_self')
  }

  const handledashboardclick = () => {
    window.open("/admin-dashboard", "_self");
  };

  const handleverifieddoctorsclick = () => {
    window.open("/admin-dashboard/verify-doctor-list", "_self");
  };

  const handleappointmentcancel = (appid) =>{
    axios
        .post(`${baseurl}/patient-cancel-appointment/${appid}`)
        .then((res) => {
          console.log(res.data.message);
          toast.success(res.data.message)
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
  }
  
  return (
    <div className={styles.containerA}>
      <div className={styles.headerA}>
      <ToastContainer />
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
          <div className={styles.appointmentinfo}>
            <h1>Appointments</h1>
            <table>
              <tr>
                <th>Doctor Name</th>
                <th>Patient Name</th>
                <th>Taken on</th>
                <th>Appointed For</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
              {appointments.map((appointment) => {
                return (
                  <tbody>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.updatedAt.slice(0,10)}</td>
                    <td>{appointment.date.slice(0, 10)}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <button onClick={()=>handleappointmentcancel(appointment._id)}>Cancel</button>
                    </td>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableDoctors;
