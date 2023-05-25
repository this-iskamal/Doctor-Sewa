import React, { useState } from 'react';
import styles from './AddAdminForm.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import baseurl from '../../assets/baseurl';

const AddAdminForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send form data to server or perform desired action
    axios.post(`${baseurl}/register-admin`,{name,email,phone,address,password})
    .then((res)=>{
        toast.success(res.data.message)
        if(res.success===true){
        setTimeout(() => {
            window.close();
        }, 2000);}
    })
    console.log('Submitted!', name, email, phone, address, password);
    // Reset form fields
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setPassword('');
  };

  return (
    <div>
        <ToastContainer />

      <h1>Add New Admin</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddAdminForm;
