import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context';
import { FileDrop } from 'react-file-drop';
import './UploadModal.css';

function UploadModal() {
  const [imgToUpload, setImgToUpload] = useState('');
  const { setShowUpload, uploadPic } = useContext(Context);

  function closeUploadModal() {
    setShowUpload(false);
  }

  function outsideClick(e) {
    e.persist();
    if (e.target.className === 'upload-modal') {
      setShowUpload(false);
    }
  }

  function handleDrop(newPic) {
    const preview = document.querySelector('.file-drop-target-preview');
    preview.style.visibility = 'visible';
    const file = newPic[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.addEventListener(
      'load',
      function () {
        preview.src = reader.result;
        setImgToUpload(reader.result);
      },
      false
    );
  }

  function previewFile() {
    const preview = document.querySelector('.file-drop-target-preview');
    preview.style.visibility = 'visible';
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.addEventListener(
      'load',
      function () {
        preview.src = reader.result;
        setImgToUpload(reader.result);
      },
      false
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    uploadPic(imgToUpload);
  }

  return (
    <div onClick={(e) => outsideClick(e)} className="upload-modal">
      <div className="upload-container">
        <header className="upload-header">
          <span onClick={closeUploadModal} className="close-btn">
            &times;
          </span>
          <h2>Upload a picture</h2>
        </header>
        <form onSubmit={handleSubmit} className="upload-form">
          <input
            value=""
            title=" "
            className="choose-file-btn"
            onChange={previewFile}
            type="file"
            name="profile-pic"
            accept="image/png, image/jpeg, image/jpg"
          />
          <span className="or">or</span>
          <div className="drop-box">
            <FileDrop onDrop={(file) => handleDrop(file)}>
              {' '}
              Drag and drop a picture here
              <img className="file-drop-target-preview" alt="preview" />
            </FileDrop>
          </div>
          <button className="upload-btn" type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
