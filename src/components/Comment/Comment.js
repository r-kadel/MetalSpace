import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../Context/Context';
import TokenService from '../../services/token-service';
import './Comment.css';

function Comment(props) {
  const [liked, setLiked] = useState(false);
  const [commentUser, setCommentUser] = useState('');
  const { deleteComment, pageData, userData } = useContext(Context);
  const BASE_URL = 'http://localhost:8000/api';

  function like() {
    setLiked(!liked);
  }

  function handleDeleteBtn() {
    deleteComment(props.id);
  }
  useEffect(() => getUserData(props.user), [props.user]);

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
  console.log(commentUser);
  const date = Date.parse(props.date);
  return (
    <article className="comment">
      <header className="comment-header">
        <div className="author">
          <img
            src={commentUser.image_url}
            alt="profile"
            className="profile-thumb"
          />{' '}
          {commentUser.username}
        </div>
        <div className="post-time">
          {' '}
          <span className="date">
            Posted{' '}
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
      <hr />
      <div className="comment-content-box">
        <p>{props.content}</p>
      </div>
    
      <div className="comment-options">
        {liked ? (
          <button onClick={like} className="like-btn liked">
            Like
          </button>
        ) : (
          <button onClick={like} className="like-btn">
            Like
          </button>
        )}
        {pageData.id === userData.id ? (
          <button onClick={handleDeleteBtn} className="comment-delete-btn">
            Delete
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default Comment;
