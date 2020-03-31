import React from 'react';
import './Post.css';

function Post(props) {
  return (
    <article className="post">
      <p>{props.content}</p>
      <div className="post-time">Posted: Today</div>
      <hr />
      <div className="post-interactions"><i>Like</i> <i>Comment</i></div>
    </article>
  );
}

export default Post;