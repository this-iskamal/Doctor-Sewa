import React ,{useState , useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import styles from './TakeHelp.module.css'

function TakeHelp() {
  const [namee, setNamee] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://192.168.0.114:8078/patient-dashboard/${id}`)
      .then((res) => {
        setNamee(res.data.name);
        console.log(res.data.name);
      });
  }, []);

  const navigate = useNavigate();


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
        <div className={styles.mainsection}></div>
      </div>
    </div>
  );
}

export default TakeHelp
