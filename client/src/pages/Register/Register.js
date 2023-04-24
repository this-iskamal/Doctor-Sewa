import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from '../../assets/baseurl'

import styles from "./Register.module.css";
import district from "../../assets/data/district.json";
import Applyasdoctor from "../../components/Applyasdoctor/Applyasdoctor";

function Register() {


  const [showapplyasdoctor, setShowapplyasdoctor] = useState(false);

  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    gender: "",
    age: "",
    district: "",
    phone: "",
    youare: "patient",
  });

  const handledoctorclick = (e) => {
    e.preventDefault();
    setShowapplyasdoctor(!showapplyasdoctor);

  };

  const handleinput = (e) => {
    const { name, value } = e.target;
    setUserdata({
      ...userdata,
      [name]: value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(userdata);
    const {
      username,
      email,
      password,
      gender,
      age,
      district,
      cpassword,
      phone,

    } = userdata;
    if (username === "") toast.warn("Enter your name");
    else if (email === "") toast.warn("Enter your email");
    else if (!email.includes("@" && ".")) toast.warn("Invalid Email");
    else if (password === "") toast.warn("Enter your password");
    else if (password.length <= 5) toast.warn("Password must be of 6 length");
    else if (cpassword === "") toast.warn("Enter confirm password");
    else if (password !== cpassword) toast.warn("Password don't match");
    else if (age === "") toast.warn("Enter your age");
    else if (+age === 0) toast.warn("Enter your valid age");
    else if (+age > 120) toast.warn("Enter your valid age");
    else if (district === "") toast.warn("Select your district");
    else if (gender === "") toast.warn("Select your gender");
    else if (phone === "") toast.warn("Enter your phone");

    else {
      axios
        .post(`${baseurl}/register`, userdata)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } else if (res.data.success === false) {
            toast.warn(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // if(userdata.youare==='doctor')navigate('/doctorhome')
    // if(userdata.youare==='patient')navigate('/patienthome')
  };


  const handleblur=()=>{

    if(showapplyasdoctor){
      setShowapplyasdoctor(!showapplyasdoctor)
    }
  }
  return (
    <>
      {showapplyasdoctor ? <Applyasdoctor /> : null}
      <div
        className={styles.containerRegister}
        onClick={handleblur}
      >
        <div className={styles.leftR}>
          <h1>Doctor Sewa</h1>
          <p>
            Doctor Sewa is a modern and user-friendly appointment system
            designed to provide patients with easy access to medical
            professionals. With Doctor Sewa, patients can easily book
            appointments with their preferred doctors and manage their medical
            appointments efficiently.
          </p>

          <button className={styles.applydoctorbtn} onClick={handledoctorclick}>
            Apply as Doctor
          </button>
        </div>
        <div className={styles.rightR}>
          <div className={styles.rightcontainer}>
            <ToastContainer />
            <h1>Welcome</h1>
            <form>
              <div className={styles.formtype}>
                <div className={styles.inputfieldsR}>
                  <label htmlfor="name">Name:</label>
                  <input
                    type="text"
                    name="username"
                    value={userdata.username}
                    placeholder="Enter your name"
                    onChange={handleinput}
                  />
                </div>
                <div className={styles.inputfieldsR}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    value={userdata.email}
                    name="email"
                    placeholder="Enter your email address"
                    onChange={handleinput}
                  />
                </div>
                <div className={styles.inputfieldsR}>
                  <label htmlfor="password">Password:</label>
                  <input
                    type="password"
                    value={userdata.password}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleinput}
                  />
                </div>
                <div className={styles.inputfieldsR}>
                  <label htmlfor="cpassword">Confirm Password:</label>
                  <input
                    type="password"
                    value={userdata.cpassword}
                    name="cpassword"
                    placeholder="Confirm Password"
                    onChange={handleinput}
                  />
                </div>
                <div className={styles.inputfieldsR}>
                  <label htmlfor="name">Age:</label>
                  <input
                    type="text"
                    name="age"
                    value={userdata.age}
                    placeholder="Enter your age"
                    onChange={handleinput}
                  />
                </div>
                <div className={styles.inputfieldsR}>
                  <label htmlfor="select">District :</label>
                  <select name="district" onChange={handleinput}>
                    <option>--Select District--</option>
                    {district.map((districtdata) => {
                      return (
                        <option value={districtdata.toUpperCase()}>
                          {districtdata.toUpperCase()}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={styles.inputfieldsR}>
                  <label htmlfor="select">Gender :</label>
                  <select name="gender" onChange={handleinput}>
                    <option>--Select Gender--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className={styles.inputfieldsR}>
                  <label htmlfor="phone">Phone:</label>
                  <input
                    type="text"
                    value={userdata.phone}
                    name="phone"
                    placeholder="Enter your Phone "
                    onChange={handleinput}
                  />
                </div>
                

                <input type="submit" value="SignUp" onClick={handlesubmit} />
                <h4 style={{ fontSize: "18px" }}>
                  Already Registered {}
                  <span>
                    <a
                      href="/login"
                      style={{ textDecoration: "none", color: "green" }}
                    >
                      Login Here
                    </a>
                  </span>
                </h4>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
