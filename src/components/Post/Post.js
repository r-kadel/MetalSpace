import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context';
import AddComment from '../AddComment/AddComment';
import Comment from '../Comment/Comment';
import './Post.css';

function Post(props) {
  const [liked, setLiked] = useState(false);
  const { userComments, showComment, setShowComment, getComments } = useContext(
    Context
  );

  function like() {
    setLiked(!liked);
  }

  function handleComment() {
    setShowComment(props.id);
  }

  const postedComments = () =>
    userComments
      .filter((comment) => comment.postId === props.id)
      .map((filteredComment) => {
        console.log(filteredComment);
        return (
          <Comment key={filteredComment.id} content={filteredComment.content} />
        );
      });

  const date = Date.parse(props.createdAt);
  return (
    <>
      <article className="post">
        <p>{props.content}</p>
        <div className="post-time">
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
      {postedComments()}
    </>
  );
}

export default Post;
