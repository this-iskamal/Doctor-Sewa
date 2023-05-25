import React, { useState  } from 'react';
import {useParams} from 'react-router-dom'
import styles from './EditDoctorInfo.module.css';
import specialities from '../../assets/data/specialities.json'
import axios from 'axios';
import baseurl from '../../assets/baseurl';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDoctorInfo = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const {id} = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseurl}/doctor-update-information/${id}`,{username,email,specialty,phone,password})
    .then((res)=>{
        toast.success(res.data.message);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    })
    console.log('Submitted!', username, email, specialty, phone , password);
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <h1>Edit Doctor Information</h1>
      <form onSubmit={handleSubmit}className={styles.form1}>
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
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
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
        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditDoctorInfo;

