import React from 'react'
import styles from './Patients.module.css'
import baseurl from '../../assets/baseurl'


function Patients() {
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
          Patient Dashboard
        </div>
      </div>
    </div>
  )
}

export default Patients
