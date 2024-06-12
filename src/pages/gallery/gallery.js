import { useState } from "react";
import React from "react";
import Navbar from "../../components/navbar";
import "./gallery.css";
import Footer from "../../components/footer";
import SignUp from "../../components/sign_up";
import SignIn from "../../components/sign_in";

const Gallery = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [sign_in, setSign_in] = useState(false);
  const [sign_up, setSign_up] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [s_open, setS_open]=useState(true);
  
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

  const open=()=>{
    setS_open(!s_open);
  }

  return (
    <div
      className="full"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0",
        position: "relative",
      }}
    >
      {sign_in ? (
        <SignIn
          showSign_in={showSign_in}
          showSign_up={showSign_up}
          setRefresh={() => setRefresh(!refresh)}
     
        />
      ) : (
        ""
      )}
      {sign_up ? <SignUp close_sign_up={close_sign_up}/> : ""}
      <Navbar
        Products={ShowProducts}
        Products1={ShowProducts}
        showSign_in={showSign_in}
        Refresh={refresh}
        open={open}
      />
      <div>
      <div className="shop">
      <div className="shop-pic">

        <img className="item-1" src="./images/shop5.jpeg" alt="shop5" />
        <img className="item-2" src="./images/shop1.jpeg" alt="shop1" />
        <img className="item-3" src="./images/shop2.jpeg" alt="shop2" />
        <img className="item-4" src="./images/shop3.jpeg" alt="shop3" />
        <img className="item-5" src="./images/shop4.jpeg" alt="shop4" />
      </div>
      </div>
      <div style={{ marginTop: "auto" }}>
      <Footer />
      </div>
    </div>
    </div>
  );
};

export default Gallery;
