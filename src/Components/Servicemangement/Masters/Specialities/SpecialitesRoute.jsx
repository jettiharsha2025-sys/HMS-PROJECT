import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AllSpecialities from './AllSpecialities'
import AddSpeciality   from './AddSpecialites'
import ViewSpeciality  from './ViewSpecialites'

const SpecialitiesRoute = () => {
  return (
    <Routes>
      <Route path='*'                  element={<AllSpecialities />} />
      <Route path='allspecialities'    element={<AllSpecialities />} />
      <Route path='addspeciality'      element={<AddSpecialites />}  />
      <Route path='viewspeciality/:id' element={<ViewSpecialites />} />
      <Route path='editspeciality/:id' element={<AddSpecialites />}  />
    </Routes>
  )
}

export default SpecialitiesRoute