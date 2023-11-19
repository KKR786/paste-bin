import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

  const handleSubmit = () => {
    alert('You clicked the button!')
  }
  return (
    <div className='home'>
      <div className="left">
        <h3 className='mb-3'>New Paste</h3>
        <textarea name="paste" id="paste" cols="30" rows="10"></textarea>
        <div className="optional mt-3">
          <h3>Optional Settings</h3>
          <div className="input-group">
            <label htmlFor="catagory">Title:</label>
            <input type="text" name='title'/>
          </div>
          <div className="input-group">
            <label htmlFor="catagory">Catagory:</label>
            <input type="text" name='catagory'/>
          </div>
          <div className="input-group">
            <label htmlFor="expiration">Expiration:</label>
            <input type="text" name='expiration'/>
          </div>
          <div className="input-group">
            <label htmlFor="privacy">Privacy:</label>
            <input type="text" name='privacy'/>
          </div>
          <div className="input-group">
            <label htmlFor="catagory">Password:</label>
            <input type="password" name='password'/>
          </div>
          <button className='btn' onClick={handleSubmit}>Create New Paste</button>
        </div>
      </div>
      <div className="right">
        <h3 className='mb-3'>Public Pastes</h3>
        <ul><li>Paste Name</li></ul>
      </div>
    </div>
  )
}

export default Home
