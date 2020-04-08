import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context';
import './AddComment.css';

function AddComment(props) {
  const [comment, setComment] = useState('');
  const { setShowComment, createNewComment } = useContext(Context);

  function handleCommentSubmit(e) {
    const commentToAdd = { content: comment, postId: props.postId.toString() };

    e.preventDefault();
    e.target.reset();
    createNewComment(commentToAdd);
    setComment('');
    setShowComment('');
  }

  function cancel() {
    setShowComment('');
  }

  return (
    <form onSubmit={handleCommentSubmit} className="add-comment">
      <textarea
        onChange={(e) => {
          setComment(e.target.value);
        }}
        rows="5"
        className="add-comment-textarea"
        placeholder="Add a comment..."></textarea>
      <button className="add-comment-btn" type="submit">
        Add Comment
      </button>
      <button onClick={cancel} className="cancel-btn">
        Cancel
      </button>
    </form>
  );
}

export default AddComment;
