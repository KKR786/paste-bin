import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='header'>
      <div className="container">
        <div className="topbar">
            <img src="" alt="Logo" />
            <Link className='btn' to="/login">Login/Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
