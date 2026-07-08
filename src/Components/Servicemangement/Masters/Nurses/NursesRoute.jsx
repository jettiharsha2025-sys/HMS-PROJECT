import React from "react";
import { Routes, Route } from "react-router-dom";
import AllNurses  from "./AllNurses";
import AddNurses  from "./AddNurses";
import ViewNurses from "./ViewNurses";

const NursesRoute = () => {
  return (
    <Routes>
      <Route path="*"               element={<AllNurses />} />
      <Route path="allnurses"       element={<AllNurses />} />
      <Route path="addnurses"       element={<AddNurses />} />
      <Route path="viewnurses/:id"  element={<ViewNurses />} />
      <Route path="editnurses/:id"  element={<AddNurses />} />
    </Routes>
  );
};

export default NursesRoute;