import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login.js';
import Home from './components/Home.js';
import ShowCampSite from './components/ShowCampSite.js';
import NewCampSite from './components/NewCampSite.js';

import './index.css';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ Login } />
      <Route path="/details/:id" component={ ShowCampSite } />
      <Route exact path="/new" component={ NewCampSite }/>
    </div>
  </Router>
);

ReactDOM.render(Routes, document.getElementById('root'));
