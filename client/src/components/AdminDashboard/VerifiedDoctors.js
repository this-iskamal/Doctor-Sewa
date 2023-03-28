import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./VerifiedDoctors.module.css";
import DoctorProfile from "../DoctorProfile/DoctorProfile";
import { useNavigate } from "react-router-dom";
//import DoctorProfile from "../DoctorProfile/DoctorProfile";
// import App from "../../App";

function VerifiedDoctors() {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [showdoctorprofilepeding, setShowdoctorprofilepending] =
    useState(false);
  const [verifieddoctorlists, setVerifieddoctorlists] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.0.114:8078/get-verified-doctors").then((res) => {
      setVerifieddoctorlists(res.data.verificationlist);
    });
  }, []);
  const handlereviewclick = (id1) => {
    setId(id1);
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

  return (
    <>
      {showdoctorprofilepeding ? <DoctorProfile id={id} /> : null}

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
            <div className={styles.tcontainer}>
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

export default VerifiedDoctors;
