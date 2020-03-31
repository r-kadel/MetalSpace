import React from 'react';

function Upload() {
  return (
    <form>
      <label for="profile-pic">Select image:</label>
      <input type="file" name="profile-pic" accept="image/png, image/jpeg" />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Upload;
