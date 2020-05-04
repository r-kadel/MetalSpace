import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import TokenService from '../../services/token-service';
import './Comment.css';

function Comment(props) {
  const [commentUser, setCommentUser] = useState('');
  const [showDeleteTip, setShowDeleteTip] = useState(false);
  const { deleteComment, userData } = useContext(Context);
  const BASE_URL = 'http://localhost:8000/api';

  function handleDeleteBtn() {
    deleteComment(props.id);
  }
  useEffect(() => getUserData(props.user), [props.user]);

  function deleteTipShow() {
    setShowDeleteTip(prev => !prev)
  }

  function getUserData(id) {
    fetch(`${BASE_URL}/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json().then((res) => setCommentUser(res))
    );
  }
  const date = Date.parse(props.date);

  return (
    <article className="comment">
      <header className="comment-header">
        <div className="author">
          <Link to={`/userPage/${commentUser.id}`}>
            <img
              src={commentUser.image_url}
              alt={commentUser.username}
              className="profile-thumb"
            />{' '}
          </Link>
          <Link to={`/userPage/${commentUser.id}`}>{commentUser.username}</Link>
        </div>
        <div className="post-time">
          {' '}
          <span className="date">
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            }).format(date)}
          </span>
          <span className="time">
            {new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(date)}
          </span>
        </div>
      </header>

      <div className="comment-content-box">
        <p>{props.content}</p>
      </div>

      {commentUser.id === userData.id ? (
        <div className="comment-options">
          <button
            onClick={handleDeleteBtn}
            className="comment-delete-btn"
            onMouseEnter={deleteTipShow}
            onMouseLeave={deleteTipShow}>
            {showDeleteTip && (
              <span className="delete-tooltip tooltip">Delete Comment</span>
            )}
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      ) : null}
    </article>
  );
}

export default Comment;
