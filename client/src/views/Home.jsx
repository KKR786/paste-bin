import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      Welcome Home
      <Link to="/profile">Go to Profile</Link>
    </div>
  )
}

export default Home
