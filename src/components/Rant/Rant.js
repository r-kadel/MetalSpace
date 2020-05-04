import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context';
import AddComment from '../AddComment/AddComment';
import Comment from '../Comment/Comment';
import './Rant.css';

function Rant(props) {
  const [showCommentTip, setShowCommentTip] = useState(false);
  const [showDeleteTip, setShowDeleteTip] = useState(false);
  const {
    userComments,
    showComment,
    setShowComment,
    deletePost,
    pageData,
    userData,
  } = useContext(Context);

  function handleComment() {
    setShowComment(props.id);
  }

  function handleDelete() {
    deletePost(props.id);
  }

  function deleteTipShow() {
    setShowDeleteTip((prev) => !prev);
  }

  function commentTipShow() {
    setShowCommentTip((prev) => !prev);
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
        <header className="rant-header">
          <div className="author">
            <img
              src={pageData.image_url}
              alt={pageData.username}
              className="profile-thumb"
            />{' '}
            {pageData.username}
          </div>
          <div className="post-time">
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
        <div className="rant-content-box">
          <p>{props.content}</p>
        </div>
        <div className="rant-interactions">
          <button
            onClick={handleComment}
            onMouseEnter={commentTipShow}
            onMouseLeave={commentTipShow}
            className="comment-btn-add comment-active">
            <i className="fas fa-comments"></i>
            {showCommentTip && (
              <span className="comment-tooltip tooltip">Add A Comment</span>
            )}
          </button>
          {pageData.id === userData.id ? (
            <button
              onClick={handleDelete}
              className="comment-btn-delete comment-active"
              onMouseEnter={deleteTipShow}
              onMouseLeave={deleteTipShow}>
              {showDeleteTip && (
                <span className="delete-tooltip tooltip">Delete Rant</span>
              )}
              <i className="far fa-trash-alt"></i>
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
