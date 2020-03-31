import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { Context } from '../../Context/Context';

function Login() {
  const { setLoggedIn } = useContext(Context);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setLoggedIn(true);
    history.push('/home')
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Email:</label>
      <input name="username" type="text" required />
      <label htmlFor="password">Password:</label>
      <input name="password" type="password" required />
      <button className="login-submit">Submit</button>
    </form>
  );
}

export default Login;
