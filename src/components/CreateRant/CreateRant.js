import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context';
import './CreateRant.css';

function CreateRant() {
  const [rant, setRant] = useState('');
  const [showPostTip, setShowPostTip] = useState(false);

  const { createNewRant, setHasError, setErrorMessage } = useContext(Context);

  function handlePostSubmit(e) {
    e.preventDefault();
    e.target.reset();
    if (rant.trim().length === 0) {
      setHasError(true);
      setErrorMessage('Please post something useful');
      window.scrollTo(0, 0);
    } else {
      setRant('');
      createNewRant(rant);
      setHasError(false);
      setErrorMessage('');
    }
  }

  function postTipShow() {
    setShowPostTip((prev) => !prev);
  }

  return (
    <form onSubmit={handlePostSubmit} className="create-rant">
      <textarea
        onChange={(e) => {
          setRant(e.target.value);
        }}
        rows="5"
        className="create-rant-textarea"
        placeholder="What are you mad about today?"
        required></textarea>
      <button
        className="post-btn"
        type="submit"
        onMouseEnter={postTipShow}
        onMouseLeave={postTipShow}>
        <i className="fas fa-check-square"></i>
        {showPostTip && (
          <span className="post-tooltip tooltip">Make a post</span>
        )}
      </button>
    </form>
  );
}

export default CreateRant;
