import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home.js';

import './index.css';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ Home } />
    </div>
  </Router>
);

ReactDOM.render(Routes, document.getElementById('root'));
