import React, { useState, useEffect } from "react";
import "./styles/bike.css";
import Book from "./book";

const bikeImageData = require("../../../data/bike_data.json");

const Bike = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(bikeImageData);
  }, []);

  return (
    <div className="bike-main">
      <div className="bike-container">
        {images.map((image, index) => (
          <div className="div-b" key={index}>
            <img src={image.src} alt={image.alt} />
            <div className="b-hov">
              <Book product={image.product} product_url={image.src} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bike;
