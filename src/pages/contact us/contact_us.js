import React, { useState } from "react";
import "./contact_us.css";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import SignUp from "../../components/sign_up";
import SignIn from "../../components/sign_in";
import Navbar from "../../components/navbar";


const Conatct_Us = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        setError(`Please enter your ${key.replace(/([A-Z])/g, " $1").trim()}.`);
        toast.error(`Please enter your ${key.replace(/([A-Z])/g, " $1").trim()}.`);
        return;
      }
    }
    setError("");
    try {
      // Send formData to your backend API
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/contact-us`,
        formData
      );
      console.log(response.data);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      // Handle error if request fails
      setError("Failed to submit form. Please try again later.");
      toast.error("Failed to submit form. Please try again later.");
    }
  };

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
      <div className="c_u_main">
        <div className="c_container">
          <div
            style={{
              position: "absolute",
              right: "0px",
              top: "0",
              padding: "5px",
            }}
          >
            <RxCross1
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          <div className="c_text">
            <h2>Contact Sales</h2>
            <p>
              Let's get this conversation started. Tell us a bit about yourself,
              and we'll get in touch as soon as we can.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="c_in_1">
              <div className="c_in_1_1">
                <label htmlFor="textInput1">First Name</label>
                <input
                  type="text"
                  id="textInput1"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="c_in_1_2">
                <label htmlFor="textInput2">Last Name</label>
                <input
                  type="text"
                  id="textInput2"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="c_in_2">
              <div className="c_in_2_1">
                <label htmlFor="textInput3">Working Email</label>
                <input
                  type="text"
                  id="textInput3"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="c_in_2_2">
                <label htmlFor="textInput5">Phone Number</label>
                <input
                  type="text"
                  id="textInput5"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="c_message">
              <label htmlFor="textInput4">Message</label>
              <textarea
                id="textInput4"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="sub_btn">
              <button type="submit">Contact Sales</button>
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Conatct_Us;
