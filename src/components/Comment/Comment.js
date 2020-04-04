import React, { useState } from 'react';
import './Comment.css';

function Comment(props) {

  const [liked, setLiked] = useState(false);

  function like() {
    setLiked(!liked);
  }

  return (
    <article className="comment">
      <p>{props.content}</p>
      <div className="post-time">Posted: Today</div>
      {liked ? (
          <button onClick={like} className="like-btn liked">
            Like
          </button>
        ) : (
          <button onClick={like} className="like-btn">
            Like
          </button>
        )}
    </article>
  );
}

export default Comment;
