import { useState } from "react";
import { useLogin } from "../customHooks/useLogin";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();
  console.log("email: ", email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

  };

  return (
    <>
    <div className="login-block">
        <div className="login-box">
          {/* <h1 className="mb-3">Login</h1> */}
          <form onSubmit={handleSubmit}>
            <div className="login-group">
              <label>Email:</label>
              <input
                type="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-group">
              <label>Password:</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="submit" >
              <button className="btn" disabled={isLoading}>
                Login
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
          <Link to='/signup' className="signup btn mt-3">Create new account</Link>
        </div>
      </div>
      <div className="copyright text-center">All copyrights reserved</div>
      </>
  );
};

export default Login;
