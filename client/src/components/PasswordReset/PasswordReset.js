import React, { useState, useEffect } from 'react';
import styles from './PasswordReset.module.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from '../../assets/baseurl';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpConfirmed, setIsOtpConfirmed] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = () => {
    // Code to send OTP to the provided email
    axios.post(`${baseurl}/send-otpp`,{email})
    .then((res)=>{
        if(res.data.success===true){toast.success(res.data.message)
            setIsOtpSent(true);
            startResendTimer();}
        if(res.data.success===false)toast.success(res.data.message)

    })
    
  };

  const handleResendOtp = () => {
    axios.post(`${baseurl}/send-otpp`,{email})
    .then((res)=>{
        if(res.data.success===true)toast.success(res.data.message)
        if(res.data.success===false)toast.success(res.data.message)

    })
    startResendTimer();
  };

  const handleConfirmOtp = () => {
    // Code to validate the entered OTP
    axios.post(`${baseurl}/otp-confirmm`,{email,otp})
    .then((res)=>{
        if(res.data.success===true){
            toast.success(res.data.message)
        setTimeout(() => {
            window.open(`change-password/${res.data.id}`,'_self')
        }, 2000);
        }
        if(res.data.success===false){toast.success(res.data.message)}
    })
    setIsOtpConfirmed(true);
  };

  const startResendTimer = () => {
    setResendTimer(60);
  };

  useEffect(() => {
    let intervalId;

    if (resendTimer > 0) {
      intervalId = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [resendTimer]);

  return (
    <div className={styles.container}>
        <ToastContainer />

      <h2>Password Reset</h2>
      {!isOtpSent ? (
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={handleOtpChange} />
          <button onClick={handleConfirmOtp}>Confirm OTP</button>
          <div className={styles.resendContainer}>
            {resendTimer > 0 ? (
              <span>Resend OTP in {resendTimer} seconds</span>
            ) : (
              <button onClick={handleResendOtp}>Resend OTP</button>
            )}
          </div>
        </div>
      )}
      {isOtpConfirmed && <div>Redirecting to Password Reset Page...</div>}
    </div>
  );
};

export default PasswordReset;
