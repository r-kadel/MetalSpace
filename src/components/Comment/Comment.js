import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context';
import './Comment.css';


function Comment() {
  const [comment, setComment] = useState('');
  const { setUserComments, setShowComment } = useContext(Context);

  function handleCommentSubmit(e) {
    e.preventDefault();
    e.target.reset()
    setUserComments(comment);
    setComment('')
  }

  function cancel() {
    setShowComment(false);
  }

  return (
    <form onSubmit={handleCommentSubmit} className="add-comment">
    <textarea
      onChange={e => {
        setComment(e.target.value);
      }}
      rows="5"
      className="add-comment-textarea"
      placeholder="Add a comment..."></textarea>
    <button className="add-comment-btn" type="submit">
      Add Comment
    </button>
    <button onClick={cancel} className="cancel-btn" >
      Cancel
    </button>
  </form>
  )
}

export default Comment
