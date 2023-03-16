import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./VerifiedDoctors.module.css";
import DoctorProfile from "../DoctorProfile/DoctorProfile";
//import DoctorProfile from "../DoctorProfile/DoctorProfile";
// import App from "../../App";


function VerifiedDoctors() {
  const[id,setId]=useState(null)
 const [showdoctorprofilepeding,setShowdoctorprofilepending]=useState(false)
  const [verifieddoctorlists, setVerifieddoctorlists] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.0.114:8078/get-verified-doctors").then((res) => {
      setVerifieddoctorlists(res.data.verificationlist);
    }); 
  },[]);
  const  handlereviewclick = (id1) => {
    setId(id1)
    setShowdoctorprofilepending(!showdoctorprofilepeding)
  };

  return (
    <>
      {showdoctorprofilepeding ? <DoctorProfile id={id}/>:null}
      <div className={styles.container}>
        <h1>Pending Doctor List</h1>
        <div className={styles.flexlist}>
          <table style={{ width: "100%" }}>
            <tr>
              <th>_id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Speciality</th>
              <th>Action</th>
            </tr>
            {verifieddoctorlists &&
              verifieddoctorlists.map((doctordetail) => {
                return (
                  <tr>
                    <td>{doctordetail._id}</td>
                    <td>{doctordetail.name}</td>
                    <td>{doctordetail.email}</td>
                    <td>{doctordetail.gender}</td>
                    <td>{doctordetail.phone}</td>
                    <td>{doctordetail.address}</td>
                    <td>{doctordetail.speciality}</td>
                    <td>
                      <button
                        className={styles.btnverify}
                        onClick={() => handlereviewclick(doctordetail._id)}
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
    </>
  );
}

export default VerifiedDoctors;
