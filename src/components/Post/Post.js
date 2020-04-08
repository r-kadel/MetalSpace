import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context';
import AddComment from '../AddComment/AddComment';
import Comment from '../Comment/Comment';
import './Post.css';

function Post(props) {
  const [liked, setLiked] = useState(false);
  const { userComments, showComment, setShowComment } = useContext(Context);

  function like() {
    setLiked(!liked);
  }

  function handleComment() {
    setShowComment(props.id);
  }

  const postComments = userComments
    .filter(comment => comment.postId === props.id)
    .map(filteredComment => {
      return (
        <Comment key={filteredComment.id} content={filteredComment.content} />
      );
    });

  return (
    <>
      <article className="post">
        <p>{props.content}</p>
        <div className="post-time">{props.createdAt}</div>
        <hr />
        <div className="post-interactions">
          {liked ? (
            <button onClick={like} className="liked">
              Like
            </button>
          ) : (
            <button onClick={like}>Like</button>
          )}
          <button
            onClick={handleComment}
            className="comment-btn comment-active">
            Comment
          </button>
        </div>
        {showComment === props.id && <AddComment postId={props.id} />}
      </article>
      {postComments}
    </>
  );
}

export default Post;
