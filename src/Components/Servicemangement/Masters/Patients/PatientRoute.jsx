import React from 'react'
import AllPatients from './AllPatients'
import { Route, Routes } from "react-router-dom";
import AddPatients from './AddPatients';
import ViewPatients from './ViewPatients';

const PatientRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="allpatients" element={<AllPatients/>}/>
        <Route path="addpatient" element={<AddPatients/>}/>
        <Route path="viewpatient/:id" element={<ViewPatients/>}/>
      </Routes>
    </div>
  )
}

export default PatientRoute
