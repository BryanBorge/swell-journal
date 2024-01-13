import React, { useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
        navigate("/login");
      })
      .catch(error => {
        // An error happened.
        console.log("Signed out error", error);
      });
  }, []);

  return <></>;
};

export default Logout;
