import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context';
import './AddComment.css';

function AddComment(props) {
  const [comment, setComment] = useState('');
  const [showDeleteTip, setShowDeleteTip] = useState(false);
  const [showAddCommentTip, setShowAddCommentTip] = useState(false);
  const { setShowComment, createNewComment, setHasError, setErrorMessage } = useContext(Context);

  function handleCommentSubmit(e) {
    const commentToAdd = { content: comment, postId: props.postId.toString() };
    e.preventDefault();
    e.target.reset();
    if (comment.trim().length === 0) {
      setHasError(true);
      setErrorMessage('Please comment something useful');
      document.documentElement.scrollTop = 0;
    } else {
      createNewComment(commentToAdd);
      setComment('');
      setShowComment('');
      setHasError(false);
      setErrorMessage('')
    }
  }

  function cancel() {
    setShowComment('');
  }

  function deleteTipShow() {
    setShowDeleteTip((prev) => !prev);
  }

  function addTipShow() {
    setShowAddCommentTip((prev) => !prev);
  }

  return (
    <form onSubmit={handleCommentSubmit} className="add-comment">
      <textarea
        onChange={(e) => {
          setComment(e.target.value);
        }}
        rows="3"
        className="add-comment-textarea"
        placeholder="Add a comment..."></textarea>
      <div className="rant-actions">
        <button
          className="add-comment-btn"
          onMouseEnter={addTipShow}
          onMouseLeave={addTipShow}
          type="submit">
          <i className="fas fa-check-square"></i>
          {showAddCommentTip && (
            <span className="add-tooltip tooltip">Post Comment</span>
          )}
        </button>
        <button
          onClick={cancel}
          className="cancel-btn comment-delete-btn"
          onMouseEnter={deleteTipShow}
          onMouseLeave={deleteTipShow}>
          {showDeleteTip && (
            <span className="delete-tooltip tooltip">Delete Comment</span>
          )}
          <i className="fas fa-ban"></i>
        </button>
      </div>
    </form>
  );
}

export default AddComment;
