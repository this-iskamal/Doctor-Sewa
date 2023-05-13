import React ,{useState , useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import styles from './DoctorTakeHelp.module.css'
import baseurl from '../../assets/baseurl'


function DoctorTakeHelp() {
  const [namee, setNamee] = useState("");
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseurl}/doctor-dashboard/${id}`)
      .then((res) => {
        setNamee(res.data.name);
        // console.log(res.data.name);
      });
  }, [id]);

  const navigate = useNavigate();

  const handleprofileclick = () => {
    navigate(`/doctor-dashboard/doctor-user-profile/${id}`);
  };
  const handleviewappointmentclick = () => {
    navigate(`/doctor-dashboard/view-appointments/${id}`);
  };
  const handleedittiming = () => {
    navigate(`/doctor-dashboard/edit-timing/${id}`);
  };
  const handletakehelpclick = () => {
    navigate(`/doctor-dashboard/doctor-take-help/${id}`);
  };
  const handlebuttonclick = () => {
    //
    navigate(`/doctor-dashboard/${id}`);

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
            <li onClick={handleviewappointmentclick}>View Appointments</li>
            <li onClick={handleedittiming}>Edit Timing</li>
            <li onClick={handletakehelpclick}>Take Help</li>
          </ul>
        </div>
        <div className={styles.mainsection}></div>
      </div>
    </div>
  );
}

export default DoctorTakeHelp
