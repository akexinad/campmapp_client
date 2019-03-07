import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


import API from '../api.js';
import SERVER from '../utils.js';

import Nav from './Nav.js';
import Sites from './Sites.js';

import '../master.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      campSiteData: {},
      names: [],
      locations: [],
      latitudes: [],
      longitudes: [],
    }
  }

  /* google-map-react documentation suggests this syntax to pass down the default props to the Google Map component */
  static defaultProps = {
    center: {
      lat: -33.663411,
      lng: 150.017931
    },
    zoom: 9,
  }

  componentDidMount() {
    SERVER.authoriseMapRender()
    .then( results => {

      const campSites = results.data;

      let campSiteIds = [];
      let campSiteNames = [];
      let campSiteLocations = [];
      let campSiteLatitudes = [];
      let campSiteLongitudes = [];

      for (let i = 0; i < campSites.length; i++) {
        campSiteIds.push(campSites[i].id);
        campSiteNames.push(campSites[i].name);
        campSiteLocations.push(campSites[i].location);
        campSiteLatitudes.push(campSites[i].latitude);
        campSiteLongitudes.push(campSites[i].longitude);
      }

      this.setState({
        campSiteData: campSites,
        names: campSiteNames,
        locations: campSiteLocations,
        latitudes: campSiteLatitudes,
        longitudes: campSiteLongitudes,
      })
    })
    .catch( error => {
      console.error(error);
    })


    if (localStorage.getItem("current-user")) {
      let username = JSON.parse(localStorage.getItem("current-user")).username;
      this.setState({
        username: username
      })
    } else {
      return null;
    }
  }

  // componentWillUnmount() {
  // }

  renderLocations() {
    let children = [];
    for (let i = 0; i < this.state.campSiteData.length; i++) {

      children.push(
        <Sites
          key={ this.state.campSiteData[ i ].id }
          lat={ this.state.campSiteData[ i ].latitude }
          lng={ this.state.campSiteData[ i ].longitude }
        />
      )
    }
    return children;
  }

  render() {
    return (

      <div>
        <Nav />
        <div
          className="home-page"
          style={{
            height: '150vh',
            width: '960px',
            margin: '0 auto',
            borderRadius: '20px'
          }}
        >
          <h2 className="home-title">Pick Your Spot!</h2>
          <GoogleMapReact
            defaultCenter={ this.props.center }
            defaultZoom={ this.props.zoom }
          >
          { this.renderLocations() }
          </GoogleMapReact>
        </div>
      </div>


    );
  }
}



// bootstrapURLKeys={{ key: API.key }}
