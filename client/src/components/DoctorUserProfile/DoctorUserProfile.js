import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./DoctorUserProfile.module.css";
// import testimage from "../../assets/images/left.jpg";
import baseurl from '../../assets/baseurl'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function UserProfile() {
  const [namee, setNamee] = useState("");
  const [email, setEmail]=useState('')
  const [age,setAge]=useState('')
  const [gender,setGender]=useState('')
  const [address,setAddress]=useState('')
  const [photo,setPhoto]=useState('')
  const [speciality , setSpeciality] = useState("")
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [profile,setProfile]=useState(null)

  useEffect(() => {
    axios
      .get(`${baseurl}/doctor-dashboard/${id}`,

      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNamee(res.data.name);
        setEmail(res.data.email)
        setGender(res.data.gender)
        setAddress(res.data.address)
        setAge(res.data.age)
        setPhoto(res.data.photo)
        setSpeciality(res.data.speciality)
      });
  }, [id]);

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

  const handlebuttonclick = () => {
    //
    navigate(`/doctor-dashboard/${id}`);

    //
  };
  const handleeditbuttonclick = () => {
    window.open(`/doctor-edit-information/${id}`, "_blank");
  };
  const handleFileChange = (event) => {
    setProfile(event.target.files[0])
  };
  const handleupdateprofileclick = () =>{
    if (profile === null) toast.warn("Upload your photo");
    else{
      const formData = new FormData();
      formData.append('profile', profile);
      
      axios
        .post(`${baseurl}/doctor-profile-change/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if(res.data.success===true){
            toast.success(res.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          }
          if(res.data.success===false){
            toast.warn(res.data.message);
          }
        });
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer />

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
            <li onClick={handleviewappointmentclick}>View Appointments</li>
            <li onClick={handleedittimingclick}>Edit Timing</li>
         
          </ul>
        </div>
        <div className={styles.mainsection}>
          <div className={styles.userprofile}>
            <div className={styles.photochange}>
              <div className={styles.userimage}>
                <img src={`${baseurl}/${photo}`} alt="" />
              </div>
              <div className={styles.button}><input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
              /></div>
              <div className={styles.button}><button style={{padding:'3px' , backgroundColor:"lightblue"}} onClick={handleupdateprofileclick}>Update Profile</button></div>
            </div>
            <div className={styles.infosection}>
              <ul>
                <li>Name : {namee}</li>
                <li>Email : {email}</li>
                <li>Age : {age}</li>
                <li>Speciality : {speciality}</li>
                <li>Gender : {gender}</li>
                <li>Address : {address}</li>
                <li><button onClick={handleeditbuttonclick}>Edit Information</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
