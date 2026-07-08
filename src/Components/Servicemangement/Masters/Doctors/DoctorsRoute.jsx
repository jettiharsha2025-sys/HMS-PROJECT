import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllDoctors  from './AllDoctors'
import AddDoctors  from './AddDoctors'
import ViewDoctors from './ViewDoctors'

const DoctorsRoute = () => {
  return (
    <Routes>
      <Route path='*'              element={<AllDoctors />}       />
      <Route path='alldoctors'     element={<AllDoctors />}       />
      <Route path='adddoctor'      element={<AddDoctors />}       />
      <Route path='viewdoctor/:id' element={<ViewDoctors />}      />
      <Route path='editdoctor/:id' element={<AddDoctors />}       />
    </Routes>
  )
}

export default DoctorsRoute