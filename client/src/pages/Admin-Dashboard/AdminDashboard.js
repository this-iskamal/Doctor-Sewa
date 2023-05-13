// import React from "react";
// // import Dashboard from "../../components/AdminDashboard/Dashboard";
// // import { Routes, Route } from "react-router-dom";
// // import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Dashboard from "../../components/AdminDashboard/Dashboard";
// // import baseurl from '../../assets/baseurl'

// import styles from "./AdminDashboard.module.css";

// function AdminDashboard(props) {
//   const handledoctorsclick = () => {
//     window.open("/admin-dashboard/doctor-list", "_self");
//   };

//   const handleavailabledoctorsclick = () => {
//     window.open("/admin-dashboard/available-doctor-list", "_self");
//   };

//   const handlepatientsclick = () => {
//     window.open("/admin-dashboard/patient-list", "_self");
//   };

//   const handledashboardclick = () => {
//     window.open("/admin-dashboard", "_self");
//   };

//   const handleverifieddoctorsclick = () => {
//     window.open("/admin-dashboard/verify-doctor-list", "_self");
//   };
//   return (
//     <div className={styles.containerA}>
//       <div className={styles.headerA}>
//         <h3>Admin Portal</h3>
//       </div>
//       <div className={styles.sectionA}>
//         <div className={styles.leftsideA}>

//             <div className={styles.dashboardA} onClick={handledashboardclick}>
//               Dashboard
//             </div>
//             <div className={styles.dashboardA} onClick={handledoctorsclick}>
//               Doctors
//             </div>
//             <div
//               className={styles.dashboardA}
//               onClick={handleavailabledoctorsclick}
//             >
//               Available Doctors
//             </div>
//             <div className={styles.dashboardA} onClick={handlepatientsclick}>
//               Patients
//             </div>
//             <div
//               className={styles.dashboardA}
//               onClick={handleverifieddoctorsclick}
//             >
//               Verify Doctors
//             </div>

//         </div>

//         <div className={styles.mainbodyA}>
//           <Dashboard />
//         </div>
//       </div>
//     </div>
//   );
// }
// export default AdminDashboard;

import React, { useState } from "react";
import Dashboard from "../../components/AdminDashboard/Dashboard";
import styles from "./AdminDashboard.module.css";

function AdminDashboard(props) {
  const [showMenu, setShowMenu] = useState(false);

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
  const handleverifyappointmentsclick = () =>{
    window.open('/admin-dashboard/verify-appointments','_self')
  }

  return (
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
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
