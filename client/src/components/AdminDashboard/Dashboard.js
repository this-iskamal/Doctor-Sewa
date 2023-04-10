  import React, { useState , useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Dashboard.module.css";

function Dashboard() {
  
  const [patientdetails, setPatientdetails] = useState([]);
  const [doctordetails, setDoctordetails] = useState([]);
  const [patientnumbers, setPatientnumbers] = useState();
  const [doctornumbers, setDoctornumbers] = useState();


  useEffect(() => {
    axios.get(`http://192.168.0.114:8078/admin-dashboard`).then((res) => {
      setDoctordetails(res.data.doctordetails);
      setPatientnumbers(res.data.patientnumber)
      setDoctornumbers(res.data.doctornumber)
    });
  }, []);

  useEffect(() => {
    axios.get(`http://192.168.0.114:8078/admin-dashboard`).then((res) => {
      setPatientdetails(res.data.patientdetails);
    });
  },[]);

  const deleteuser = async (id) => {
    try {
      axios
        .delete(`http://192.168.0.114:8078/admin-dashboard/${id}`)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
          }
          if (!res.data.success) {
            toast.success(res.data.message);
          }
        });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };
  const updateuser = async (id)=>{
    try{
      console.log('wait')
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className={styles.containerDA}>
      <ToastContainer />
      <div className={styles.buttoncontainer}>
        
      </div>
      <div className={styles.doctorssections}>
        <h1>List of Doctors : {doctornumbers}</h1>
        {doctordetails.map((doctor) => {
          return (
            <div className={styles.doctorlist} key={doctor._id}>
              <h2> {doctor.name}</h2>
              <div className={styles.editaction}>
                <button className={styles.greenbackground}>
                  <i class="fa-sharp fa-solid fa-user-pen"></i>
                </button>
                <button
                  className={styles.redbackground}
                  onClick={() => deleteuser(doctor._id)}
                >
                  <i class="fa-sharp fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.patientssections}>
        <h1>List of Patients : {patientnumbers}</h1> 
        {patientdetails.map((patient) => {
          return (
            <div className={styles.doctorlist} key={patient.id}>
              <h2> {patient.username}</h2>
              <div className={styles.editaction}>
                <button className={styles.greenbackground}>
                  <i class="fa-sharp fa-solid fa-user-pen"></i>
                </button>
                <button
                  className={styles.redbackground}
                  onClick={() => deleteuser(patient._id)}
                >
                  <i class="fa-sharp fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
