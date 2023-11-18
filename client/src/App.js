// Import necessary modules and components
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./customHooks/useAuthContext";
import Home from "./views/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./views/Profile";

function PrivateRoute({ slug, setRedirectTo }) {
  const { user } = useAuthContext();
  useEffect(() => {
    // Set the redirectTo state when the user is not authenticated
    if (!user) {
      setRedirectTo(slug);
    }
  }, [user, slug, setRedirectTo]);
  return <Navigate to='/login' />
}

function App() {
  const { user } = useAuthContext();
  const [redirectTo, setRedirectTo] = useState(null);

  const updateRedirectTo = (slug) => {
    setRedirectTo(slug);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={!user ? <PrivateRoute slug='/profile' setRedirectTo={updateRedirectTo}/> : <Profile />} />
          <Route path="/login" element={!user ? <Login /> : (!redirectTo ? <Navigate to='/' /> : <Navigate to={redirectTo} />)} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
