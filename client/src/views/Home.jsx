import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [paste, setPaste] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [expiration, setExpiration] = useState('')
  const [privacy, setPrivacy] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    alert('You clicked the button!')
  }
  return (
    <div className='home'>
      <div className="left">
        <h3 className='mb-3'>New Paste</h3>
        <textarea name="paste" id="paste" cols="30" rows="10" onChange={(e) => setPaste(e.target.value)}></textarea>
        <div className="optional mt-3">
          <h3>Optional Settings</h3>
          <div className="input-group">
            <label htmlFor="title">Title:</label>
            <input type="text" name='title' onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="category">Category:</label>
            <input type="text" name='category' onChange={(e) => setCategory(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="expiration">Expiration:</label>
            <input type="text" name='expiration' onChange={(e) => setExpiration(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="privacy">Privacy:</label>
            <input type="text" name='privacy' onChange={(e) => setPrivacy(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="catagory">Password:</label>
            <input type="password" name='password' onChange={(e) => setPassword(e.target.value)}/>
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
