import { useState } from "react";
import React from "react";
import Navbar from "../../components/navbar";
import "./home.css";
import Hero from "./components/hero";
import Footer from "../../components/footer";
import SignUp from "../../components/sign_up";
import SignIn from "../../components/sign_in";

// import Toaster from "./toaster";


const Home = () => {
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
      <Hero />
      <div style={{ marginTop: "auto" }}>
      <Footer />
      </div>
    </div>
    </div>
  );
};

export default Home;
