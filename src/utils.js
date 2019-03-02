import axios from 'axios';

const SERVER = {
  getCampSites() {
    return axios.get('http://localhost:3001/campsites.json');
  },

  getAmenities() {
    return axios.get('http://localhost:3001/amenities.json');
  },

  getUsers() {
    return axios.get('http://localhost:3001/users.json');
  }
};

export default SERVER;
