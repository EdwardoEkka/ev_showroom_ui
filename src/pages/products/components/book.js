import "./styles/book.css";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../../../userContext";
import axios from "axios";

const Book = ({ product }) => {
  const {user}=useUserContext();



  const handleBookVehicle = async () => {
    if (user.email===null && user.name===null) {
      toast.error("You need to login first.");
      return;
    }
  
    try {
      // Send formData to your backend API
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/book-vehicle`,
        { product, email: user.email, name: user.name, userId: user.userId }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to book vehicle. Please try again later.");
      }
    }
  };

  return (
    <div className="main-book">
      <p>{product}</p>
      <button
        className="book-button"
        onClick={() => {
         handleBookVehicle();
        }}
      >
        Book
      </button>
      <Toaster />
    </div>
  );
};

export default Book;
