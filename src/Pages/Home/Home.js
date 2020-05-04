import React, { useContext, useEffect, useCallback } from 'react';
import { Context } from '../../Context/Context';
import { useParams } from 'react-router-dom';
import './Home.css';

import Error from '../../components/Error/Error';
import Rant from '../../components/Rant/Rant';
import CreateRant from '../../components/CreateRant/CreateRant';
import UserProfile from '../../components/UserProfile/UserProfile';

// Work on the picture upload feature
//comments section

function Home() {
  let { activeId } = useParams();
  const {
    userRants,
    onPageLoad,
    getPageData,
    userData,
    pageData,
    hasError,
    errorMessage,
  } = useContext(Context);

  //only show the rants of the user whos page is active
  const localRants = userRants.filter(
    (rant) => rant.user_id.toString() === activeId
  );

  //sort by createdAt
  const sortedRants = localRants.sort(function (a, b) {
    let dateA = new Date(a.date_created),
      dateB = new Date(b.date_created);
    return dateB - dateA;
  });

  const allLocalRants = sortedRants.map((rant, i) => {
    return (
      <Rant
        createdAt={rant.date_created}
        content={rant.content}
        key={i}
        id={rant.id}
      />
    );
  });

  const getPageDataCallback = useCallback(getPageData, []);
  useEffect(() => {
    getPageDataCallback(activeId);
  }, [getPageDataCallback, activeId]);

  const onPageLoadCallback = useCallback(onPageLoad, []);
  useEffect(() => {
    onPageLoadCallback();
  }, [onPageLoadCallback]);

  return (
    <main className="container">
      <div className="user-page">
        {hasError && <Error message={errorMessage} />}
        <UserProfile profileData={pageData} />
        <section className="rant-section">
          {userData.id === pageData.id ? <CreateRant /> : null}
          <div className="divider"></div>
          {allLocalRants}
        </section>
      </div>
    </main>
  );
}

export default Home;
