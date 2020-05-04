import React, { useContext } from 'react';
import { Context } from '../../Context/Context';
import Error from '../Error/Error';
import './EditModal.css';

function EditModal() {
  const {
    setShowEdit,
    userData,
    patchUserData,
    setHasError,
    setErrorMessage,
    hasError,
    errorMessage,
  } = useContext(Context);

  function outsideClick(e) {
    e.persist();
    if (e.target.className === 'edit-modal') {
      closeEditModal();
    }
  }

  function closeEditModal() {
    setShowEdit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { username, location, favorite_band } = e.target;
    let updatedUser = {};
    const updateFields = {
      username: username.value.trim(),
      location: location.value.trim(),
      favorite_band: favorite_band.value.trim(),
    };

    for (const key in updateFields) {
      if (updateFields[key]) {
        updatedUser[key] = updateFields[key];
      }
    }

    //make sure something is being patched
    const numberOfValues = Object.values(updatedUser).filter(Boolean).length;
    if (numberOfValues === 0) {
      setHasError(true);
      setErrorMessage('Must update atleast one field');
    } else {
      patchUserData(updatedUser);
    }
  }

  return (
    <div onClick={(e) => outsideClick(e)} className="edit-modal">
      <div className="edit-container">
        <header className="edit-header">
          <span onClick={closeEditModal} className="close-btn">
            &times;
          </span>
          <h2>Edit your profile</h2>
        </header>
        {hasError && <Error message={errorMessage} />}
        <form onSubmit={handleSubmit} className="edit-form">
          <label htmlFor="username">User Name: </label>
          <input name="username" placeholder={userData.username} type="text" />
          <label htmlFor="location">Location: </label>
          <input name="location" placeholder={userData.location} type="text" />
          <label htmlFor="favorite_band">Favorite Band: </label>
          <input
            name="favorite_band"
            type="text"
            placeholder={userData.favorite_band}
          />
          <button className="edit-btn" type="submit">
            Make Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
