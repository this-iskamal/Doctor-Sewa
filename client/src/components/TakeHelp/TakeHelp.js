import React ,{useState , useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import styles from './TakeHelp.module.css'
import baseurl from '../../assets/baseurl'


function TakeHelp() {
  const [namee, setNamee] = useState("");
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseurl}/patient-dashboard/${id}`,

      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNamee(res.data.name);
        console.log(res.data.name);
      });
  }, [id]);

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
    navigate(`/patient-dashboard/${id}`);
    //
  };

  return (
    <div className={styles.container}>
      <div className={styles.topsection}>
        <h1>Doctor Sewa</h1>
        <p>Hello, {namee}</p>
      </div>
      <div className={styles.navbottom}>
      <button
          className={styles.menuButton}
          onClick={() => setShowMenu(!showMenu)}
        >
          <h1>
            <i class="fa fa-bars"></i>
          </h1>
        </button>
        <div
          className={`${styles.leftsection} ${showMenu ? styles.showMenu : ""}`}
        >
          <ul>
          <li onClick={handlebuttonclick}>Home</li>

            <li onClick={handleprofileclick}>Profile</li>
            <li onClick={handlefinddoctorclick}>Find Doctors</li>
            <li onClick={handletakeappointmentclick}>Appointments</li>
            <li onClick={handletakehelpclick}>Take Help</li>
          </ul>
        </div>
        <div className={styles.mainsection}></div>
      </div>
    </div>
  );
}

export default TakeHelp
