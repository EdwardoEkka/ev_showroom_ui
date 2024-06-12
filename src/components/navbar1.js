import "./styles/navbar1.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken, removeToken } from "../tokenService";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../userContext";

const Navbar1 = ({ Products, showSign_in, refresh }) => {
  const { updateUser } = useUserContext();
  const [showDet, setShowDet] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserDetails = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/user-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserDetails(response.data);
      updateUser(response.data.email, response.data.name, response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [refresh]);

  const handleLogout = () => {
    removeToken();
    setUserDetails(null);
    updateUser(null, null, null);
    toast.success("Logged Out");
  };

  return (
    <div className="nav1-main" style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ul
          className="item1-container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            listStyle: "none",
            gap: "20px",
          }}
        >
          <li
            className="n1-li"
            onClick={() => {
              navigate("/");
            }}
          >
            HOME
            <IoIosArrowDown />
          </li>
          <li
            onClick={() => {
              navigate("/products");
            }}
            className="n1-li"
          >
            PRODUCTS
            <IoIosArrowDown />
          </li>
          <li
            className="n1-li"
            onClick={() => {
              navigate("/gallery");
            }}
          >
            GALLERY
            <IoIosArrowDown />
          </li>
          <li
            className="n1-li"
            onClick={() => {
              navigate("/contact");
            }}
          >
            CONTACT
            <IoIosArrowDown />
          </li>
          <li
            className="n1-li"
            onClick={() => {
              navigate("/cart");
            }}
          >
            CART
            <IoIosArrowDown />
          </li>
        </ul>
        <div className="login1-signup1">
          {userDetails ? (
            <div>
              {userDetails ? (
                <div
                  className="con1"
                  onClick={() => {
                    setShowDet(!showDet);
                  }}
                >
                  {userDetails.name.toUpperCase()[0]}
                </div>
              ) : (
                ""
              )}
              {showDet ? (
                <div className="logout-btn1">
                  <div className="mes">
                    <p>Logged in as {userDetails.name}</p>
                    <p
                      onClick={() => {
                        handleLogout();
                        setShowDet(!showDet);
                      }}
                    >
                      Logout
                      <IoIosLogOut />
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="login-btn1">
              <img
                src="./images/profile.png"
                alt="profile"
                style={{ width: "25px", padding: "15px" }}
                onClick={() => {
                  showSign_in();
                }}
              />
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar1;
