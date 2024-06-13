import React, { useEffect, useState } from "react";
import "./styles/hero.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Hero_Top from "./hero_top";

const scotterImageData = require("../../../data/scooter_data.json");
const bikeImageData = require("../../../data/bike_data.json");
const rangerImageData = require("../../../data/ranger_data.json");

const Hero = () => {
  const [bikeImages, setBikeImages] = useState([]);
  const [scotterImages, setScotterImages] = useState([]);
  const [rangerImages, setRangerImages] = useState([]);
  
  useEffect(() => {
    setBikeImages(bikeImageData);
    setScotterImages(scotterImageData);
    setRangerImages(rangerImageData);
  }, []);

 

  const [details, setDetails] = useState(0);

  return (
    <div className="main-c">
      <div className="container1">
        <Hero_Top/>
        <div className="written_container">
          <h1>Electric Vehicle Show Room</h1>
          <p>
            Discover the future of transportation with our latest electric
            vehicle models.
          </p>
        </div>
      </div>
      <div className="cont2">
        <div
          onClick={() => {
            setDetails(0);
          }}
        >
          <img src="./images/email.png" alt="email" className="i"></img>
        </div>
        <div
          onClick={() => {
            setDetails(1);
          }}
        >
          <img src="./images/phone-call.png" alt="phone" className="i"></img>
        </div>
        <div
          onClick={() => {
            setDetails(2);
          }}
        >
          <img
            src="./images/location-pin.png"
            alt="location"
            className="i"
          ></img>
        </div>
      </div>
      <div className="details-div">
        {details === 0 ? 
        <div><h5>b**********@gmail.com</h5></div> 
        : 
        details === 1 ?
        <div><h5>891***4394</h5></div> 
        : 
        <div><h5>RMC Road, Near Regulated Market Committee office, Khetrajpur, Sambalpur Odisha 
        Pin code : 768006</h5></div>}
      </div>
      <div className="con-bdy1">
        <div className="cor-img">
          <Carousel
            showIndicators={false}
            showStatus={false}
            infiniteLoop={true}
          >
            {scotterImages.map((image, index) => (
              <div key={index}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="cor-img">
          <Carousel
            showIndicators={false}
            showStatus={false}
            infiniteLoop={true}
          >
            {bikeImages.map((image, index) => (
              <div key={index}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="cor-img">
          <Carousel
            showIndicators={false}
            showStatus={false}
            infiniteLoop={true}
          >
            {rangerImages.map((image, index) => (
              <div key={index}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;
