import React from 'react'
import Serviceroute from './Components/Servicemangement/Serviceroute'
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Loginpage from './Components/Authentication/Loginpage';
const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/v/*" element={<Serviceroute />} />
        <Route path='*' element={<Loginpage />}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
