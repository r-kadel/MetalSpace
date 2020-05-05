import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import Error from '../../components/Error/Error';
import { Context } from '../../Context/Context';

function Login() {
  const { setLoggedIn, logIn, setHasError, setShowLogin, hasError, errorMessage, setLoading } = useContext(Context);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { email, password } = e.target;
    const credentials = {
      email: email.value.toLowerCase(),
      password: password.value,
    };
    //Send user creds to logIn func in context for validation, then runs
    //this arrow func as the callback to push to the home page
    logIn(credentials, (id) => {
      setHasError(false);
      email.value = '';
      password.value = '';
      setLoggedIn(true);
      history.push(`/userPage/${id}`);
    });
  }

  function outsideClick(e) {
    e.persist();
    if (e.target.className === 'login-modal') {
      closeLoginModal();
    }
  }

  function closeLoginModal() {
    setShowLogin(false);
    setHasError(false);
  }

  return (
    <div onClick={(e) => outsideClick(e)} className="login-modal">
      <div className="login-container">
        <header className="login-header">
          <span onClick={closeLoginModal} className="login-close-btn">
            &times;
          </span>
        </header>
        <div>{hasError && <Error className="sys-message" message={errorMessage} />}</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Email</label>
          <input name="email" type="text" required />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required />
          <button className="login-submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
