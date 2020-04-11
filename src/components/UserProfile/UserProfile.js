import React, { useContext } from 'react';
import './UserProfile.css';
import { Context } from '../../Context/Context';
import UploadModal from '../UploadModal/UploadModal';

function UserProfile() {
  const {
    showUpload,
    setShowUpload,
    profilePic,
    setProfilePic,
    userData,
  } = useContext(Context);

  function openUploadModal() {
    setShowUpload(true);
  }

  function show() {
    var uint8array = new TextEncoder("utf-8").encode("¢");
    console.log(new TextDecoder("utf-8").decode(uint8array))
    console.log(userData.profile_image)
    // console.log(
    //   'data:image/png;charset=utf-8;base64,' +
    //     btoa(
    //       String.fromCharCode.apply(
    //         null,
    //         new Uint8Array(userData.profile_image.data)
    //       )
    //     )
    // );

    // let base64 = userData.profile_image.data;
    // let buffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    // let blob = new Blob([buffer], { type: 'image/png' });
    // let url = URL.createObjectURL(blob);
    // setProfilePic(url);
  }

  return (
    <section className="personal-section">
      <div className="img-box">
        <img className="profile-pic" alt="profile" src={profilePic} />
        <div className="pic-buttons">
          <button onClick={openUploadModal} className="pic-edit-btn">
            Edit
          </button>
          <button onClick={show} className="pic-edit-btn">
            test
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
