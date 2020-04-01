import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context';
import Comment from '../Comment/Comment';
import './Post.css';

function Post(props) {
  const [liked, setLiked] = useState(false);
  const { showComment, setShowComment } = useContext(Context);

  function like() {
    setLiked(!liked);
  }

  function handleComment() {
    setShowComment(!showComment);
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
        <button onClick={handleComment}className="comment-btn comment-active">Comment</button> 
          </div>
        {showComment && <Comment /> }
    </article>
  );
}

export default Post;
