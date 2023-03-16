import React from "react";
import styles from "./Home.module.css";
import image1 from "../../assets/images/1.png.png";
import image2 from "../../assets/images/2.png.png";
import image3 from "../../assets/images/3.png.png";
import image4 from "../../assets/images/4.png.png";
import image5 from "../../assets/images/5.png.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from "../../components/Header/Header";

function Home() {

  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
    <Header/>
      <div className={styles.container}>
        <h1>Search Doctors, Make an Appointment</h1>
        <h3>Discover The Best Doctor Near You</h3>
        <div className={styles.slidingprofile}>
          <h2>Appointments with top doctors</h2>
          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={3000}
            infinite={true}
          >
            <div className={styles.imagesection}>
              <img src={image1} alt="" />
            </div>
            <div className={styles.imagesection}>
              <img src={image2} alt="" />
            </div>
            <div className={styles.imagesection}>
              <img src={image3} alt="" />
            </div>
            <div className={styles.imagesection}>
              <img src={image4} alt="" />
            </div>
            <div className={styles.imagesection}>
              <img src={image5} alt="" />
            </div>
          </Carousel>
        </div>
          <div className={styles.lowersection}>
              <div className={styles.likecards}>
                
              </div>
              <div className={styles.likecards}>
                
              </div>
              <div className={styles.likecards}>
                
              </div>
          </div>
      </div>
    </>
  );
}

export default Home;
