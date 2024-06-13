import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SignUp from "../../components/sign_up";
import SignIn from "../../components/sign_in";
import { useUserContext } from "../../userContext";
import "./cart.css";
import toast, { Toaster } from "react-hot-toast";
import Log from "../../components/log";

const Cart = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [sign_in, setSign_in] = useState(false);
  const [sign_up, setSign_up] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [s_open, setS_open] = useState(true);
  const { user } = useUserContext();

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

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/get-bookings/${user.userId}`
      );
      setBookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    if (!user.userId) {
      return;
    }
    fetchCart();
  }, [user.userId]);

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_API_URL}/delete-booking/${bookId}`
      );
      toast.success(response.data.message);
      fetchCart();
    } catch (error) {
      console.error("Error deleting:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete. Please try again later.");
      }
    }
  };

  return (
    <div>
      {sign_in && (
        <SignIn
          showSign_in={showSign_in}
          showSign_up={showSign_up}
          setRefresh={() => setRefresh(!refresh)}
        />
      )}
      {sign_up && <SignUp close_sign_up={close_sign_up} />}
      <Navbar
        Products={ShowProducts}
        Products1={ShowProducts}
        showSign_in={showSign_in}
        Refresh={refresh}
        open={open}
      />
      {user.name === null && user.userId === null ? (
        <Log />
      ) : (
        <div className="c-main">
          <div className="c-container">
            {bookings.length === 0 ? (
              <div style={{ height: "100vh", width: "100%", textAlign: "center" }}>
                Your Cart is empty.
              </div>
            ) : (
              bookings.map((item, index) => (
                <div className="div-c" key={index}>
                  <img src={item.product_url} alt={item.product} />
                  <div className="c-hov">
                    <button
                      className="delete-book-button"
                      onClick={() => handleDelete(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
      <Toaster />
    </div>
  );
};

export default Cart;
