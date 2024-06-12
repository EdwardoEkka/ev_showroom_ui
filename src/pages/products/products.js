// Products.jsx
import { MdArrowBackIosNew } from "react-icons/md";
import React, { useState } from "react";
import Scotter from "./components/scotter";
import Others from "./components/others";
import Bike from "./components/bike";
import "./products.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import SignUp from "../../components/sign_up";
import SignIn from "../../components/sign_in";
import Navbar from "../../components/navbar";


const Products = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("scotter");
  const navigate = useNavigate();

  //
  const [showProducts, setShowProducts] = useState(false);
  const [sign_in, setSign_in] = useState(false);
  const [sign_up, setSign_up] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [s_open, setS_open] = useState(true);

  

  const ShowProducts = () => {
    setShowProducts(!showProducts);
  };

  const showSign_in = () => {
    setSign_in(!sign_in);
  };

  const showSign_up = () => {
    setSign_in(false);
    setSign_up(true);
  };

  const close_sign_up = () => {
    setSign_in(true);
    setSign_up(false);
  };

  const open = () => {
    setS_open(!s_open);
  };
  const renderSelectedVehicle = () => {
    switch (selectedVehicle) {
      case "scotter":
        return <Scotter/>;
      case "others":
        return <Others/>;
      case "bike":
        return <Bike/>;
      default:
        return null;
    }
  };

  return (
    <div>
      <>
        {sign_in ? (
          <SignIn
            showSign_in={showSign_in}
            showSign_up={showSign_up}
            setRefresh={() => setRefresh(!refresh)}
          />
        ) : (
          ""
        )}
        {sign_up ? (
          <SignUp
            close_sign_up={close_sign_up}
          />
        ) : (
          ""
        )}
        <Navbar
          Products={ShowProducts}
          Products1={ShowProducts}
          showSign_in={showSign_in}
          Refresh={refresh}
          open={open}
        />
      </>
      <div className="products-container">
        <div className="menu-container">
          <div className="menu-items">
            <MdArrowBackIosNew
              style={{ position: "absolute", left: "0", padding: "10px" }}
              onClick={() => {
                navigate("/");
              }}
            />
            <p
              onClick={() => setSelectedVehicle("scotter")}
              className={selectedVehicle === "scotter" ? "selected" : ""}
            >
              SCOTTER
            </p>
            <p
              onClick={() => setSelectedVehicle("bike")}
              className={selectedVehicle === "bike" ? "selected" : ""}
            >
              BIKE
            </p>
            <p
              onClick={() => setSelectedVehicle("others")}
              className={selectedVehicle === "others" ? "selected" : ""}
            >
              OTHERS
            </p>
          </div>
        </div>
        <div className="selected-vehicle">{renderSelectedVehicle()}</div>
      </div>
    </div>
  );
};

export default Products;
