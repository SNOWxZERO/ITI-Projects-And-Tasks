import authServiceInstance from "../services/Auth";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User } from "../Context/UserContext";
import React, { useContext } from "react";
import Cookies from "universal-cookie";
import "../index.css"
import logo from "../assets/pic5.jpg";


export default function NavBar() {
  const history = useLocation ();

const isActive = ( path: string) => {
  if (history.pathname === path) return {borderBottom: '4px solid #2EC866',  transition: ' 0.2s ease-in-out' , marginBottom: '-4px' };
};

  const cookie = new Cookies();
  const currentUser = useContext(User);
  return (
    <>
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {/*<img src={logo} alt="logo" />*/}
          Online Judge
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" style={isActive( "/problemset")} to="/problemset">
                ProblemSet
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={isActive( "/createproblem")} to="/createproblem">
                Create
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " style={isActive( "/mysubmissions")} to="/mysubmissions">
                My Submissions
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {!authServiceInstance.isAuthenticated(currentUser) ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={isActive( "/signin")} to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={isActive( "/register")} to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link">
                    {cookie.get("Username")}
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={() => authServiceInstance.logout(currentUser)}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    <Outlet />
    </>
  );
}

