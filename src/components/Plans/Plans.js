import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import PlanDetails from "./PlanDetails";
import PlanForm from "./PlanForm";
import PlanList from "./PlanList";

const Plans = () => {
  return(
    <div>
      <Routes>             
        <Route path="" element={<PlanList />} />
        <Route path="new" element={<PlanForm />} /> 
        <Route path=":planId/details" element={<PlanDetails />} /> 
        <Route path=":planId/edit" element={<PlanForm />} /> 
      </Routes>
      <Outlet />
    </div>
  )
};

export default Plans;