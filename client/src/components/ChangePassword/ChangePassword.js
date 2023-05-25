import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import { ToastContainer, toast } from "react-toastify";
import baseurl from '../../assets/baseurl'

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from "react-router-dom";


function ChangePassword() {
    const {id} = useParams();
  const [passwords, setPassword] = useState({
    password: "",
    cpassword: "",
  });

  const handlepasswordchange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...passwords,
      [name]: value,
    });
  };

  const handlechangepasswordclick = (e) => {
    e.preventDefault();
    const { password, cpassword } = passwords;
    if (password === "") toast.warn("Enter your password");
    else if (password.length <= 5) toast.warn("Password must be of 6 length");
    else if (cpassword === "") toast.warn("Enter confirm password");
    else if (password !== cpassword) toast.warn("Password don't match");
    else {
      axios.post(`${baseurl}/change-password/${id}`,{password})
      .then((res)=>{
        if(res.data.success){
            toast.success(res.data.message)
            setTimeout(() => {
                window.close('','_parent');
            }, 2500);
        }
      })
    }
  };
  return (
    <div className={styles.maincontainer}>
      <ToastContainer />

      <h1>Change Password</h1>
      <input
        type="password"
        name="password"
        value={passwords.password}
        className={styles.inputfieldsize}
        placeholder="New Password"
        onChange={handlepasswordchange}
      />
      <input
        type="password"
        name="cpassword"
        value={passwords.cpassword}
        className={styles.inputfieldsize}
        placeholder="Confirm New Password"
        onChange={handlepasswordchange}
      />
      <input
        type="button"
        className={styles.inputfieldsize1}
        value="Change Password"
        onClick={handlechangepasswordclick}
      />
    </div>
  );
}

export default ChangePassword;
