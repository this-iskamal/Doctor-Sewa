import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import left from "../../assets/images/Bishes.jpg";
import styles from "./FindDoctors.module.css";

function FindDoctors() {
  const [namee, setNamee] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://192.168.0.114:8078/patient-dashboard/${id}`)
      .then((res) => {
        setNamee(res.data.name);
        console.log(res.data.name);
      });
  }, []);

  const [doctordetails, setDoctordetails] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.0.114:8078/get-doctor-details").then((res) => {
      setDoctordetails(res.data.doctordetails);
    });
  }, []);

  const navigate = useNavigate();

  const handleprofileclick = () => {
    navigate(`/patient-dashboard/user-profile/${id}`);
  };
  const handlefinddoctorclick = () => {
    navigate(`/patient-dashboard/find-doctors/${id}`);
  };
  const handletakeappointmentclick = () => {
    navigate(`/patient-dashboard/take-appointment/${id}`);
  };
  const handletakehelpclick = () => {
    navigate(`/patient-dashboard/take-help/${id}`);
  };
  const handletakeappointment = (id1) => {
    window.open(`/book-appointment/${id1}/${id}`, "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.topsection}>
        <h1>Doctor Sewa</h1>
        <p>Hello, {namee}</p>
      </div>
      <div className={styles.navbottom}>
        <div className={styles.leftsection}>
          <ul>
            <button>click</button>
            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handlefinddoctorclick}>Find Doctors</li>
            <li onClick={handletakeappointmentclick}>Take Appointment</li>
            <li onClick={handletakehelpclick}>Take Help</li>
          </ul>
        </div>
        <div className={styles.mainsection}>
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
                    <Button
                      variant="primary"
                      className={styles.buttonondoctor}
                      onClick={() => handletakeappointment(doctordetail._id)}
                    >
                      Take Appointment
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

export default FindDoctors;
