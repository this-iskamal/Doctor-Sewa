import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Symptoms from "../../components/Symptoms/Symptoms";
import styles from "./PatientDashboard.module.css";
import diseasedata from "../../assets/data/disease-symptoms.json";
import axios from "axios";
import baseurl from '../../assets/baseurl'


function PatientDashboard() {
  const [namee , setNamee ] = useState('')
  const {id} = useParams();
  useEffect(()=>{
    axios.get(`${baseurl}/patient-dashboard/${id}`).then((res)=>{
      setNamee(res.data.name)
      console.log(res.data.name)
    })
  },[])



  const navigate = useNavigate();
  const [symptoms , showSymptoms] = useState(false)
  const [id1 , setId1] = useState('')

  const handleprofileclick = () => {
    navigate(`/patient-dashboard/user-profile/${id}`);
  };
  const handlefinddoctorclick = () => {
    navigate(`/patient-dashboard/find-doctors/${id}`);
  };
  const handletakeappointmentclick = () => {
    navigate(`/patient-dashboard/take-appointment/${id}`);
  };
  const handletakehelpclick = () => {
    navigate(`/patient-dashboard/take-help/${id}`);
  };
  const handlebuttonclick = () => {
    //
    //
  };
  const handlediseaseclick = (id2) =>{
    setId1(id2)
    console.log(id1)
    showSymptoms(true)
  }

  return (

    <div className={styles.container}>
      <div className={styles.topsection}>
        <h1>Doctor Sewa</h1>
        <p>Hello, {namee}</p>
      </div>
      <div className={styles.navbottom}>
        <div className={styles.leftsection}>
          <ul>
            <button onClick={handlebuttonclick}>click</button>
            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handlefinddoctorclick}>Find Doctors</li>
            <li onClick={handletakeappointmentclick}>Take Appointment</li>
            <li onClick={handletakehelpclick}>Take Help</li>
          </ul>
        </div>
        <div className={styles.mainsection}>
          <h2>Learn about diseases</h2>
          <div className={styles.diseasesymptoms}>
            <div className={styles.diseasesection}>
              {diseasedata.data.map((disease) => {
                return (
                  <div className={styles.typedisease} key={disease.id} onClick={()=>{handlediseaseclick(disease.id)}}>
                    <h1>{disease.name.toUpperCase().replace("_", " ")}</h1>
                  </div>
                );
              })}
            </div>
            <div className={styles.symptomssection}>
              {symptoms ? <Symptoms id={id1}/> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
