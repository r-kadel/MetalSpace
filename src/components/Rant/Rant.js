import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context';
import AddComment from '../AddComment/AddComment';
import Comment from '../Comment/Comment';
import './Rant.css';

function Rant(props) {
  const [liked, setLiked] = useState(false);
  const {
    userComments,
    showComment,
    setShowComment,
    deletePost,
    pageData,
    userData,
  } = useContext(Context);

  function like() {
    setLiked(!liked);
  }

  function handleComment() {
    setShowComment(props.id);
    console.log(pageData.id, userData.id)
  }

  function handleDelete() {
    deletePost(props.id);
  }
  //sort comments to their appropriate posts
  const postedComments = () =>
    userComments
      .filter((comment) => comment.postId === props.id)
      .map((filteredComment) => {
        return (
          <Comment
            id={filteredComment.id}
            key={filteredComment.id}
            content={filteredComment.content}
            date={filteredComment.date_created}
            user={filteredComment.user}
          />
        );
      });

  const date = Date.parse(props.createdAt);
  return (
    <>
      <article className="rant">
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
        <div className="rant-interactions">
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
          {pageData.id === userData.id ? (
            <button
              onClick={handleDelete}
              className="comment-btn comment-active">
              Delete
            </button>
          ) : null}
        </div>
        {showComment === props.id && <AddComment postId={props.id} />}
      </article>
      {postedComments()}
    </>
  );
}

export default Rant;
