import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import left from "../../assets/images/Bishes.jpg";
import styles from "./Doctors.module.css";

function Doctors() {
  const [doctordetails, setDoctordetails] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.0.114:8078/get-doctor-details").then((res) => {
      setDoctordetails(res.data.doctordetails);
    });
  }, []);

  return (

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
             
            }}
          >
            <Card.Img variant="top" src={left} className={styles.imageDO} />
            <Card.Body>
              <Card.Title>{doctordetail.username}</Card.Title>
              <Card.Text>
                Specialist : Cardiologist
                <br />
                Available : 10 AM - 2PM
                <br />
                Status : Active
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

  );
}

export default Doctors;
