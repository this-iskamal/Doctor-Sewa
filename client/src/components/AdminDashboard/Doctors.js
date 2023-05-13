import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import baseurl from "../../assets/baseurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Doctors.module.css";
import io from "socket.io-client";
const socket = io.connect(`${baseurl}`);

function Doctors() {
  const [query, setQuery] = useState("");
  const [isSpecialitychecked, setIsSpecialitychecked] = useState(false);
  const [isNamechecked, setIsNamechecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [doctordetails, setDoctordetails] = useState([]);

  useEffect(() => {
    socket.on("getdoctor", (getdoctor) => {
      setDoctordetails(getdoctor);
    });
  });

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        try {
          axios.get(`${baseurl}/get-doctor-details`).then((res) => {
            setDoctordetails(res.data.doctordetails);
          });
        } catch (err) {
          console.error(err);
        }
        return;
      }
      try {
        if (isSpecialitychecked) {
          const response = await axios.get(
            `${baseurl}/find-doctors?q=${query}`
          );
          setDoctordetails(response.data.doctors);
        }
        if (isNamechecked) {
          const response = await axios.get(
            `${baseurl}/find-doctors1?q=${query}`
          );
          setDoctordetails(response.data.doctors);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, [query, isSpecialitychecked, isNamechecked]);
  const handledeletedoctor = (id) => {
    axios.delete(`${baseurl}/admin-dashboard/${id}`).then((res) => {
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
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

  const handledashboardclick = () => {
    window.open("/admin-dashboard", "_self");
  };
  const handleverifyappointmentsclick = () => {
    window.open("/admin-dashboard/verify-appointments", "_self");
  };

  const handleverifieddoctorsclick = () => {
    window.open("/admin-dashboard/verify-doctor-list", "_self");
  };

  const handlesearchoperation = (event) => {
    setQuery(event.target.value);
  };

  const handlespecialitychange = () => {
    setIsSpecialitychecked(!isSpecialitychecked);
    if (isNamechecked) setIsNamechecked(!isNamechecked);
  };
  const handlenamechange = () => {
    setIsNamechecked(!isNamechecked);
    if (isSpecialitychecked) setIsSpecialitychecked(!isSpecialitychecked);
  };

  return (
    <div className={styles.containerA}>
      <ToastContainer />

      <div className={styles.headerA}>
        <h3>Admin Portal</h3>
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
          <div className={styles.containerDO}>
            <div className={styles.searchdiv}>
              <input
                className={styles.searchinput}
                type="search"
                placeholder="Search "
                value={query}
                onChange={handlesearchoperation}
              />
              <label>
                <input
                  type="checkbox"
                  checked={isSpecialitychecked}
                  onChange={handlespecialitychange}
                />
                Speciality
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={isNamechecked}
                  onChange={handlenamechange}
                />
                Name
              </label>
            </div>

            {doctordetails?.map((doctordetail) => {
              return (
                <Card
                  className={styles.Cardsec}
                  key={doctordetail.id}
                  style={{
                    width: "17rem",
                    borderRadius: "30px",
                    display: "flex",
                    backgroundColor: "darkblue",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`${baseurl}/${doctordetail.profilePhoto}`}
                    className={styles.imageDO}
                  />
                  <Card.Body>
                    <Card.Title>{doctordetail.name}</Card.Title>
                    <Card.Text>
                      Specialist : {doctordetail.speciality}
                      <br />
                      Status : {doctordetail.condition}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() =>
                        window.open(
                          `/edit-doctor-info/${doctordetail._id}`,
                          "_blank"
                        )
                      }
                      className={styles.buttonondoctor}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handledeletedoctor(doctordetail._id)}
                    >
                      <i class="fa-sharp fa-solid fa-trash"></i>
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
