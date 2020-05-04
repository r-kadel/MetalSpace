import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from '../../Context/Context';
import Loading from '../../components/Loading/Loading';
import './Search.css';
import UserProfile from '../../components/UserProfile/UserProfile';

function Search() {
  const [allProfiles, setAllProfiles] = useState([]);
  const { onSearchLoad, userData, loading, setLoading, BASE_URL } = useContext(
    Context
  );

  function getAllUsers() {
    fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setAllProfiles(resJson);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  const listProfiles = allProfiles
    .filter((profile) => profile.id !== userData.id)
    .map((profile) => {
      return <UserProfile key={profile.id} profileData={profile} />;
    });

  const onSearchLoadCallback = useCallback(onSearchLoad, []);
  const getAllUsersCallback = useCallback(getAllUsers, []);

  useEffect(() => {
    onSearchLoadCallback();
    getAllUsersCallback();
  }, [onSearchLoadCallback, getAllUsersCallback]);

  return (
    <main className="container">
      <div className="search-page">
        <h1 className="search-h1">Search all Users</h1>
        {loading && <Loading />}
        <section className="search-results">{listProfiles}</section>
      </div>
    </main>
  );
}

export default Search;
