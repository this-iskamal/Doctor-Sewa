import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import styles from "./Doctors.module.css";

function Doctors() {
  const [doctordetails, setDoctordetails] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.0.114:8078/get-doctor-details").then((res) => {
      setDoctordetails(res.data.doctordetails);
    });
  }, [doctordetails]);

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
          <div className={styles.containerDO}>
            {doctordetails.map((doctordetail) => {
              return (
                <Card
                  className={styles.Cardsec}
                  key={doctordetail.id}
                  style={{
                    width: "17rem",
                    borderRadius: "30px",
                    display: "flex",
                    backgroundColor: "darkblue",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`http://192.168.0.114:8078/${doctordetail.profilePhoto}`}
                    className={styles.imageDO}
                  />
                  <Card.Body>
                    <Card.Title>{doctordetail.name}</Card.Title>
                    <Card.Text>
                      Specialist : {doctordetail.speciality}
                      <br />
                      Available : {doctordetail.timing1}--{doctordetail.timing2}
                      <br />
                      Status : {doctordetail.condition}
                    </Card.Text>
                    <Button variant="primary" className={styles.buttonondoctor}>
                      Edit
                    </Button>
                    <Button variant="danger">
                      <i class="fa-sharp fa-solid fa-trash"></i>
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
