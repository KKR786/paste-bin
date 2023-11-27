import React from 'react'

function Profile() {
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
            <li><button className='btn'>All Pastes</button></li>
            <li><button className='btn'>Account Settings</button></li>
          </ul>
        </div>
      </div>
      <div className="right">
        User info
      </div>
    </div>
  )
}

export default Profile
