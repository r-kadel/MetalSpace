import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Context/Context';
import { Link } from 'react-router-dom';
import UploadModal from '../UploadModal/UploadModal';
import EditModal from '../EditModal/EditModal';
import './UserProfile.css';
import pic from '../../assets/stockuser.png';

function UserProfile(props) {
  const [profileImage, setProfileImage] = useState('');
  const {
    showUpload,
    setShowUpload,
    userData,
    setShowEdit,
    showEdit,
  } = useContext(Context);

  function openUploadModal() {
    setShowUpload(true);
  }

  function openEditModal() {
    setShowEdit(true);
  }

  useEffect(() => {
    if (!props.profileData.image_url) {
      setProfileImage(pic);
    } else {
      setProfileImage(props.profileData.image_url);
    }
  }, [props.profileData.image_url]);

  return (
    <section className="personal-section">
      {props.profileData.id === userData.id ? (
        <>
          <div className="img-box">
            <img className="profile-pic" alt="profile" src={profileImage} />
            <div className="pic-buttons">
              <button onClick={openUploadModal} className="pic-edit-btn">
                Edit
              </button>
            </div>
            {showUpload && <UploadModal />}
          </div>

          <ul className="bio-info">
            <li className="bio-li">Name: {props.profileData.username}</li>
            {props.profileData.location ? (
              <li className="bio-li">From: {props.profileData.location}</li>
            ) : (
              <li className="bio-li">From :The Black Gates</li>
            )}
            {props.profileData.favorite_band ? (
              <li className="bio-li">
                Favorite Band: {props.profileData.favorite_band}
              </li>
            ) : null}
            <li className="cog-li">
              <i onClick={openEditModal} className="fas fa-cog cog-btn"></i>
            </li>
          </ul>
          {showEdit && <EditModal />}
        </>
      ) : (
        <>
          <div className="img-box">
            <Link to={`/userPage/${props.profileData.id}`}>
              <img className="profile-pic" alt="profile" src={profileImage} />
            </Link>
          </div>
          <ul className="bio-info">
            <li className="bio-li">Name: {props.profileData.username}</li>
            {props.profileData.location ? (
              <li className="bio-li">{props.profileData.location}</li>
            ) : (
              <li className="bio-li">From: The Black Gates</li>
            )}
            {props.profileData.favorite_band ? (
              <li className="bio-li">
                Favorite Band: {props.profileData.favorite_band}
              </li>
            ) : null}
          </ul>
        </>
      )}
    </section>
  );
}

export default UserProfile;
