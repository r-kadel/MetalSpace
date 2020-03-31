import React, { useState } from 'react';

const Context = React.createContext();

const demoPosts = [
  { postContent: 'first Post!' },
  { postContent: 'Another new post' },
  { postContent: 'This site is the worst!' }
];

function ContextProvider(props) {
  const [userPosts, setUserPosts] = useState(demoPosts);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false);

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
        setShowLogin
      }}>
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
