import React, { useState } from 'react';
import config from '../config';
import TokenService from '../services/token-service';
import pic from '../assets/stockuser.png';

const Context = React.createContext();
const BASE_URL = 'http://localhost:8000/api';

function ContextProvider(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [userComments, setUserComments] = useState([]);
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

  function getComments() {
    fetch(`${BASE_URL}/comments/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setUserComments(resJson);
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

  async function onPageLoad() {
    if (TokenService.hasAuthToken()) {
      //Need to pull the user data on a refresh after confirming token
      setLoggedIn(true);
      getPosts();
      getComments();
    }
  }

  function createNewPost(newPost) {
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

  function createNewComment(newComment) {
    console.log( JSON.stringify({
      content: newComment.content,
      user_id: userData.id,
      post_id: newComment.postId,
    }));
    fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        content: newComment.content,
        user_id: userData.id,
        post_id: newComment.postId,
      }),
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
        createNewComment,
        getComments
      }}>
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
