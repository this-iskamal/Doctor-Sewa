import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./DoctorUserProfile.module.css";
import testimage from "../../assets/images/left.jpg";

function UserProfile() {
  const [namee, setNamee] = useState("");
  const [email, setEmail]=useState('')
  const [age,setAge]=useState('')
  const [gender,setGender]=useState('')
  const [address,setAddress]=useState('')
  const [photo,setPhoto]=useState('')
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://192.168.0.114:8078/doctor-dashboard/${id}`)
      .then((res) => {
        setNamee(res.data.name);
        setEmail(res.data.email)
        setGender(res.data.gender)
        setAddress(res.data.address)
        setAge(res.data.age)
        setPhoto(res.data.photo)
      });
  }, []);

  const navigate = useNavigate();

  const handleprofileclick = () => {
    navigate(`/doctor-dashboard/doctor-user-profile/${id}`);
  };
  const handleviewappointmentclick = () => {
    navigate(`/doctor-dashboard/view-appointments/${id}`);
  };
  const handleedittimingclick = () => {
    navigate(`/doctor-dashboard/edit-timing/${id}`);
  };
  const handletakehelpclick = () => {
    navigate(`/doctor-dashboard/doctor-take-help/${id}`);
  };
  const handlebuttonclick = () => {
    //
    //
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
            <button onClick={handlebuttonclick}>click</button>
            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handleviewappointmentclick}>View Appointments</li>
            <li onClick={handleedittimingclick}>Edit Timing</li>
            <li onClick={handletakehelpclick}>Take Help</li>
          </ul>
        </div>
        <div className={styles.mainsection}>
          <div className={styles.userprofile}>
            <div className={styles.photochange}>
              <div className={styles.userimage}>
                <img src={`http://192.168.0.114:8078/${photo}`} alt="" />
              </div>
              <div className={styles.button}>Change Image</div>
            </div>
            <div className={styles.infosection}>
              <ul>
                <li>Name : {namee}</li>
                <li>Email : {email}</li>
                <li>Age : {age}</li>
                <li>Gender : {gender}</li>
                <li>Address : {address}</li>
                <li><button>Edit Information</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
