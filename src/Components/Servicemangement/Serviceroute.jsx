import React from 'react'
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import Dashboard from './Masters/Dashboard/Dashboard'
import DoctorsRoute from './Masters/Doctors/DoctorsRoute'
import PatientRoute from './Masters/Patients/PatientRoute'
import NursesRoute from './Masters/Nurses/NursesRoute'
import PrescriptionRoute from './Masters/Prescription/PrescriptionRoute'
import SpecialitesRoute from './Masters/Specialities/SpecialitesRoute'
import UsersRoute from './Masters/Users/UsersRoute'
import MedicationsRoute from './Masters/Medications/MedicationsRoute'
import ScansRoute from './Masters/Scans/ScansRoute'
import TestsRoute from './Masters/Tests/TestsRoute'

const Serviceroute = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* ── Sidebar (fixed left) ── */}
      <Sidebar />

      {/* ── Right side: Navbar + Content ── */}
      <div style={{
        marginLeft: '220px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}>

        {/* ── Navbar (fixed top) ── */}
        <div style={{
          height: '76px',
          flexShrink: 0,
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#fff',
        }}>
          <Navbar />
        </div>

        {/* ── Page Content ── */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#f9fafb',
        }}>
          <Routes>
            
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='patients/*' element={<PatientRoute />} />
              <Route path='doctors/*' element={<DoctorsRoute />} />
              <Route path='nurses/*' element={<NursesRoute />} />
              <Route path='specialities/*' element={<SpecialitesRoute />} />
              <Route path='users/*' element={<UsersRoute />} />
              <Route path='medications/*' element={<MedicationsRoute />} />
              <Route path='prescription/*' element={<PrescriptionRoute   />} />
              <Route path='scans/*' element={<ScansRoute />} />
              <Route path='tests/*' element={<TestsRoute />} />
              <Route path='*' element={<Dashboard />} />
            
          </Routes>
        </div>

      </div>
    </div>
  )
}

export default Serviceroute