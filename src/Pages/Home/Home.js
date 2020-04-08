import React, { useContext, useEffect, useCallback } from 'react';
import { Context } from '../../Context/Context';
import './Home.css';

import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import UserProfile from '../../components/UserProfile/UserProfile';

// Work on the picture upload feature
//comments section

function Home() {
  const { userPosts, onPageLoad } = useContext(Context);

  //sort by createdAt
  const allPosts = userPosts.map((post, i) => {
    return <Post createdAt={post.date_created} content={post.content} key={i} id={post.id} />;
  });

  const onPageLoadCallback = useCallback(onPageLoad, []) 

  useEffect(() => {
    onPageLoadCallback();
  }, [onPageLoadCallback]);

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
