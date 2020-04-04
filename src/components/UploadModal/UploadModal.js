import React, { useContext } from 'react';
import { Context } from '../../Context/Context';
import './UploadModal.css';

function UploadModal() {
  const { setShowUpload } = useContext(Context);

  function closeUploadModal() {
    setShowUpload(false);
  }

  function outsideClick(e) {
    e.persist()
    if(e.target.className === 'upload-modal') {
      setShowUpload(false);
    }
  }

  return (
    <div onClick={e => outsideClick(e)} className="upload-modal">
      <div className="upload-container">
        <header className="upload-header">
          <span onClick={closeUploadModal} className="close-btn">
            &times;
          </span>
          <h2>Upload a picture</h2>
        </header>
        <form className="upload-form">
          <label htmlFor="profile-pic">Select image:</label>
          <input
            type="file"
            name="profile-pic"
            accept="image/png, image/jpeg"
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
