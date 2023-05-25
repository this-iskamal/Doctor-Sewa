import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
// import left from "../../assets/images/Bishes.jpg";
import styles from "./FindDoctors.module.css";
import baseurl from '../../assets/baseurl'

// import specialities from "../../assets/data/specialities.json";

function FindDoctors() {
  const [namee, setNamee] = useState("");
  const [doctordetails, setDoctordetails] = useState([]);
  
  const [isSpecialitychecked, setIsSpecialitychecked] = useState(false);
  const [isNamechecked, setIsNamechecked] = useState(false);
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false);

  // const [doctordetails, setDoctordetails] = useState([]);

  
  const [query, setQuery] = useState("");
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

  // useEffect(()=>{
  //   const fetchResults = async ()=>{
  //     axios.get(`${baseurl}/find-doctors?q=${query}`)
  //     .then((res)=>{
  //       setResults(res.data.doctors);
  //     })
  //   }
  //   if (query) {
  //     fetchResults();
  //   } else {
  //     setResults([]);
  //   }
  // },[query])



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

  // useEffect(() => {
  //   axios.get(`${baseurl}/get-doctor-details`).then((res) => {
  //     setDoctordetails(res.data.doctordetails);
  //   });
  // }, []);

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

  const handletakeappointment = (id1) => {
    window.open(`/book-appointment/${id1}/${id}`, "_blank");
  };
  const handlesearchoperation = (event) => {
    setQuery(event.target.value);

  };
  const handlebuttonclick = () => {
    //
    navigate(`/patient-dashboard/${id}`);
    //
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
            
          </ul>
        </div>
        <div className={styles.mainsection}>
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
                    width: "18rem",
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
                    <Card.Title>
                      <div
                        className={
                          doctordetail.date ? styles.active : styles.notactive
                        }
                      ></div>
                      {doctordetail.name}
                    </Card.Title>
                    <Card.Text>
                      Specialist : {doctordetail.speciality}
                      <br />
                      
                      Status : {doctordetail.condition}
                    </Card.Text>
                    <Button
                      variant="primary"
                      style={{marginBottom:'5px'}}
                      className={styles.buttonondoctor}
                      onClick={() => window.open(`/doctor-profile-page/${doctordetail._id}/${id}`)}
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="primary"
                      className={styles.buttonondoctor}
                      onClick={() => handletakeappointment(doctordetail._id)}
                    >
                      Take Appointment
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

export default FindDoctors;
