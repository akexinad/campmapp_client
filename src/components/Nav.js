import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

export default class Nav extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <div className="navbar-links">
            <img src="./images/tent-icon.png" alt="tent icon as nav-link"/>
          </div>
        </Link>
      </div>
    )
  }
}
