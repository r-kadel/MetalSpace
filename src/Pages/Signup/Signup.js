import React from 'react';
import './Signup.css';
import { useHistory } from 'react-router-dom';

function Signup() {
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    history.goBack();
  }

  return (
    <main className="container">
      <form className="regis-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" required />
        <label htmlFor="password">Password</label>
        <input type="password" required />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" required />
        <label htmlFor="email">Email:</label>
        <input type="email" required />
        <button className="regis-btn">Submit</button>
      </form>
    </main>
  );
}

export default Signup;
