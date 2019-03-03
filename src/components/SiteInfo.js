import React, { Component } from 'react';
import SERVER from '../utils.js';
import Nav from './Nav.js';


export default class SiteInfo extends Component {
  constructor() {
    super();
    this.state = {
      campSiteData: {},
      amenityData: {},
      name: null,
      location: null,
    }
  }

  componentDidMount() {
    const campSiteId = this.props.match.params.id;

    SERVER.getCampSite(campSiteId)
    .then( results => {

      const resultsData = results.data;

      // let amenitiesList = []
      //
      // for (var i = 0; i < resultsData.amenities.length; i++) {
      //   amenitiesList.push(resultsData.amenities[ i ].name)
      //   amenitiesList.push(resultsData.amen)
      // }

      this.setState({
        campSiteData: resultsData,
        name: resultsData.name,
        location: resultsData.location,
        amenityData: resultsData.amenities,
      })

    })
    .catch( error => {
      console.error(error);
    })
  }

  renderAmenityIcons() {
    let children = [];
    for (var i = 0; i < this.state.amenityData.length; i++) {

      children.push(
        <img
          key={ this.state.amenityData[ i ].id }
          src={`./images/${ this.state.amenityData[ i ].name }.png`}
          alt={`${ this.state.amenityData[ i ].name } icon`}
        />
      )
    }
    return children;
  }

  render() {
    return (
      <div>
        <Nav />
        <h2>{ this.state.campSiteData.name }</h2>
        <h3>{ this.state.location }</h3>
        <h3>Amenities</h3>
        <div>
          { this.renderAmenityIcons() }
        </div>
      </div>
    );
  }
}
