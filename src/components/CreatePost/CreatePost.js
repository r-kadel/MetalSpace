import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context'
import './CreatePost.css';

function CreatePost() {
  const [post, setPost] = useState('');

  const { setUserPosts } = useContext(Context);

  function handlePostSubmit(e) {
    e.preventDefault();
    e.target.reset()
    setPost('')
    createNewPost(post);
  }

  function createNewPost(newPost) {
    console.log(newPost)
    const postToAdd = {postContent: newPost}
    setUserPosts(prevPosts => [...prevPosts, postToAdd] )
  }

  return (
    <form onSubmit={handlePostSubmit} className="create-post">
      <textarea
        onChange={e => {
          setPost(e.target.value);
        }}
        rows="5"
        className="create-post-textarea"
        placeholder="Post something heavy"></textarea>
      <button className="post-btn" type="submit">
        Post!
      </button>
    </form>
  );
}

export default CreatePost;
