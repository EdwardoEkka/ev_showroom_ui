import React, { useState, useEffect } from "react";
import "./styles/scotter.css"; // Import the CSS file
import Book from "./book";

const scotterImageData = require("../../../data/scooter_data.json");

const Scotter = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(scotterImageData);
  }, []);

  return (
    <div className="scotter-main">
      <div className="scotter-container">
        {images.map((image, index) => (
          <div className="div-s" key={index}>
            <img src={image.src} alt={image.alt} />
            <div className="s-hov">
            <Book product={image.product}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scotter;
