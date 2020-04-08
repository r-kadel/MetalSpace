import React, { useContext } from 'react';
import './Signup.css';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context/Context';

function Signup() {
  let history = useHistory();
  const { register, setHasError } = useContext(Context);

  function handleSubmit(e) {
    e.preventDefault();
    const { username, password, confirmPassword, email } = e.target;
    if (password.value !== confirmPassword.value) {
      setHasError(true);
      console.log('passwords dont match');
    } else {
      const userInfo = {
        username: username.value,
        password: password.value,
        email: email.value,
      };
      register(userInfo);
      history.goBack();
    }
  }

  return (
    <main className="container">
      <form className="regis-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" required />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" required />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input name="confirmPassword" type="password" required />
        <label htmlFor="email">Email:</label>
        <input name="email" type="email" required />
        <button className="regis-btn">Submit</button>
      </form>
    </main>
  );
}

export default Signup;
