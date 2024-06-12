import React, { useState, useEffect } from "react";
import "./styles/others.css"; // Import the CSS file
import Book from "./book";

const othersImageData = require("../../../data/others_data.json");

const Others = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(othersImageData);
  }, []);

  return (
    <div className="others-main">
      <div className="others-container">
        {images.map((image, index) => (
          <div className="div-o" key={index}>
            <img src={image.src} alt={image.alt} />
            <div className="o-hov">
              <Book product={image.product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Others;
