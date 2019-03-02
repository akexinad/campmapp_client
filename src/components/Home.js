import React, { Component } from 'react';
import SERVER from '../utils.js';
import Nav from './Nav.js';

import '../App.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      location: null,
      latitude: null,
      longitude: null,
    }
    // XXX: I think I will need the state to be an array of latitudes and longitudes
  }

  componentDidMount() {
    SERVER.getCampSites()
      .then( (result) => {
        console.log(result);
      })
  }

  render() {
    return (
      <div>
        <Nav />
        <h2>Home.js Component</h2>
      </div>
    );
  }
}
