import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import API from '../api.js';
import SERVER from '../utils.js';

import Nav from './Nav.js';
import Sites from './Sites.js';

import '../master.css';

export default class NewCampSite extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      campSiteData: {},
      amenityData: {},
      amenityList: [],
      newCampSiteId: null,
      newSiteName: null,
      newSitelocation: null,
      latitude: [],
      longitude: [],
      newLatitude: null,
      newLongitude: null,
    }
    this._addTinyTent = this._addTinyTent.bind(this);
    this.postLocationToServer = this.postLocationToServer.bind(this);
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

    })
    .catch( error => {
      console.error(error);
    })

    SERVER.authoriseGetAmenities()
    .then( results => {
      this.setState({
        amenityData: results.data
      })
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
    let newLat = e.lat;
    let newLng = e.lng;

    this.setState({
      newLatitude: newLat,
      newLongitude: newLng,
    });

  }

  renderNewLocation() {

    let children = [];

    if (this.state.latitude === null) {
      return
    } else {
      children.push(
        <Sites
          key={ this.state.newCampSiteId }
          lat={ this.state.newLatitude }
          lng={ this.state.newLongitude }
          />
      )

      return children
    }

  }


  postLocationToServer(details) {
    const newCampSite = {
      name: details.name,
      location: details.location,
      latitude: this.state.newLatitude,
      longitude: this.state.newLongitude,
      cost: null,
    };

    SERVER.postCampSite(newCampSite)
    .then( results => {
      console.log(results);
    });

    SERVER.getCampSites()
    .then( results => {

      let newId = (results.data[results.data.length - 1].id) + 1;

      this.setState({
        newCampSiteId: newId,
      })

      this.renderNewLocation();
      this.props.history.push(`/details/${ this.state.newCampSiteId }`)
    })
  }


  render() {
    return (
      <div
        className="new-campsite-container"
        style={{
          height: '120vh',
          maxWidth: '960px',
          margin: '0 auto'
        }}
      >
        <Nav />
        <h2 className="new-campsite-title" >Pitch A New Tent!</h2>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API.key }}
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }
          onClick={ this._addTinyTent }
          >
          { this.renderLocations() }
          { this.renderNewLocation() }
        </GoogleMapReact>
        <AddCampSiteForm
          onSubmit={ this.postLocationToServer }
          amenityData={ this.state.amenityData }
          amenityList={ this.state.amenityList }
          newName={ this.state.newSiteName }
          newLocation={ this.state.newSitelocation }
        />
      </div>
    )
  }
}


class AddCampSiteForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: "",
      bbq: false,
      toilet: false,
      shower: false,
      kitchen: false,
      laundry: false,
      water: false,
      electricity: false,
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleCheckbox = this._handleCheckbox.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  _handleChange(e) {
    this.setState ({
      [e.target.name] : e.target.value,
    })

  }

  _handleCheckbox(e) {

    if (e.target.checked) {
      this.setState ({
          [e.target.name] : true
      })

      this.props.amenityList.push(e.target.name);

    } else {
      this.setState ({
          [e.target.name] : false
      })

      this.props.amenityList.splice( this.props.amenityList.indexOf(e.target.name), 1 );
    }

  }

  renderAmenityChecklist() {

    let children = [];

    for (let i = 0; i < this.props.amenityData.length; i++) {
      children.push(

        <label
          className="amenity-label"
          key={ this.props.amenityData[i].id }
        >
          { this.props.amenityData[i].name }
          <input
            className="amenity-checkbox"
            type="checkbox"
            name={ this.props.amenityData[ i ].name }
            onChange={ this._handleCheckbox }
          />
        </label>

      )
    }
    return children;
  }

  render() {
    return (
      <form
        className="new-campsite-form"
        onSubmit={ this._handleSubmit }
      >

        <div className="form-group">

          <label className="form-label" >Camp Site Name</label>
          <input
            className="new-campsite-input"
            type="text"
            name="name"
            value={ this.state.name }
            onChange={this._handleChange}
          />

          <label className="form-label" >Where?</label>
          <input
            className="new-campsite-input"
            type="text"
            name="location"
            value={ this.state.location }
            onChange={this._handleChange}
          />
        </div>

        <div className="amenity-checklist">
          <h3 className="new-amenity-title">Amenities Available</h3>
          <div className="amenity-labels">
            { this.renderAmenityChecklist() }
          </div>
        </div>

        <input
          id="new-submit"
          type="submit"
          value="Pitch It!"
        />

      </form>
    )
  }
}
