import React,{useState} from "react";
// import Dashboard from "../../components/AdminDashboard/Dashboard";
// import { Routes, Route } from "react-router-dom";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../../components/AdminDashboard/Dashboard";
import AvailableDoctors from "../../components/AdminDashboard/AvailableDoctors";
import Doctors from "../../components/AdminDashboard/Doctors";
import Patients from "../../components/AdminDashboard/Patients";
import VerifiedDoctors from "../../components/AdminDashboard/VerifiedDoctors";
import styles from "./AdminDashboard.module.css";

function AdminDashboard(props) {

  
  const [showdoctors,setShowdoctors]=useState(false);
  const handledoctorsclick = () =>{
   setShowdoctors(true);
   setShowavailabledoctors(false);
   setShowpatients(false);
   setShowdashboard(false);
   setShowverifieddoctors(false)
  }
  const [showavailabledoctors,setShowavailabledoctors]=useState(false);
  const handleavailabledoctorsclick = () =>{
    setShowdoctors(false);
    setShowavailabledoctors(true);
    setShowpatients(false);
    setShowdashboard(false);
    setShowverifieddoctors(false)
  }
  const [showpatients,setShowpatients]=useState(false);
  const handlepatientsclick = () =>{
    setShowdoctors(false);
    setShowavailabledoctors(false);
    setShowpatients(true);
    setShowdashboard(false);
    setShowverifieddoctors(false)
  }
  const [showdashboard,setShowdashboard]=useState(true);
  const handledashboardclick = () =>{
    setShowdoctors(false);
    setShowavailabledoctors(false);
    setShowpatients(false);
    setShowdashboard(true);
    setShowverifieddoctors(false)
  }
  const [showverifieddoctors,setShowverifieddoctors]=useState(false);
  const handleverifieddoctorsclick = () =>{
    setShowdoctors(false);
    setShowavailabledoctors(false);
    setShowpatients(false);
    setShowdashboard(false);
    setShowverifieddoctors(true)
  }
  return (
    <div className={styles.containerA}>
      <div className={styles.headerA}>
        <h3>Admin Portal</h3>
      </div>
      <div className={styles.sectionA}>
        <div className={styles.leftsideA}>
          <div className={styles.dashboardA} onClick={handledashboardclick}>Dashboard</div>
          <div className={styles.dashboardA} onClick={handledoctorsclick}>Doctors</div>
          <div className={styles.dashboardA} onClick={handleavailabledoctorsclick}>Available Doctors</div>
          <div className={styles.dashboardA} onClick={handlepatientsclick}>Patients</div>
          <div className={styles.dashboardA} onClick={handleverifieddoctorsclick}>Verfy Doctors</div>
        </div>
        <div className={styles.mainbodyA}>
        {showdoctors ? <Doctors /> : null}
        {showdashboard ? <Dashboard /> : null}
        {showavailabledoctors ? <AvailableDoctors /> : null}
        {showpatients ? <Patients /> : null}
        {showverifieddoctors ? <VerifiedDoctors /> : null}
        </div>
      </div>

    </div>
  );
}
export default AdminDashboard;
