import React, { useContext } from "react"
import { Context } from "../../Context/Context"
import { FileDrop } from "react-file-drop"
import "./UploadModal.css"

function UploadModal() {
  const { setShowUpload, setProfilePic } = useContext(Context)

  function closeUploadModal() {
    setShowUpload(false)
  }

  function outsideClick(e) {
    e.persist()
    if (e.target.className === "upload-modal") {
      setShowUpload(false)
    }
  }

  function handleDrop(newPic) {
    console.log(newPic[0])
    setProfilePic(newPic);
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
        <form className="upload-form">
          <div className="drop-box">
            <FileDrop
              onDrop={(file) => handleDrop(file)}
              > Drag and drop a picture here </FileDrop>
          </div>
          <input
            type="file"
            name="profile-pic"
            accept="image/png, image/jpeg, image/jpg"
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  )
}

export default UploadModal
