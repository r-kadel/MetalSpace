import React, { useContext } from 'react';
import { Context } from '../../Context/Context';
import './Home.css';

import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import UserProfile from '../../components/UserProfile/UserProfile';


// Work on the picture upload feature
//comments section

function Home() {
  const { userPosts } = useContext(Context);

  const allPosts = userPosts.map((post, i) => {
    return <Post content={post.postContent} key={i} />;
  });

  // cog if needed later
  // <i className="cog fas fa-cog"></i>

  return (
    <main className="container">
      <div className="user-page">
        <UserProfile />
        <section className="post-section">
          <CreatePost />
          {allPosts}
        </section>
      </div>
    </main>
  );
}

export default Home;
