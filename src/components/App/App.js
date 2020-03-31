import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Landing from '../../Pages/Landing/Landing'
import Signup from '../../Pages/Signup/Signup'
import Home from '../../Pages/Home/Home'

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
        <Route path="/home">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </>
  );
}

export default App;
