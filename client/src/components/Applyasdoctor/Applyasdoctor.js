import React, { useState } from "react";
import axios from "axios";
import styles from "./Applyasdoctor.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import specialities from '../../assets/data/specialities.json'
import baseurl from '../../assets/baseurl'



function Applyasdoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    gender: "",
    age: "",
    phone: "",
    speciality: "",
    experience: "",
    profilePhoto: null,
    certificates: null,
    condition:"Inactive"
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      email,
      password,
      confirmPassword,
      gender,
      age,
      address,
      phone,
      speciality,
      experience,
      profilePhoto,
      certificates,
      
    } = formData;
    if (name === "") toast.warn("Enter your name");
    else if (email === "") toast.warn("Enter your email");
    else if (!email.includes("@" && ".")) toast.warn("Invalid Email");
    else if (password === "") toast.warn("Enter your password");
    else if (password.length <= 5) toast.warn("Password must be of 6 length");
    else if (confirmPassword === "") toast.warn("Enter confirm password");
    else if (password !== confirmPassword) toast.warn("Password don't match");
    else if (age === "") toast.warn("Enter your age");
    else if (+age === 0) toast.warn("Enter your valid age");
    else if (+age > 120) toast.warn("Enter your valid age");
    else if (address === "") toast.warn("Select your address");
    else if (gender === "") toast.warn("Select your gender");
    else if (phone === "") toast.warn("Enter your phone");
    else if (speciality === "") toast.warn("Enter your speciality");
    else if (experience === "") toast.warn("Enter your experience");
    else if (profilePhoto === null) toast.warn("Upload your photo");
    else if (certificates === null) toast.warn("Upload your certificates");
    else {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      axios
        .post(`${baseurl}/register-doctor`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if(res.data.success===true){
            toast.success(res.data.message);
            setTimeout(() => {
              navigate('/login')
            }, 2500);
          }
          if(res.data.success===false){
            toast.warn(res.data.message);
          }
        });
    }
  };
  return (
    <div className={styles.container}>
      <ToastContainer />
      <button
        type="submit"
        style={{
          width: "100px",
          position: "absolute",
          top: "50px",
          left: "50px",
        }}
        onClick={() => window.location.reload()}
      >
        Sign Up as Patient
      </button>
      <div className={styles.App}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fields}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.fields}>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Speciality:
              {/* <input
                type="text"
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
              /> */}
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
              >
                <option value="">Select Speciality</option>
                {
                  specialities.map((speciality)=>{
                    return(
                      <option value={speciality.toUpperCase()}>
                      {speciality.toUpperCase()}
                      </option>
                    )
                  })
                }
              </select>
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Experience:
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              ></textarea>
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Profile Photo:
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className={styles.fields}>
            <label>
              Certificates:
              <input
                type="file"
                name="certificates"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Applyasdoctor;
