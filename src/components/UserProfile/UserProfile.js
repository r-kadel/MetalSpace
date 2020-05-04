import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context';
import { Link } from 'react-router-dom';
import UploadModal from '../UploadModal/UploadModal';
import EditModal from '../EditModal/EditModal';
import './UserProfile.css';
import pic from '../../assets/stockuser.png';

function UserProfile(props) {
  const [showEditTip, setShowEditTip] = useState(false);
  const [showUploadTip, setShowUploadTip] = useState(false);
  const defaultPic = pic;

  const {
    showUpload,
    setShowUpload,
    userData,
    setShowEdit,
    showEdit,
    profilePic,
  } = useContext(Context);

  function openUploadModal() {
    setShowUpload(true);
  }

  function openEditModal() {
    setShowEdit(true);
  }

  function uploadTipShow() {
    setShowUploadTip((prev) => !prev);
  }

  function editTipShow() {
    setShowEditTip((prev) => !prev);
  }

  return (
    <section className="personal-section">
      {props.profileData.id === userData.id ? (
        <>
          <section className="profile-info">
            <img className="profile-pic" alt="profile" src={profilePic} />
            {showUpload && <UploadModal />}
            <div className="bio-info">
              <ul className="bio-ul">
                <li className="bio-li">
                  <span className="page-text">Name: </span>
                  {props.profileData.username}
                </li>
                {props.profileData.location ? (
                  <li className="bio-li">
                    <span className="page-text">From: </span>{' '}
                    {props.profileData.location}
                  </li>
                ) : (
                  <li className="bio-li">
                    <span className="page-text">From: </span>The Black Gates
                  </li>
                )}
                {props.profileData.favorite_band ? (
                  <li className="bio-li">
                    <span className="page-text">Favorite Band: </span>
                    {props.profileData.favorite_band}
                  </li>
                ) : null}
              </ul>
              {showEdit && <EditModal />}
            </div>
          </section>

          <nav className="profile-footer">
            <button
              onMouseEnter={uploadTipShow}
              onMouseLeave={uploadTipShow}
              onClick={openUploadModal}
              className="pic-edit-btn">
              <i className="fas fa-edit"></i>
              {showUploadTip && (
                <span className="upload-tooltip tooltip">
                  Edit profile picture
                </span>
              )}
            </button>
            <button
              className="cog"
              onMouseEnter={editTipShow}
              onMouseLeave={editTipShow}
              onClick={openEditModal}>
              {showEditTip && (
                <span className="edit-tooltip tooltip">Edit Profile Info</span>
              )}
              <i className="fas fa-cog cog-btn"></i>
            </button>
          </nav>
        </>
      ) : (
        <section className="profile-info">
          <div className="img-box">
            <Link to={`/userPage/${props.profileData.id}`}>
              <img
                className="profile-pic"
                alt="profile"
                src={
                  props.profileData.image_url
                    ? props.profileData.image_url
                    : defaultPic
                }
              />
            </Link>
          </div>
          <div className="bio-info">
            <ul className="bio-ul">
              <li className="bio-li">
                <span className="page-text">Name: </span>{' '}
                {props.profileData.username}
              </li>
              {props.profileData.location ? (
                <li className="bio-li">
                  <span className="page-text">From: </span>{' '}
                  {props.profileData.location}
                </li>
              ) : (
                <li className="bio-li">
                  <span className="page-text">From: </span>The Black Gates
                </li>
              )}
              {props.profileData.favorite_band ? (
                <li className="bio-li">
                  <span className="page-text">Favorite Band: </span>Favorite
                  Band: {props.profileData.favorite_band}
                </li>
              ) : null}
            </ul>
          </div>
        </section>
      )}
    </section>
  );
}

export default UserProfile;
