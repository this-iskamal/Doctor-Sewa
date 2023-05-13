import React, { useState , useEffect} from "react";
import styles from "./Patients.module.css";
import baseurl from "../../assets/baseurl";
import axios from "axios";
import io from 'socket.io-client';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const socket = io.connect(`${baseurl}`);


function Patients() {
  const [showMenu, setShowMenu] = useState(false);
  const [patientdetails, setPatientdetails] = useState([]);
  const [query, setQuery] = useState("");
  
  // useEffect(() => {
  //   axios.get(`${baseurl}/admin-dashboard`).then((res) => {
  //     setPatientdetails(res.data.data)
  //   });
  // }, []);
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        try {
          axios.get(`${baseurl}/admin-dashboard`).then((res) => {
            setPatientdetails(res.data.data);
          });
        } catch (err) {
          console.error(err);
        }
        return;
      }
      try {
        
          const response = await axios.get(
            `${baseurl}/find-patient?q=${query}`
          );
          setPatientdetails(response.data.patients);
        
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, [query]);

  useEffect(() => {
    socket.on('data', data => {
      setPatientdetails(data);
    });
  }, []);

  const handlesearchoperation = (event) => {
    setQuery(event.target.value);

  };

  const handledoctorsclick = () => {
    window.open("/admin-dashboard/doctor-list", "_self");
  };

  const handleavailabledoctorsclick = () => {
    window.open("/admin-dashboard/available-doctor-list", "_self");
  };

  const handlepatientsclick = () => {
    window.open("/admin-dashboard/patient-list", "_self");
  };
  const handleverifyappointmentsclick = () =>{
    window.open('/admin-dashboard/verify-appointments','_self')
  }

  const handledashboardclick = () => {
    window.open("/admin-dashboard", "_self");
  };

  const handleverifieddoctorsclick = () => {
    window.open("/admin-dashboard/verify-doctor-list", "_self");
  };
  const handledeletepatient = (id) =>{
    axios.delete(`${baseurl}/admin-dashboard/${id}`)
    .then((res)=>{
      toast.success(res.data.message)
      setTimeout(() => {
        window.location.reload();
    }, 2000);
    })
  }
 
  return (
    <div className={styles.containerA}>
      <div className={styles.headerA}>
      <ToastContainer />

      <h3>List Of Patients</h3>
        <button
          className={styles.menuButton}
          onClick={() => setShowMenu(!showMenu)}
        >
          <h1>=</h1>
        </button>
      </div>
      <div className={styles.sectionA}>
        <div
          className={`${styles.leftsideA} ${showMenu ? styles.showMenu : ""}`}
        >
          <div className={styles.dashboardA} onClick={handledashboardclick}>
            Dashboard
          </div>
          <div className={styles.dashboardA} onClick={handledoctorsclick}>
            Doctors
          </div>
         
          <div
            className={styles.dashboardA}
            onClick={handleavailabledoctorsclick}
          >
            Appointments
          </div>
          <div className={styles.dashboardA} onClick={handlepatientsclick}>
            Patients
          </div>
          <div
            className={styles.dashboardA}
            onClick={handleverifieddoctorsclick}
          >
            Verify Doctors
          </div>
          <div
            className={styles.dashboardA}
            onClick={handleverifyappointmentsclick}
          >
            Verify Appointments
          </div>
        </div>
        <div className={styles.mainbodyA}>
          <div className={styles.mainsectionP}>
          <div className={styles.searchdiv}>
            <input
              className={styles.searchinput}
              type="search"
              placeholder="Search "
              value={query}
              onChange={handlesearchoperation}
            />
            </div>
            
            {patientdetails?.map((patient) => {
              
              return (
                <div className={styles.patientsinfo}>
                  <div className={styles.infosection}>
                    <h4>{patient.username   } {"     "} ({ patient.gender.slice(0,1).toUpperCase()})</h4>
                    <h5>{patient.district}</h5>
                    <h5>{patient.phone}</h5>
                  </div>
                  <div className={styles.editsection}>
                    <button className={styles.greenbackground} onClick={()=>window.open(`/edit-patient-info/${patient._id}`,'_blank')}>
                      <i class="fa-sharp fa-solid fa-user-pen"></i>
                    </button>
                    <button className={styles.redbackground} onClick={()=>handledeletepatient(patient._id)}>
                      <i class="fa-sharp fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patients;
