import { useState } from 'react'
import './App.css'
import Login from './LoginComponent/Login'
import Signup from './SignupComponent/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import RestaurantsDashboard from './RestaurantsDashboard/RestaurantsDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/restaurants/*" element={<RestaurantsDashboard/>} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
