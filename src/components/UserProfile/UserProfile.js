import React from 'react';
import { Link } from 'react-router-dom';
import pic from '../../assets/stockuser.png';

function UserProfile() {
  return (
    <section className="personal-section">
      <div className="img-box">
        <img className="profile-pic" alt="profile" src={pic} />
        <div className="pic-buttons">
          <button className="pic-edit-btn">
            <Link to="/upload">Edit</Link>
          </button>
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
  );
}

export default UserProfile;
