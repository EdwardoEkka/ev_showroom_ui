import React from "react";
import "./styles/hero_top.css";
import { useNavigate } from "react-router-dom";

const Hero_Top = () => {
  const navigate=useNavigate();

  return (
    <div className="main-container">
      <div className="top-con">
        <div className="left">
          <div className="heads">
            <h3>BEST DEALER</h3>
            <h4>FOR YOU NEAR</h4>
          </div>
          <div className="para">
            <p>Welcome to our Electric Vehicle Showroom in Sambalpur, your go-to showroom for top-quality electric bikes and scooters, We offer a diverse range of eco-friendly vehicles to suit every need and lifestyle.</p>
          </div>
          <div className="button-container">
            <button onClick={()=>{navigate('/contact')}}>Contact Now!</button>
          </div>
          <div className="appointment">
            <p>Do you have a question or would you like to schedule an <span onClick={()=>{navigate('/contact')}}>Appointment?</span></p>
          </div>
          <div className="det-container">
            <div className="d-c">
              <div className="d-c-1">

              </div>
              <div className="d-c-2">
                <p>10+</p>
                <p>variants</p>
              </div>
            </div>
            <div className="d-c">
              <div className="d-c-1">

              </div>
              <div className="d-c-2">
                <p>10+</p>
                <p>variants</p>
              </div>
            </div>
            <div className="d-c">
              <div className="d-c-1">

              </div>
              <div className="d-c-2">
                <p>10+</p>
                <p>variants</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-img">
            <img className="main-komaki" src="https://komaki.in/wp-content/uploads/2020/10/site_logo.png" alt="komaki"></img>
            <img src="https://firebasestorage.googleapis.com/v0/b/ev-showroom.appspot.com/o/komaki.png?alt=media&token=ad7a2304-587c-4e99-8825-d74632d875c7" alt="komaki"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero_Top;
