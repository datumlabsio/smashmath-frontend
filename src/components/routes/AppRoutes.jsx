import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ParentDashboard from "../pages/ParentDashboard";
import Parent from "../Parent";
import School from "../School";
import SignUp from "../SignUp";
import Login from "../Login";
import SchoolParent from "../SchoolParent";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/about" element={<div>
        {import.meta.env.MODE} Build version: 0.0.1
      </div>} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/parent-dashboard" element={<Parent />} />
        <Route path="/school-dashboard" element={<School />} />
        <Route path="/extra-dashboard" element={<SchoolParent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
