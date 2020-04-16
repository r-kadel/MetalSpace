import React, { useState, useContext } from 'react';
import { Context } from '../../Context/Context'
import './CreateRant.css';

function CreateRant() {
  const [rant, setRant] = useState('');

  const { createNewRant } = useContext(Context);

  function handlePostSubmit(e) {
    e.preventDefault();
    e.target.reset()
    setRant('')
    createNewRant(rant);
  }

  return (
    <form onSubmit={handlePostSubmit} className="create-rant">
      <textarea
        onChange={e => {
          setRant(e.target.value);
        }}
        rows="5"
        className="create-rant-textarea"
        placeholder="What are you mad about today?"
        required></textarea>
      <button className="post-btn" type="submit">
        Post!
      </button>
    </form>
  );
}

export default CreateRant;
