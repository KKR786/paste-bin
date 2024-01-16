import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../customHooks/useAuthContext";
import { useLogout } from "../customHooks/useLogout";

function Navbar() {
  const location = useLocation();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  
  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleClick = () => {
    logout();
  };

  React.useEffect(() => {
    setDropDownOpen(false);
  }, [location.pathname])

  return (
    <div className="header">
      <div className="container">
        <div className="topbar">
          <Link to="/">
            <img src="" alt="Logo" />
          </Link>
          {!(location.pathname === "/login") && !user && (
            <Link className="btn" to="/login">
              Login/Register
            </Link>
          )}
          {user && (
            <div className="dropdown">
              <Link to="/find-friend">
                <span className="material-symbols-rounded" title="Find friends">
                  group_add
                </span>
              </Link>
              <Link to="/notifications">
                <span
                  className="material-symbols-rounded"
                  title="Notifications"
                >
                  notifications
                </span>
              </Link>
              <div
                className="d-flex align-items-center drop"
                onClick={toggleDropdown}
              >
                <h4>{user.name}</h4>
                <span className="material-symbols-rounded">
                  arrow_drop_down
                </span>
              </div>
              <div className={`dropdown-content ${dropDownOpen ? "show" : ""}`}>
                <div className="drop-item">
                  <Link className="nav-link" to="/profile">
                    <span className="material-symbols-rounded mr-2">
                      account_circle
                    </span>
                    My Profile
                  </Link>
                </div>
                <div className="drop-item">
                  <Link className="nav-link" to="/forms">
                    <span className="material-symbols-rounded mr-2">
                      new_window
                    </span>
                    Create Form
                  </Link>
                </div>
                <div className="drop-item">
                  <button
                    className="dropbtn d-flex align-items-center"
                    onClick={handleClick}
                  >
                    <span className="material-symbols-rounded mr-2">
                      logout
                    </span>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
