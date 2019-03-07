import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../master.css';

export default class Sites extends Component {
  render() {
    return (
      <div>
        <Link
          to={ `/details/${ this.props.$dimensionKey }` }
        >
          <img
            className="tent"
            src="./images/tent-icon.png"
            alt="tent icon"
          />
        </Link>
      </div>
    );
  }
}
