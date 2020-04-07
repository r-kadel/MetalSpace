import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import './Landing.css';

function Landing() {
  const {
    loggedIn,
    setLoggedIn,
    setHasError,
    setErrorMessage,
    showLogin,
    setShowLogin
  } = useContext(Context);

  //User must log in to view the page
  function handleSignInButtonClick() {
    if (!loggedIn) {
      setHasError(true);
      setErrorMessage('Please log in to continue');
      setShowLogin(!showLogin);
    } else {
      setLoggedIn(true);
    }
  }

  return (
    <main className="container">
      <div className="landing-page">
        <h1 className="welcome">Welcome to MetalSpace</h1>
        <p className="welcome-p">
          A place for metal heads created by metal heads to share music, videos,
          and opinions on all things heavy metal.
        </p>
        <ul className="setup-ul">
          <li>
            Sign in or Sign up to start sharing. The server is not set up yet so
            any email and password will allow you to log in.
          </li>
        </ul>
        <button
          className="landing-page-signin"
          onClick={handleSignInButtonClick}>
          Sign in
        </button>
        <button className="landing-page-signup">
          <Link to="/signup">Sign up</Link>
        </button>
      </div>
    </main>
  );
}

export default Landing;