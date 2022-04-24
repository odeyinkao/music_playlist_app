import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const AuthScreen = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="register" element={<SignUp />} />
      </Routes>
    </>
  )
};

export default AuthScreen;