// Import necessary modules and components
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Form } from "react-router-dom";
import { useAuthContext } from "./customHooks/useAuthContext";
import Home from "./views/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./views/Profile";
import Navbar from "./components/Navbar";
import FindFriends from "./views/FindFriends";
import Notifications from "./views/Notifications";
import Forms from "./views/Forms";
import NewForm from "./components/NewForm";

function PrivateRoute({ slug, setRedirectTo }) {
  const { user } = useAuthContext();
  useEffect(() => {
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={!user ? <PrivateRoute slug='/profile' setRedirectTo={updateRedirectTo}/> : <Profile />} />

          <Route path="/forms" element={!user ? <PrivateRoute slug='/forms' setRedirectTo={updateRedirectTo}/> : <Forms />} />

          <Route path="/forms/new" element={!user ? <PrivateRoute slug='/forms/new' setRedirectTo={updateRedirectTo}/> : <NewForm />} />

          <Route path="/find-friend" element={!user ? <PrivateRoute slug='/find-friend' setRedirectTo={updateRedirectTo}/> : <FindFriends />} />

          <Route path="/notifications" element={!user ? <PrivateRoute slug='/notifications' setRedirectTo={updateRedirectTo}/> : <Notifications />} />

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
