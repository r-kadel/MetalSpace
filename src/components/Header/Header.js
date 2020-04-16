import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../Context/Context';
import Login from '../Login/Login';
import './Header.css';

function Header() {
  const { loggedIn, showLogin, setShowLogin, logOut, userData } = useContext(
    Context
  );
  const location = useLocation();
  //display the login modal
  function handleLoginBtn() {
    setShowLogin(!showLogin);
  }

  function handleLogOut() {
    logOut();
  }

  return (
    <nav className="navbar">
      {location.pathname !== '/search' ? (
        <button className="search-btn nav-btn">
          <Link to="/search">Search</Link>
        </button>
      ) : (
        <button className="search-btn nav-btn">
          <Link to={`/userPage/${userData.id}`}>Home</Link>
        </button>
      )}
      <ul className="nav-links">
        {!loggedIn && (
          <>
            <li>
              <button className="login-btn nav-btn" onClick={handleLoginBtn}>
                Login
              </button>
              <div className="login-box">{showLogin && <Login />}</div>
            </li>
            <li>
              <button className="signup-btn nav-btn">
                <Link to="/signup">Sign Up</Link>
              </button>
            </li>
          </>
        )}
        {loggedIn && (
          <li>
            <button className="logout-btn nav-btn" onClick={handleLogOut}>
              <Link to="/">Log Out</Link>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;
