import "./styles/navbar0.css";
import axios from "axios";
import { getToken, removeToken } from "../tokenService";
import { RxCross1 } from "react-icons/rx";
import { IoIosLogIn } from "react-icons/io";
import React, { useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../userContext";

const Navbar0 = ({
  isOpen,
  onClose,
  Products1,
  showSign_in,
  refresh,
  open,
}) => {
  const [lsize, setLsize] = useState(isOpen ? 0 : -250);
  const [userDetails, setUserDetails] = useState(null);
  const { updateUser } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    setLsize(isOpen ? 0 : -250);
  }, [isOpen]);

  const closeSidebar = () => {
    setLsize(-250);
    onClose();
  };

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
      console.log(response.data);
      updateUser(response.data.email,response.data.name,response.data.id);
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
    updateUser(null,null,null);
    toast.success("Logged Out");
  };

  return (
    <div>
      <div className="sidebar" style={{ left: `${lsize}px` }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "15px",
            paddingRight: "15px",
          }}
        >
          <RxCross1
            onClick={() => {
              closeSidebar();
              open();
            }}
          />
        </div>
        <ul>
          <li
            onClick={() => {
              navigate("/");
              closeSidebar();
              open();
            }}
          >
            HOME
          </li>
          <li
            onClick={() => {
              closeSidebar();
              open();
              navigate("/products");
            }}
          >
            PRODUCTS
          </li>
          <li
            onClick={() => {
              closeSidebar();
              open();
              navigate("/gallery");
            }}
          >
            GALLERY
          </li>
          <li
            onClick={() => {
              closeSidebar();
              open();
              navigate("/contact");
            }}
          >
            CONTACT US
          </li>
          <li onClick={() => {
              closeSidebar();
              open();
              navigate("/cart");
            }}>CART</li>
        </ul>
        <div className="login-signup">
          {userDetails ? (
            <div className="con">
              <img
                src="./images/profile.png"
                alt="profile"
                style={{ width: "25px", padding: "15px" }}
                onClick={() => {}}
              />
              {userDetails.name.toUpperCase()}
              <div className="logout-btn">
                <IoIosLogOut
                  onClick={() => {
                    handleLogout();
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="login-btn">
              <img
                src="./images/profile.png"
                alt="profile"
                style={{ width: "25px", padding: "15px" }}
                onClick={() => {
                  showSign_in();
                  closeSidebar();
                }}
              />
              <span
                onClick={() => {
                  showSign_in();
                  closeSidebar();
                }}
              >
                Login
              </span>
              <IoIosLogIn
                onClick={() => {
                  showSign_in();
                  closeSidebar();
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

export default Navbar0;
