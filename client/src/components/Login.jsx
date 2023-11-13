import { useState } from "react";
import { useLogin } from "../customHooks/useLogin";

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
    <div className="login-block text-center">
      <div className="login-block-end d-flex align-items-center justify-content-center">
        <div className="login-box">
          <h1 className="text-center mb-3">Login</h1>
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
            <div className="submit " >
              <button className="btn btn-primary w-100" disabled={isLoading}>
                Login
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
      <div className="copyright text-center">All copyrights reserved</div>
      </>
  );
};

export default Login;
