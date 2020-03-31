import React, { useContext } from 'react';
import { Context } from '../../Context/Context';
import './Home.css';
import pic from '../../assets/stockuser.png';

import Post from '../../components/Post/Post';
import CreatePost from '../../components/CreatePost/CreatePost';
import Upload from '../../components/Upload/Upload';

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
        <section className="personal-section">
          <div className="img-box">
            <img className="profile-pic" alt="profile" src={pic} />
            <div className="pic-buttons">
              <button className="pic-edit-btn">Edit</button>
              <button className="pic-delete-btn">Delete</button>
            </div>
          </div>
          <ul className="bio-info">
            <li className="bio-li">
              Name: Ryan <i className="edit-btn far fa-edit"></i>
            </li>
            <li className="bio-li">
              From: Tampa, FL <i className="edit-btn far fa-edit"></i>
            </li>
            <li className="bio-li">
              Favorite Band: Opeth <i className="edit-btn far fa-edit"></i>{' '}
            </li>
            <li>Last Online: Online now!</li>
          </ul>
        </section>

        <section className="post-section">
          <CreatePost />
          {allPosts}
        </section>
      </div>
      <Upload />
    </main>
  );
}

export default Home;
