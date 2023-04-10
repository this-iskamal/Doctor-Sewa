import React, { useEffect, useState } from "react";
import styles from "./AvailableDoctors.module.css";
import axios from "axios";

function AvailableDoctors() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.114:8078/admin-appointment-info")
      .then((res) => {
        setAppointments(res.data.adminappointmentinfo);
      });
  }, []);

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
  return (
    <div className={styles.containerA}>
      <div className={styles.headerA}>
        <h3>Admin Portal</h3>
      </div>
      <div className={styles.sectionA}>
        <div className={styles.leftsideA}>
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
            Available Doctors
          </div>
          <div className={styles.dashboardA} onClick={handlepatientsclick}>
            Patients
          </div>
          <div
            className={styles.dashboardA}
            onClick={handleverifieddoctorsclick}
          >
            Verfy Doctors
          </div>
        </div>
        <div className={styles.mainbodyA}>
          <div className={styles.appointmentinfo}>
            <h1>Appointments</h1>
            <table>
              <tr>
                <th>Doctor Name</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
              {appointments.map((appointment) => {
                return (
                  <tbody>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.date.slice(0, 10)}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <button>Cancel</button>
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
