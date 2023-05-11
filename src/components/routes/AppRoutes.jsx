import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ParentDashboard from "../pages/ParentDashboard";
import Parent from "../Parent";
import School from "../School";
import SignUp from "../SignUp";
import Login from "../Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
         
       
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/parent-dashboard" element={<Parent />} />
        <Route path="/school-dashboard" element={<School />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
