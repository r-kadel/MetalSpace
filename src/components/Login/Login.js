import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { Context } from '../../Context/Context';

function Login() {
  const { setLoggedIn, logIn, setHasError } = useContext(Context);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target;
    const credentials = {
      email: email.value,
      password: password.value
    };
    //Send user creds to logIn func in context for validation, then runs
    //this arrow func as the callback to push to the home page
    logIn(credentials, () => {
      setHasError(false);
      email.value = '';
      password.value = '';
      setLoggedIn(true);
      history.push('/home');
    });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Email:</label>
      <input name="email" type="text" required />
      <label htmlFor="password">Password:</label>
      <input name="password" type="password" required />
      <button className="login-submit">Submit</button>
    </form>
  );
}

export default Login;
