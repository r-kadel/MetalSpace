import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import Login from '../Login/Login';
import './Header.css';

function Header() {
  const { setLoggedIn, loggedIn, showLogin, setShowLogin } = useContext(Context);

  function handleLoginBtn() {
    setShowLogin(!showLogin);
  }

  function handleLogOut() {
    setLoggedIn(false);
  }

  return (
    <nav className="navbar">
      <i className="logo">
      {loggedIn? 
          <Link to="/home">MetalSpace</Link> 
          : <Link to="/">MetalSpace</Link> 
        }
      </i>
      <ul className="nav-links">
        {!loggedIn && (
          <li>
            <button className="login-btn nav-btn" onClick={handleLoginBtn}>
              Login
            </button>
            <div className="login-box">{showLogin && <Login />}</div>
          </li>
        )}
        {loggedIn && (
          <li>
            <button className="logout-btn nav-btn" onClick={handleLogOut}>
            <Link to="/">Log Out</Link>
            </button>
          </li>
        )}
        <li>
          <button className="signup-btn nav-btn">
            <Link to="/signup">Sign Up</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
