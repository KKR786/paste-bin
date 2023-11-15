import { useState } from "react"
import { useRegister } from "../hooks/useRegister"

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
    <div className="signup-box mt-5">
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="text-center">Create New Account</h3>
      
      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label className="mt-3">Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <div className="btn">
          <button disabled={isLoading} className="register">Create an Account</button>
      </div>
      {error && <div className="error">{error}</div>}
      
    </form>
    </div>
  )
}

export default Signup