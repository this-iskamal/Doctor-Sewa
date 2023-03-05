import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  const handlelogindata = (e) => {
    const { name, value } = e.target;
    setLogindata({
      ...logindata,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleloginclick = (e) => {
    e.preventDefault();
    const { email, password } = logindata;
    if (email === "") toast.warn("Enter your email");
    else if (!email.includes("@" && ".com")) toast.warn("Invalid Email");
    else if (password === "") toast.warn("Enter your password");
    else {
      toast.success("Success");
      console.log(logindata);
      setTimeout(() => {
        navigate("/loginsuccess");
      }, 2000);
    }
  };

  return (
    <div className="container-R">
      <div className="left"></div>
      <div className="right">
        <ToastContainer />
        <div className="welcome">
          <h1>Welcome</h1>
        </div>
        <div className="continue">
          <h2>Login To Continue</h2>
          <h3>
            Not Registered Yet{" "}
            <span>
              <a href="/register">Register Here</a>
            </span>
          </h3>
        </div>
        <div className="form">
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
          <div className="remember">
            <input type="checkbox" className="checkbox" />
            <p> Remember me</p>
          </div>
          <button className="btn-R" onClick={handleloginclick}>
            Login
          </button>
        </div>
        <div className="forget">
          <a href="/forgot-password">Forgot your Password</a>
        </div>
        <div className="copyright">
          <p>
            <i class="fa-sharp fa-solid fa-copyright"></i> 2023 Doctor Sewa All
            Right Reserved <br />
            By signing up, I agree to Doctor Sewa <br />
            <a href="/terms-of-services">Terms of Services</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
