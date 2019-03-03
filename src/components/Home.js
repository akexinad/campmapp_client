import React, { Component } from 'react';
import SERVER from '../utils.js';
import Nav from './Nav.js';

import '../App.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      names: [],
      locations: [],
      latitudes: [],
      longitudes: [],
    }
    // XXX: I think I will need the state to be an array of latitudes and longitudes
  }

  componentDidMount() {
    SERVER.getCampSites()
    .then( results => {

      const campSites = results.data;
      let campSiteNames = [];
      let campSiteLocations = [];
      let campSiteLatitudes = [];
      let campSiteLongitudes = [];

      for (let i = 0; i < campSites.length; i++) {
        campSiteNames.push(campSites[i].name);
        campSiteLocations.push(campSites[i].location);
        campSiteLatitudes.push(campSites[i].latitude);
        campSiteLongitudes.push(campSites[i].longitude);
      }
      // console.log(campSiteNames);
      // console.log(campSiteLocations);
      // console.log(campSiteLatitudes);
      // console.log(campSiteLongitudes);

      this.setState({
        names: campSiteNames,
        locations: campSiteLocations,
        latitudes: campSiteLatitudes,
        longitudes: campSiteLongitudes,
      })
    })
    .catch( error => {
      console.error(error);
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
