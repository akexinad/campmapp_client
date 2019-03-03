import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Sites extends Component {
  render() {
    return (
      <div>
        <Link to={ `/details/${ this.props.$dimensionKey }` } >
          <img className="tent" src="tent-icon.png" alt="x" />
        </Link>
      </div>
    );
  }
}



// import React from 'react';

// export default function () {
//   return (
//     <div>
//       <Link to={ `/details/${ this.props.$dimensionKey }` } >
//         <img src="../../public/tent-icon.png" alt="x" />
//       </Link>
//     </div>
//   );
// }
