import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import Login from '../Login/Login';
import pic from '../../assets/stockuser.png';
import './Header.css';

function Header() {
  const {
    loggedIn,
    showLogin,
    setShowLogin,
    logOut,
    userData,
    setLoading,
  } = useContext(Context);
  const defaultPic = pic;

  //display the login modal
  function handleLoginBtn() {
    setShowLogin(!showLogin);
  }

  function handleLogOut() {
    setLoading(false);
    logOut();
  }

  return (
    <nav className="navbar">
      {loggedIn && (
        <div className="profile-nav">
          <Link to={`/userPage/${userData.id}`}>
            <img
              className="nav-thumb"
              alt={userData.username}
              src={userData.image_url ? userData.image_url : defaultPic}
            />
          </Link>
          <Link className="nav-btn" to={`/userPage/${userData.id}`}>
            {userData.username}
          </Link>
          <button className="search-btn nav-btn">
            <Link to="/search">Search</Link>
          </button>
        </div>
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
