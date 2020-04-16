import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import Landing from '../../Pages/Landing/Landing';
import Signup from '../../Pages/Signup/Signup';
import Home from '../../Pages/Home/Home';
import Search from '../../Pages/Search/Search';

function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/userPage/:activeId">
          <PrivateRoute component={Home} />
        </Route>
        <Route path="/search/">
          <PrivateRoute component={Search} />
        </Route>
      </Switch>

      <Footer />
    </>
  );
}

export default App;
