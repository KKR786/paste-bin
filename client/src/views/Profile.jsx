import React, {useState} from 'react'
import Pastes from '../components/Pastes'

function Profile() {
  const [pastes, setPastes] = useState(false)

  return (
    <div className='profile'>
      <div className="left">
        <div className="dp">
          <img src="" alt="User Photo" />
        </div>
        <div className="options">
          <ul className="profile-nav">
            <li><button className='btn'>Personal Information</button></li>
            <li><button className='btn'>Friends</button></li>
            <li><button className='btn'>Projects</button></li>
            <li><button className='btn' onClick={() => setPastes(true)}>All Pastes</button></li>
            <li><button className='btn'>Account Settings</button></li>
          </ul>
        </div>
      </div>
      <div className="right">
        {pastes &&
          <Pastes />
        }
      </div>
    </div>
  )
}

export default Profile
