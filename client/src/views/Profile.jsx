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
            <li>Personal Information</li>
            <li>Friends</li>
            <li>Projects</li>
            <li>All Pastes</li>
            <li>Account Settings</li>
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
