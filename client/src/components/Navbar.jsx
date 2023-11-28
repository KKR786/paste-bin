import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../customHooks/useAuthContext";
import { useLogout } from "../customHooks/useLogout";

function Navbar() {
  const location = useLocation();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  console.log(!(location.pathname === "/login"));
  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  const handleClick = () => {
    logout();
  };

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
              <span className="material-symbols-rounded">notifications</span>
              <div
                className="d-flex align-items-center drop"
                onClick={toggleDropdown}
              >
                <span>User Name</span>
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
                  <Link className="nav-link" to="/profile">
                    <span className="material-symbols-rounded mr-2">
                      account_circle
                    </span>
                    My Profile
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
