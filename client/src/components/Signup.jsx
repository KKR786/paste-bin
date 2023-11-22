import { useState } from "react"
import { useRegister } from "../customHooks/useRegister"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {register, error, isLoading} = useRegister()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    await register(email, name, password)
  }

  return (
    <div className="signup-block">
    <div className="signup-box">
    <form className="signup" onSubmit={handleSubmit}>
      <div className="signup-group">
      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      </div>
      <div className="signup-group">
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      </div>
      <div className="signup-group">
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      </div>
      <div className="submit">
          <button disabled={isLoading} className="btn">Create an Account</button>
      </div>
      {error && <div className="error">{error}</div>}
      
    </form>
    </div>
    </div>
  )
}

export default Signup