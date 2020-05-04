import React, { useContext } from 'react';
import './Signup.css';
import config from '../../config';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context/Context';

function Signup() {
  let history = useHistory();

  const {
    setHasError,
    hasError,
    setLoading,
    loading,
    BASE_URL,
    setShowLogin,
    errorMessage,
    setErrorMessage,
  } = useContext(Context);

  function register(userInfo) {
    setLoading(true);
    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${config.TOKEN_KEY}`,
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => {
            setHasError(true);
            setErrorMessage(err.error);
            setLoading(false);
          });
        } else {
          setLoading(false);
          setErrorMessage('Success! Please Log In');
          setHasError(true);
          setShowLogin(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setHasError(true);
        setErrorMessage(err.error);
      });
  }

  async function handleSubmit(e) {
    setHasError(false);
    e.preventDefault();
    const {
      username,
      password,
      confirmPassword,
      email,
      favorite_band,
      location,
    } = e.target;

    let errorArray = [];
    if (password.value.trim().length < 4) {
      errorArray.push(
        <div key={1}>* Password must be at least four characters</div>
      );
    }
    if (password.value !== confirmPassword.value) {
      errorArray.push(<div key={2}>* Passwords dont match</div>);
    }
    if (username.value.trim().length < 3) {
      errorArray.push(
        <div key={3}>
          * Please enter a valid username of at least thrree characters
        </div>
      );
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      errorArray.push(<div key={4}>* Invalid email</div>);
    }
    if (errorArray.length) {
      setHasError(true);
      setErrorMessage(errorArray);
    } else {
      const userInfo = {
        username: username.value.trim(),
        password: password.value.trim(),
        email: email.value.trim(),
        favorite_band: favorite_band.value.trim(),
        location: location.value.trim(),
      };
      try {
        await register(userInfo);
      } catch {
        console.log('error');
      }
    }
  }

  return (
    <main className="container">
      {hasError && <Error message={errorMessage} />}
      {loading ? (
        <Loading />
      ) : (
        <form className="regis-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input name="username" type="text" required />
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" required />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input name="confirmPassword" type="password" required />
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" required />
          <label htmlFor="location">Location? </label>
          <input name="location" type="text" />
          <label htmlFor="favorite_band">Favorite Band?</label>
          <input name="favorite_band" type="text" />
          <button className="regis-btn">Submit</button>
        </form>
      )}
    </main>
  );
}

export default Signup;
