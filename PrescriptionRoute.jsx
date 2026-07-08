import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllPrescription from './AllPrescription'
import AddPrescription from './AddPrescription'
import ViewPrescription from './ViewPrescription'

const PrescriptionRoute = () => {
  return (
    <Routes>
      <Route path='*'                    element={<AllPrescription />} />
      <Route path='allprescription'      element={<AllPrescription />} />
      <Route path='addprescription'      element={<AddPrescription />}  />
      <Route path='viewprescription/:id' element={<ViewPrescription />} />
      <Route path='editprescription/:id' element={<AddPrescription />}  />
    </Routes>
  )
}

export default PrescriptionRoute