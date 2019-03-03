import React, { Component } from 'react';
import SERVER from '../utils.js';
import Nav from './Nav.js';


export default class SiteInfo extends Component {
  constructor() {
    super();
    this.state = {
      campSiteName: null,
      campSiteId: null,

    }
  }

  componentDidMount() {
    // console.log(this.props.match.params.id);

    const campSiteId = this.props.match.params.id;

    SERVER.getCampSite(campSiteId)
    .then( results => {
      console.log(results.data);
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <h3>Camp Site Info Coming Soon</h3>
      </div>
    );
  }
}
