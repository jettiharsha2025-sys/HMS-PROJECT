import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllScans from './AllScans'
import AddScans from './AddScans'
import ViewScans from './ViewScans'

const ScansRoute = () => {
  return (
    <Routes>
      <Route path='*'            element={<AllScans />} />
      <Route path='allscans'     element={<AllScans />} />
      <Route path='addscan'      element={<AddScans />}  />
      <Route path='viewscan/:id' element={<ViewScans />} />
      <Route path='editscan/:id' element={<AddScans />}  />
    </Routes>
  )
}

export default ScansRoute