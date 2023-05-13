import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditPatientInfo.module.css";
import district from "../../assets/data/district.json";
import axios from "axios";
import baseurl from "../../assets/baseurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPatientInfo = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseurl}/patient-update-information/${id}`, {
        username,
        email,
        phone,
        address
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
      });
    console.log("Submitted!", username, email, address ,  phone);
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <h1>Edit Patient Information</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlfor="select">
          Address :
          <select name="address" onChange={(e) => setAddress(e.target.value)}>
            <option>--Select District--</option>
            {district.map((districtdata) => {
              return (
                <option value={districtdata.toUpperCase()}>
                  {districtdata.toUpperCase()}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPatientInfo;
