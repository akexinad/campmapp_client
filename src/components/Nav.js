import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

export default class Nav extends Component {

  logout() {
    localStorage.clear()
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="navbar">
        <Link to="/home">
          <div className="navbar-links">
            <img
              className="home-icon"
              src="./images/tent-icon.png"
              alt="tent icon as nav-link"
            />
          </div>
        </Link>
        <div>
          <h3>Hello { JSON.parse(localStorage.getItem("current-user")) ? JSON.parse(localStorage.getItem("current-user")).username : "null" }</h3>
        </div>
        <div>
          <Link to="/new">
            <h3>New Place?</h3>
          </Link>
        </div>
      </div>
    )
  }
}
