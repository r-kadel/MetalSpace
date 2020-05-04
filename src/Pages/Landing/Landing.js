import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../Context/Context';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import './Landing.css';

import TokenService from '../../services/token-service';

function Landing() {
  const {
    loggedIn,
    setLoggedIn,
    setHasError,
    setErrorMessage,
    showLogin,
    setShowLogin,
    userData,
    errorMessage,
    hasError,
    loading,
  } = useContext(Context);
  const history = useHistory();

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

  useEffect(() => {
    if (TokenService.hasAuthToken()) {
      setLoggedIn(true);
      history.push(`/userPage/${userData.id}`);
    } else {
      history.push('/');
    }
  }, [history, setLoggedIn, userData.id]);

  return (
    <main className="container">
      <div className="landing-page">
        {hasError && <Error message={errorMessage} />}
        <h1 className="welcome">Welcome to MetalSpace</h1>
        {loading && <Loading />}
        <p className="welcome-p">
          A place for metal heads created by metal heads to share music, videos,
          and opinions on all things heavy metal.
        </p>
        <ul className="setup-ul">
          <li>
            Sign in or Sign up to start sharing. There is currently a demo
            account set up to play around with, or you can create your own! We
            are still in the development phase so any accounts created are
            subject to change or deletion.
          </li>
          <li>Email Address: fakemail@yahoo.com</li>
          <li>Password: 1234</li>
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
