import React, { Component } from 'react';
import SERVER from '../utils.js';
import Nav from './Nav.js';
import GoogleMapReact from 'google-map-react';
import Sites from './Sites.js';

import '../App.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      campSiteData: {},
      ids: [],
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
    SERVER.getCampSites()
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

      console.log(this.state.campSiteData);
    })
    .catch( error => {
      console.error(error);
    })
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
      <div
        className="home-page"
        style={{
          height: '100vh',
          width: '100%',
        }}
      >
        <Nav />
        <h2>HOME COMPONENT</h2>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhZ3J2771KPwnoP287p1_b640KMp7hJwY' }}
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }
        >
        { this.renderLocations() }
        </GoogleMapReact>
      </div>
    );
  }
}
