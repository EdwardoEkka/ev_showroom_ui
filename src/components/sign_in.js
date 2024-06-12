import React, { useState, useEffect } from "react";
import {useGoogleLogin } from "@react-oauth/google";
import axios from "axios"; // Import Axios
import "./styles/sign_in.css"; // Importing CSS file for styling
import { setToken } from "../tokenService";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useUserContext } from "../userContext";
import toast,{Toaster} from "react-hot-toast";

const SignIn = ({ showSign_in, showSign_up, setRefresh}) => {
  const { updateUser } = useUserContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //
  const [user, setUser] = useState(null);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      console.log("hello");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          saveUserToDatabase(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const saveUserToDatabase = (userData) => {
    axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/user-login`, userData)
      .then((response) => {
        console.log("User saved to database:", response.data);
        const { token } = response.data;
        setToken(token);
        setRefresh(true);
        showSign_in();
        toast.success("Logged In Successfully");
      })
      .catch((error) => {
        console.error("Error saving user to database:", error);
      });
  };
  //

  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.trim() === '' || formData.password.trim() === '') {
      toast.error("Please fill in all fields.");
      return; // Exit early if any field is empty
    }

    try {
      // Make POST request to backend API endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/manual-sign_in`,
        formData
      );
      const { token } = response.data;
      setToken(token);
      setRefresh(true);
      showSign_in();
      toast.success("Logged In Successfully");
      console.log("Sign-in successful:", response.data);
      updateUser(response.data.user.email,response.data.user.name,response.data.id);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(error.response.data.message);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div>
    <div className="sign-in-container">
      <div
        style={{ position: "absolute", right: "0px", top: "0", padding: "5px" }}
      >
        <RxCross1
          onClick={() => {
            showSign_in();
          }}
        />
      </div>
      <h2 className="sign-in-heading">Sign In</h2>
      <div
        className="con-google"
        onClick={() => {
          login();
          console.log("hello");
        }}
      >
        <FcGoogle /> Login with Google
      </div>
      <div className="line">
        <div className="or">OR</div>
      </div>
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
          <div className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <BiSolidHide /> : <BiSolidShow />}
          </div>
        </div>
        <button type="submit" className="btn sign-up-btn">
          Sign in
        </button>
      </form>
      <div className="sign-up-redirect">
        <p>
          No account?{" "}
          <span
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => {
              showSign_up();
            }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
    <Toaster/>
    </div>
  );
};

export default SignIn;
