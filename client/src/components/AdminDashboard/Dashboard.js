  import React, { useState , useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styles from "./Dashboard.module.css";
import baseurl from '../../assets/baseurl'
import io from 'socket.io-client';
import { Button } from "react-bootstrap";
const socket = io.connect(`${baseurl}`);


function Dashboard() {
  
  const [patientdetails, setPatientdetails] = useState([]);
  const [doctordetails, setDoctordetails] = useState([]);
  const [patientnumbers, setPatientnumbers] = useState();
  const [doctornumbers, setDoctornumbers] = useState();
  const [adminN, setadminN] = useState();

  const [admin, setAdmin] = useState([]);




  useEffect(() => {
    axios.get(`${baseurl}/admin-dashboard`).then((res) => {
      setPatientdetails(res.data.data);
      setDoctordetails(res.data.data1)
      setPatientnumbers(res.data.dataN)
      setDoctornumbers(res.data.data1N)
      setadminN(res.data.adminN)
      setAdmin(res.data.admindetails)

      
    });
  }, []);

  useEffect(() => {
    socket.on('data',data=>{
      setPatientdetails(data);
    })
    socket.on('data1',data1=>{
      setDoctordetails(data1)
    })
    socket.on('dataN',dataN=>{
      setPatientnumbers(dataN)
      
    })
    socket.on('data1N',data1N=>{
      setDoctornumbers(data1N)

    })
    
  },[]);

  const deleteuser = async (id) => {
    try {
      axios
        .delete(`${baseurl}/admin-dashboard/${id}`)
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
  // const updateuser = async (id)=>{
  //   try{
  //     console.log('wait')
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }

  const handlenewadmin = () =>{
    window.open('/add-new-admin','_blank')
  }

  return (
    <div className={styles.containerDA}>
      <ToastContainer />
      <div className={styles.patientssections}>
        <h1>List of Admins : {adminN}</h1> 
        <Button style={{margin:"3px"}} onClick={handlenewadmin}>Add New Admin</Button>
        {admin.map((patient) => {
         
          
          return (
            <div className={styles.doctorlist} key={patient.id}>
              <h2> {patient.username}</h2>
              <div className={styles.editaction}>
                
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
      
      <div className={styles.doctorssections}>
        <h1>List of Doctors : {doctornumbers}</h1>
        {doctordetails.map((doctor) => {
          return (
            <div className={styles.doctorlist} key={doctor._id}>
              <h2> {doctor.name}</h2>
              <div className={styles.editaction}>
                
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
          if(patient.username==='Admin'){return null}
          else{
          return (
            <div className={styles.doctorlist} key={patient.id}>
              <h2> {patient.username}</h2>
              <div className={styles.editaction}>
               
                <button
                  className={styles.redbackground}
                  onClick={() => deleteuser(patient._id)}
                >
                  <i class="fa-sharp fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            
          );}
        })}
      </div>
      
    </div>
  );
}

export default Dashboard;
