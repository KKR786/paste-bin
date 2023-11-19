import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const location = useLocation();


  return (
    <div className='header'>
      <div className="container">
        <div className="topbar">
            <Link to='/'><img src="" alt="Logo" /></Link>
            {location.pathname!=='/login' && <Link className='btn' to="/login">Login/Register</Link>}
        </div>
      </div>
    </div>
  )
}

export default Navbar
