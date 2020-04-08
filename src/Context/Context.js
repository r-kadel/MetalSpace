import React, { useState } from 'react';
import config from '../config';
import TokenService from '../services/token-service';
import pic from '../assets/stockuser.png';

const Context = React.createContext();
const BASE_URL = 'http://localhost:8000/api';

const demoComments = [
  { content: 'Weak post', postId: 2, id: 1 },
  { content: 'Not a terrible post', postId: 3, id: 1 },
  { content: 'Strong agree', postId: 2, id: 2 },
];

function ContextProvider(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [userComments, setUserComments] = useState(demoComments);
  const [showUpload, setShowUpload] = useState(false);
  const [showComment, setShowComment] = useState('');
  const [profilePic, setProfilePic] = useState(pic);
  const [userData, setUserData] = useState({});

  function register(userInfo) {
    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${config.TOKEN_KEY}`,
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        if (!res.ok) res.json().then((e) => Promise.reject(e));
      })
      .catch((err) => {
        setHasError(true);
        setErrorMessage(err.error);
      });
  }

  function getPosts() {
    fetch(`${BASE_URL}/posts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setUserPosts(resJson);
      })
      .catch((err) => setErrorMessage(err.error));
  }

  function logIn(credentials, cb) {
    fetch(`${BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${config.TOKEN_KEY}`,
      },
      body: JSON.stringify(credentials),
    })
      .then((res) =>
        !res.ok
          ? res.json().then((e) => Promise.reject(e))
          : res.json().then((res) => {
              setUserData(res.userData);
              TokenService.saveAuthToken(res.authToken);
              setLoggedIn(true);
              cb();
            })
      )
      .catch((err) => {
        setHasError(true);
        console.log(err);
        setErrorMessage(err.error, 'errorrrrr');
      });
    setShowLogin(false);
    setErrorMessage('');
  }

  function logOut() {
    TokenService.clearAuthToken();
    setLoggedIn(false);
  }

  function onPageLoad() {
    if (TokenService.hasAuthToken()) {
      //Need to pull the user data on a refresh after confirming token
      setLoggedIn(true);
      getPosts();
    }
  }

  function createNewPost(newPost) {
    console.log(JSON.stringify(newPost, userData.id));
    fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ content: newPost, user_id: userData.id }),
    })
      .then((res) =>
        !res.ok
          ? res.json().then((e) => Promise.reject(e))
          : res.json().then((res) => {
              console.log(res);
            })
      )
      .catch((err) => {
        setHasError(true);
        console.log(err);
        setErrorMessage(err.error, 'post error');
      });
    setErrorMessage('');
  }

  return (
    <Context.Provider
      value={{
        userPosts,
        setUserPosts,
        loggedIn,
        setLoggedIn,
        hasError,
        setHasError,
        errorMessage,
        setErrorMessage,
        showLogin,
        setShowLogin,
        userComments,
        setUserComments,
        showUpload,
        setShowUpload,
        showComment,
        setShowComment,
        profilePic,
        setProfilePic,
        register,
        logIn,
        logOut,
        onPageLoad,
        createNewPost,
      }}>
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
