import React, { useEffect,useState} from "react";
import axios from "axios";
import styles from "./DoctorProfile.module.css";

function DoctorProfile(props) {
  const [doctorprofile, setDoctorprofile] = useState([]);
  useEffect(() => {
    axios
      .get(`http://192.168.0.114:8078/get-pending-doctor-profile/${props.id}`)
      .then((res) => {
        setDoctorprofile(res.data.prendingdoctorlist);
      });
  },[]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.doctorprofiletemplate} key={doctorprofile._id}>
          <h1>{doctorprofile.name}</h1>
        </div>
      </div>
    </>
  );
}

export default DoctorProfile;
