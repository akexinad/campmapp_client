import React, { Component } from 'react';
import SERVER from '../utils.js';
import Nav from './Nav.js';

import '../master.css';

export default class ShowCampSite extends Component {
  constructor() {
    super();
    this.state = {
      campSiteData: {},
      name: null,
      location: null,
      amenityData: {},
      photoData: {},
    }
  }

  componentDidMount() {

    const campSiteId = this.props.match.params.id;

    SERVER.authoriseShowCampSite(campSiteId)
    .then( results => {

      const resultsData = results.data;

      this.setState({
        campSiteData: resultsData,
        name: resultsData.name,
        location: resultsData.location,
        amenityData: resultsData.amenities,
        photoData: resultsData.photos
      })

    })
    .catch( error => {
      console.error(error);
    })
  }

  renderAmenityIcons() {
    let icons = [];
    for (var i = 0; i < this.state.amenityData.length; i++) {

      icons.push(
        <img
          key={ this.state.amenityData[ i ].id }
          src={ `./images/${ this.state.amenityData[ i ].name }.png` }
          alt={ `${ this.state.amenityData[ i ].name } icon` }
        />
      )
    }
    return icons;
  }

  renderCampSitePhotos() {
    let photos = [];
    for (let i = 0; i < this.state.photoData.length; i++) {

      photos.push(
        <img
          key={ this.state.photoData[ i ].id }
          src={ this.state.photoData[ i ].url }
          alt="Camp Site"
        />
      )
    }
    return photos;
  }

  render() {
    return (
      <div>
        <Nav />
        <h2>{ this.state.campSiteData.name }</h2>
        <h3>{ this.state.location }</h3>
        <h3>Amenities</h3>
        <div className="amenity-container">
          { this.renderAmenityIcons() }
        </div>
        <div className="photo-container">
          { this.renderCampSitePhotos() }
        </div>
      </div>
    );
  }
}
