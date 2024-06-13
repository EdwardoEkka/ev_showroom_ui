import React, { useState } from "react";
import "./styles/book.css";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../../../userContext";
import axios from "axios";

const Book = ({ product,product_url}) => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleBookVehicle = async () => {
    if (!user.email && !user.name) {
      toast.error("You need to login first.");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      // Send formData to your backend API
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/book-vehicle`,
        { product, email: user.email, name: user.name, userId: user.userId, product_url}
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to book vehicle. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className="main-book">
      <p>{product}</p>
      <button
        className="book-button"
        onClick={handleBookVehicle}
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? "Booking..." : "Book"}
      </button>
      <Toaster />
    </div>
  );
};

export default Book;
