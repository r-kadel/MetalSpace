import React, { useState } from 'react';
import './Post.css';

function Post(props) {
  const [liked, setLiked] = useState(false);

  function like() {
    setLiked(!liked);
  }

  return (
    <article className="post">
      <p>{props.content}</p>
      <div className="post-time">Posted: Today</div>
      <hr />
      <div className="post-interactions">
        {liked ? (
          <button onClick={like} className="like-btn liked">
            Like
          </button>
        ) : (
          <button onClick={like} className="like-btn">
            Like
          </button>
        )}
        <i>Comment</i>
      </div>
    </article>
  );
}

export default Post;
