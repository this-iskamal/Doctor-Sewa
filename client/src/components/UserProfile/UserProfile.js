import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./UserProfile.module.css";
// import testimage from "../../assets/images/left.jpg";
import baseurl from "../../assets/baseurl";

function UserProfile() {
  const [namee, setNamee] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`${baseurl}/patient-dashboard/${id}`,

    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      setNamee(res.data.name);
      setEmail(res.data.email);
      setGender(res.data.gender);
      setAddress(res.data.address);
      setAge(res.data.age);
    });
  }, [id]);

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

  const handlebuttonclick = () => {
    //
    navigate(`/patient-dashboard/${id}`);
    //
  };

  const handleeditbuttonclick = () => {
    window.open(`/edit-information/${id}`, "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.topsection}>
        <h1>Doctor Sewa</h1>
        <p>Hello, {namee}</p>
      </div>
      <div className={styles.navbottom}>
      <button
          className={styles.menuButton}
          onClick={() => setShowMenu(!showMenu)}
        >
          <h1>
            <i class="fa fa-bars"></i>
          </h1>
        </button>
        <div
          className={`${styles.leftsection} ${showMenu ? styles.showMenu : ""}`}
        >
          <ul>
            <li onClick={handlebuttonclick}>Home</li>

            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handlefinddoctorclick}>Find Doctors</li>
            <li onClick={handletakeappointmentclick}>Appointments</li>
 
          </ul>
        </div>
        <div className={styles.mainsection}>
          <div className={styles.userprofile}>
            <div className={styles.photochange}>
              
            </div>
            <div className={styles.infosection}>
              <ul>
                <li>Name : {namee}</li>
                <li>Email : {email}</li>
                <li>Age : {age}</li>
                <li>Gender : {gender}</li>
                <li>Address : {address}</li>
                <li>
                  <button onClick={handleeditbuttonclick}>
                    Edit Information
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
