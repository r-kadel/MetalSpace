import React, { useContext } from 'react';
import './UserProfile.css';
import { Context } from '../../Context/Context';
import UploadModal from '../UploadModal/UploadModal';

function UserProfile() {
  const { showUpload, setShowUpload, profilePic } = useContext(Context);

  function openUploadModal() {
    setShowUpload(true);
  }

  return (
    <section className="personal-section">
      <div className="img-box">
        <img className="profile-pic" alt="profile" src={profilePic} />
        <div className="pic-buttons">
          <button onClick={openUploadModal} className="pic-edit-btn">
            Edit
          </button>
        </div>
        {showUpload && <UploadModal />}
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
