import React, { useContext, useState } from 'react';
import { Context } from '../../Context/Context';
import { FileDrop } from 'react-file-drop';
import './UploadModal.css';

function UploadModal() {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dbpni3hrl';
  const [imageData, setImageData] = useState('');
  const { setShowUpload, sendImageUrlToServer } = useContext(Context);

  function closeUploadModal() {
    setShowUpload(false);
  }

  function outsideClick(e) {
    e.persist();
    if (e.target.className === 'upload-modal') {
      setShowUpload(false);
    }
  }

  async function uploadImageToCloud(data) {
    try {
      const res = await fetch(`${CLOUDINARY_URL}/image/upload`, {
        method: 'POST',
        body: data,
      });
      const file = await res.json();

      sendImageUrlToServer(file.secure_url);
    } catch(err) {
      console.log(err);
    }

  }

  // function handleDrop(newPic) {
  //   const data = new FormData()
  //   const file = newPic[0];
  //   const reader = new FileReader();
  //   const preview = document.querySelector('.file-drop-target-preview');
  //   preview.style.visibility = 'visible';

  //   if (file) {
  //     reader.readAsDataURL(file);
  //     data.append('file', file[0])
  //     data.append('upload_preset', 'metalspace')
  //   }

  //   reader.addEventListener(
  //     'load',
  //     function () {
  //       preview.src = reader.result;
  //     },
  //     false
  //   );

  //   uploadImage(data)
  // }

  async function previewFile(e) {
    const files = e.target.files;
    const data = new FormData();
    const preview = document.querySelector('.file-drop-target-preview');
    const reader = new FileReader();
    preview.style.visibility = 'visible';

    data.append('file', files[0]);
    data.append('upload_preset', 'metalspace');

    if (files) {
      reader.readAsDataURL(files[0]);
    }

    reader.addEventListener(
      'load',
      function () {
        preview.src = reader.result;
      },
      false
    );

    setImageData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    uploadImageToCloud(imageData);
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
            <FileDrop onDrop={(file) => console.log(file)}>
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
