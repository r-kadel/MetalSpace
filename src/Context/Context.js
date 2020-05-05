import React, { useState } from 'react';
import config from '../config';
import TokenService from '../services/token-service';
import UserService from '../services/user-service';
import pic from '../assets/stockuser.png';

const Context = React.createContext();
// change to local for development, dont forget the url in search!
// const BASE_URL = 'http://localhost:8000/api';
const BASE_URL = 'https://still-wave-10274.herokuapp.com/api';

function ContextProvider(props) {
  const [userRants, setUserRants] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [userComments, setUserComments] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showComment, setShowComment] = useState('');
  const [profilePic, setProfilePic] = useState(pic);
  const [userData, setUserData] = useState({});
  const [pageData, setPageData] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  function getRants() {
    fetch(`${BASE_URL}/posts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setUserRants(resJson);
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
          ? res.json().then(() => {     
            setHasError(true);
            setErrorMessage("Incorrect email or password, please try again"); 
            setLoading(false);})
          : res.json().then((res) => {
              TokenService.saveAuthToken(res.authToken);
              UserService.saveUserId(res.userData.id);
              setUserData(res.userData);
              setLoggedIn(true);
              cb(res.userData.id);
            })
      )
      .catch((err) => {
        setHasError(true);
        setErrorMessage(err.error);
      });
    setShowLogin(false);
    setErrorMessage('');
  }

  function logOut() {
    TokenService.clearAuthToken();
    UserService.clearUserId();
    setUserData({});
    setLoggedIn(false);
  }

  function onPageLoad() {
    if (TokenService.hasAuthToken()) {
      //Need to pull the user data on a refresh after confirming token
      UserService.getUserId();
      getUserData(UserService.getUserId());
      setLoggedIn(true);
      getRants();
      getComments();
    } else {
      setLoggedIn(false);
    }
  }

  function onSearchLoad() {
    if (TokenService.hasAuthToken()) {
      //Need to pull the user data on a refresh after confirming token
      UserService.getUserId();
      getUserData(UserService.getUserId());
      setLoggedIn(true);
      setLoading(true);
    } else {
      setLoggedIn(false);
    }
  }

  function createNewRant(newPost) {
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
              setUserRants((prevPosts) => [res, ...prevPosts]);
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
              setUserComments((prevComments) => [res, ...prevComments]);
            })
      )
      .catch((err) => {
        setHasError(true);
        console.log(err);
        setErrorMessage(err.error, 'post error');
      });
    setErrorMessage('');
  }

  //Set a default picture if none listed
  function getUserData(userId) {
    fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json().then((res) => {
            setUserData(res);
            if (!res.image_url) {
              setProfilePic(pic);
            } else {
              setProfilePic(res.image_url);
            }
          })
    );
  }

  function getPageData(userId) {
    fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json().then((res) => {
            setPageData(res);
            if (!res.image_url) {
              setProfilePic(pic);
            } else {
              setProfilePic(res.image_url);
            }
          })
    );
  }

  function sendImageUrlToServer(url) {
    fetch(`${BASE_URL}/users/${userData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ image_url: url }),
    }).catch((err) => {
      setHasError(true);
      console.log(err);
      setErrorMessage(err.error, 'post error');
    });
    setErrorMessage('');
    setProfilePic(url);
  }

  function deletePost(postId) {
    fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).catch((err) => console.log(err));

    setUserRants((prevPosts) => {
      return prevPosts.filter((post) => post.id !== postId);
    });
  }

  function deleteComment(commentId) {
    fetch(`${BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).catch((err) => console.log(err));

    setUserComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== commentId);
    });
  }

  function patchUserData(updatedUser) {
    fetch(`${BASE_URL}/users/${userData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => {
            setHasError(true);
            setErrorMessage(err.error);
          });
        } else {
          setErrorMessage('');
          setShowEdit(false);
          setPageData((prevData) => {
            return { ...prevData, ...updatedUser };
          });
        }
      })
      .catch((err) => {
        setHasError(true);
        setErrorMessage(err.error, 'post error');
      });
  }

  return (
    <Context.Provider
      value={{
        userRants,
        setUserRants,
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
        logIn,
        logOut,
        onPageLoad,
        createNewRant,
        createNewComment,
        getComments,
        sendImageUrlToServer,
        userData,
        deletePost,
        deleteComment,
        pageData,
        setPageData,
        getPageData,
        onSearchLoad,
        showEdit,
        setShowEdit,
        patchUserData,
        loading,
        setLoading,
        BASE_URL,
      }}>
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
