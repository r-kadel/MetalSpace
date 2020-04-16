import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from '../../Context/Context';
import './Search.css';
import UserProfile from '../../components/UserProfile/UserProfile';

function Search() {
  const [allProfiles, setAllProfiles] = useState([]);
  const { onSearchLoad, userData } = useContext(Context);

  const BASE_URL = 'http://localhost:8000/api';

  function getAllUsers() {
    fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resJson) => setAllProfiles(resJson))
      .catch((err) => console.log(err));
  }

  const listProfiles = allProfiles
    .filter((profile) => profile.id !== userData.id)
    .map((profile) => {
      return <UserProfile key={profile.id} profileData={profile} />;
    });

  const onSearchLoadCallback = useCallback(onSearchLoad, []);
  useEffect(() => {
    onSearchLoadCallback();
  }, [onSearchLoadCallback]);

  return (
    <main className="container">
      <div className="search-page">
        <h1>Search all Users</h1>
        <button onClick={getAllUsers} className="search-btn">
          Search
        </button>
        <section className="search-results">{listProfiles}</section>
      </div>
    </main>
  );
}

export default Search;
