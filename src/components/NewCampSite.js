import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import API from '../api.js';
import SERVER from '../utils.js';

import Nav from './Nav.js';
import Sites from './Sites.js';

import '../App.css';

export default class NewCampSite extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      campSiteData: {},
      newSiteName: null,
      newSitelocation: null,
      latitude: null,
      longitude: null,
    }
    this._addTinyTent = this._addTinyTent.bind(this);
  }

  /* google-map-react documentation suggests this syntax to pass down the default props to the Google Map component */
  static defaultProps = {
    center: {
      lat: -33.663411,
      lng: 150.017931
    },
    zoom: 10,
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

      console.log(this.state.campSiteData);
    })
    .catch( error => {
      console.error(error);
    })

    let username = JSON.parse(localStorage.getItem("current-user")).username;
    this.setState({
      username: username
    })
  }

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

  _addTinyTent(e) {
    const newLat = e.lat;
    const newLng = e.lng;

    this.setState({
      latitude: newLat,
      longitude: newLng,
    });
  }

  renderNewLocation() {
    let children = [];

    if (this.state.latitude === null) {
      return
    } else {
      children.push(
        <Sites
          key="bevin"
          lat={ this.state.latitude }
          lng={ this.state.longitude }
        />
      )
      return children
    }
  }

  render() {
    return (
      <div
        className="new-page"
        style={{
          height: '100vh',
          width: '100%',
        }}
      >
        <Nav />
        <h2>You can add your own Camp Sites Very Soon!</h2>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API.key }}
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }
          onClick={ this._addTinyTent }
        >
        { this.renderLocations() }
        { this.renderNewLocation() }
        </GoogleMapReact>
      </div>
    )
  }
}
