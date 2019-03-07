import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../master.css';

export default class Nav extends Component {

  logout() {
    localStorage.clear()
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="navbar">
        <div className="nav-new-place">
          <Link
            className="link"
            to="/new"
          >
            <h3 className="new-place-link">Add A New Place!</h3>
          </Link>
        </div>
        <div className="nav-home">
          <Link
            to="/home"
          >
            <img
              className="home-icon"
              src="./images/tent-icon.png"
              alt="tent icon as nav-link"
              />
          </Link>
        </div>
        <div className="welcome">
          <h3 className="welcome-text" >Welcome Back { JSON.parse(localStorage.getItem("current-user")) ? JSON.parse(localStorage.getItem("current-user")).username : "null" }!</h3>
        </div>
      </div>
    )
  }
}
