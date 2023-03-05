import React from "react";
import "./Home.css";
import image1 from "../../assets/images/1.png.png";
import image2 from "../../assets/images/2.png.png";
import image3 from "../../assets/images/3.png.png";
import image4 from "../../assets/images/4.png.png";
import image5 from "../../assets/images/5.png.png";
import Carousel from "react-multi-carousel";
import easy from "../../assets/images/easy.jpg";
import onlinepayment from "../../assets/images/onlinepayment.jpg";
import schedule from "../../assets/images/schedule.jpg";
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
      <div className="container">
        <h1>Search Doctors, Make an Appointment</h1>
        <h3>Discover The Best Doctor Near You</h3>
        <div className="sliding-profile">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={3000}
            infinite={true}
          >
            <div className="imagesection">
              <img src={image1} alt="" />
            </div>
            <div className="imagesection">
              <img src={image2} alt="" />
            </div>
            <div className="imagesection">
              <img src={image3} alt="" />
            </div>
            <div className="imagesection">
              <img src={image4} alt="" />
            </div>
            <div className="imagesection">
              <img src={image5} alt="" />
            </div>
          </Carousel>
        </div>
        <div className="services">
          <h1>Our Services</h1>
          <div className="servicess">
            <div className="service1">
              <div className="photo">
                <img src={schedule} alt="" />
              </div>
              <h3>Scheduling Services</h3>
            </div>
            <div className="service2">
              <div className="photo">
                <img src={onlinepayment} alt="" />
              </div>
              <h3>Online Payment</h3>
            </div>
            <div className="service3">
              <div className="photo">
                <img src={easy} alt="" />
              </div>
              <h3>Easy and Convienince</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
