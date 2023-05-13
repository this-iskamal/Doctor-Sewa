import React, { useState, useEffect } from "react";
import axios from "axios";
import baseurl from '../../assets/baseurl'

import styles from "./EditInformation.module.css";
import { useParams } from "react-router-dom";
import district from "../../assets/data/district.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditInformation = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [newdata, setNewdata] = useState({
    username: "",
    email: "",
    address: "",
    gender: "",
    age: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(`${baseurl}/patient-edit-information/${id}`)
      .then((res) => {
        setUser(res.data.patientInfo);
      });
  }, [id]);

  const handleedit = (e) => {
    const { name, value } = e.target;
    setNewdata({
      ...newdata,
      [name]: value,
    });
  };

  const handlenamechange = (e) => {
    const { username } = newdata;
    e.preventDefault();
    if (username === "") toast.warn("Enter your name");
    else {
      axios
        .post(`${baseurl}/patient-update-information/${id}`, {
          username,
        })
        .then((res) => {
          console.log(res.data.message);
        });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  const handleemailchange = (e) => {
    const { email } = newdata;
    e.preventDefault();

    if (email === "") toast.warn("Enter your email");
    else if (!email.includes("@" && ".")) toast.warn("Invalid Email");
    else {
      axios
        .post(`${baseurl}/patient-update-information/${id}`, {
          email,
        })
        .then((res) => {
          console.log(res.data.message);
        });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  const handleaddresschange = (e) => {
    const { address } = newdata;
    e.preventDefault();
    if (address === "") toast.warn("Select your district");
    else {
      axios
        .post(`${baseurl}/patient-update-information/${id}`, {
          address,
        })
        .then((res) => {
          console.log(res.data.message);
        });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  const handlegenderchange = (e) => {
    const { gender } = newdata;
    e.preventDefault();
    if (gender === "") toast.warn("Select your gender");
    else {
      axios
        .post(`${baseurl}/patient-update-information/${id}`, {
          gender,
        })
        .then((res) => {
          console.log(res.data.message);
        });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  const handleagechange = (e) => {
    const { age } = newdata;
    e.preventDefault();
    if (age === "") toast.warn("Enter your age");
    else if (+age === 0) toast.warn("Enter your valid age");
    else if (+age > 120) toast.warn("Enter your valid age");
    else {
      axios
        .post(`${baseurl}/patient-update-information/${id}`, {
          age,
        })
        .then((res) => {
          console.log(res.data.message);
        });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  // const handleupdateclick = (e) => {
  //   e.preventDefault();
  //   console.log(newdata);
  //   const { username, email, address, gender, age } = newdata;
  //   if (username === "") toast.warn("Enter your name");
  //   else if (email === "") toast.warn("Enter your email");
  //   else if (!email.includes("@" && ".")) toast.warn("Invalid Email");
  //   else if (address === "") toast.warn("Select your district");
  //   else if (gender === "") toast.warn("Select your gender");
  //   else if (age === "") toast.warn("Enter your age");
  //   else if (+age === 0) toast.warn("Enter your valid age");
  //   else if (+age > 120) toast.warn("Enter your valid age");
  //   else {
  //     axios
  //       .post(
  //         `${baseurl}/patient-update-information/${id}`,
  //         newdata
  //       )
  //       .then((res) => {
  //         console.log(res.data.message);
  //       });
  //   }
  // };

  const handlesendotp = (e) => {
    e.preventDefault();
    axios.post(`${baseurl}/send-otp/${id}`).then((res) => {
      toast.success(res.data.message);
    });
  };
  const handleconfirm = (e) => {
    const { password } = newdata;
    e.preventDefault();
    axios
      .post(`${baseurl}/otp-confirm/${id}`, { password })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setTimeout(() => {
            window.open(`/change-password/${id}`,"_blank")
          }, 2000);
        }
        if (!res.data.success) toast.warn(res.data.message);
      });
  };

  return (
    <div className={styles.form2}>
      <ToastContainer />
      <h1>Edit Information</h1>
      <div className={styles.field}>
        <label htmlFor="name">
          Name : <span> {user.username}</span>{" "}
        </label>
        <div className={styles.sameline}>
          <input
            type="text"
            id="name"
            name="username"
            value={newdata.username}
            onChange={handleedit}
            placeholder="New Name"
          />
          <button className={styles.changebutton} onClick={handlenamechange}>
            Save
          </button>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email : {user.email}</label>
        <div className={styles.sameline}>
          <input
            type="email"
            id="email"
            name="email"
            value={newdata.email}
            onChange={handleedit}
            placeholder="New Email"
          />
          <button className={styles.changebutton} onClick={handleemailchange}>
            Save
          </button>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="address">Address : {user.district}</label>
        <div className={styles.sameline}>
          <select
            className={styles.inputinput}
            name="address"
            onChange={handleedit}
          >
            <option value="">--Select District--</option>
            {district.map((districtdata) => {
              return (
                <option value={districtdata.toUpperCase()}>
                  {districtdata.toUpperCase()}
                </option>
              );
            })}
          </select>
          <button className={styles.changebutton} onClick={handleaddresschange}>
            Save
          </button>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="gender">Gender : {user.gender}</label>
        <div className={styles.sameline}>
          <select
            className={styles.inputinput}
            id="gender"
            name="gender"
            value={newdata.gender}
            onChange={handleedit}
          >
            <option value="">--Select Gender--</option>

            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button className={styles.changebutton} onClick={handlegenderchange}>
            Save
          </button>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="age">Age : {user.age}</label>
        <div className={styles.sameline}>
          <input
            type="text"
            id="age"
            name="age"
            value={newdata.age}
            onChange={handleedit}
          />
          <button className={styles.changebutton} onClick={handleagechange}>
            Save
          </button>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Confirm OTP to change password</label>
        <div className={styles.sameline}>
          <input
            type="password"
            id="password"
            value={newdata.password}
            name="password"
            onChange={handleedit}
          />
          <button className={styles.changebutton} onClick={handlesendotp}>
            Send OTP
          </button>
          <button className={styles.changebutton} onClick={handleconfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInformation;
