import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    gender: "",
    phone: "",
    youare: "",
  });

  const handleinput = (e) => {
    const { name, value } = e.target;
    setUserdata({
      ...userdata,
      [name]: value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const { username, email, password, gender, cpassword, phone, youare } =
      userdata;
    if (username === "") toast.warn("Enter your name");
    else if (email === "") toast.warn("Enter your email");
    else if (!email.includes("@"&&".com"))toast.warn("Invalid Email");
    else if (password === "") toast.warn("Enter your password");
    else if (cpassword === "") toast.warn("Enter confirm password");
    else if (gender === "") toast.warn("Select your gender");
    else if (phone === "") toast.warn("Enter your phone");
    else if (youare === "") toast.warn("Who you are");
    else if (password !== cpassword) toast.warn("Password don't match");
    
    else {
      toast.success("Success");
      console.log(userdata);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    // if(userdata.youare==='doctor')navigate('/doctorhome')
    // if(userdata.youare==='patient')navigate('/patienthome')
  };

  return (
    <>
      <div className="container-Register">
        <div className="leftR">
          <h1>Doctor Sewa</h1>
          <p>
            Doctor Sewa is a modern and user-friendly appointment system
            designed to provide patients with easy access to medical
            professionals. With Doctor Sewa, patients can easily book
            appointments with their preferred doctors and manage their medical
            appointments efficiently.
          </p>
        </div>
        <div className="rightR">
          <div className="right-container">
            <ToastContainer />
            <h1>Welcome</h1>
            <form>
              <label htmlfor="name">Name:</label>
              <input
                type="text"
                name="username"
                value={userdata.username}
                placeholder="Enter your name"
                onChange={handleinput}
              />

              <label htmlfor="email">Email:</label>
              <input
                type="email"
                value={userdata.email}
                name="email"
                placeholder="Enter your email address"
                onChange={handleinput}
              />

              <label htmlfor="password">Password:</label>
              <input
                type="password"
                value={userdata.password}
                name="password"
                placeholder="Enter your password"
                onChange={handleinput}
              />

              <label htmlfor="cpassword">Confirm Password:</label>
              <input
                type="password"
                value={userdata.cpassword}
                name="cpassword"
                placeholder="Confirm Password"
                onChange={handleinput}
              />
              <label htmlfor="select">Gender :</label>
              <select name="gender" onChange={handleinput}>
                <option></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <label htmlfor="phone">Phone:</label>
              <input
                type="text"
                value={userdata.phone}
                name="phone"
                placeholder="Enter your Phone "
                onChange={handleinput}
              />

              <label htmlfor="select">You are :</label>
              <select name="youare" onChange={handleinput}>
                <option></option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>

              <input type="submit" value="SignUp" onClick={handlesubmit} />
              <h4>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
