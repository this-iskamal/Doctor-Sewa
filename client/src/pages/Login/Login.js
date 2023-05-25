import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";
import baseurl from '../../assets/baseurl'


function Login(props) {


  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
    youare: "",
  });

  const handlelogindata = (e) => {
    const { name, value } = e.target;
    setLogindata({
      ...logindata,
      [name]: value,
    });
    
  };

  const navigate = useNavigate();

  const handleloginclick = () => {

    console.log(logindata.youare);
    const { email, password, youare } = logindata;

    if (email === "") toast.warn("Enter your email");
    else if (!email.includes("@" && ".")) toast.warn("Invalid Email");
    else if (password === "") toast.warn("Enter your password");
    else if (password.length <= 5) toast.warn("Password must be of 6 length");
    else if (youare === "") toast.warn("who you are");
    else if (logindata.youare === "patient") {
      axios.post(`${baseurl}/login`, logindata).then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setTimeout(() => {
            if (res.data.role === "patient") {
              localStorage.setItem("token",res.data.data)
              navigate(`/patient-dashboard/${res.data.id}`);
            }
            if (res.data.role === "admin") {
              localStorage.setItem("token",res.data.data)
              navigate("/admin-dashboard");
            }
          }, 2000);
        } else if (res.data.success === false) {
          toast.warn(res.data.message);
        }
      });
    } else if (logindata.youare === "doctor") {
      axios
        .post(`${baseurl}/doctorlogin`, logindata)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message);
            localStorage.setItem("token",res.data.data)
            setTimeout(() => {
              navigate(`/doctor-dashboard/${res.data.id}`);
            }, 2000);
          } else if (res.data.success === false) {
            toast.warn(res.data.message);
          }
        });
    }
  };
  const handlepass = () =>{
    window.open('password-reset','_blank')
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}></div>
      <div className={styles.right}>
        <ToastContainer />
        <div className={styles.welcome}>
          <h1>Welcome</h1>
        </div>
        <div className={styles.continue}>
          
          <h5>
            Not Registered Yet 
            <span>
              <a href="/register"> Register Here</a>
            </span>
          </h5>
        </div>
        <div className={styles.form}>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            value={logindata.email}
            onChange={handlelogindata}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={logindata.password}
            onChange={handlelogindata}
          />
          <div className={styles.inputfieldsR}>
            <select
              name="youare"
              onChange={handlelogindata}
              style={{ width: "100%" }}
            >
              <option value="">--Select Role--</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <button onClick={handleloginclick}>Login</button>
        </div>
        <div className={styles.forget}>
           <p onClick={handlepass} style={{color:'green' ,cursor:'pointer'}}>Forgot your Password</p>
        </div>
        <div className={styles.copyright}>
          <p>
            <i class="fa-sharp fa-solid fa-copyright"></i> 2023 Doctor Sewa All
            Right Reserved  <br />
           By signing up, I agree to Doctor Sewa <br />
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
