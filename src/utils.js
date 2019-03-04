import axios from 'axios';

// const serverURL = 'https://campmapp.herokuapp.com/';
const serverURL = 'http://localhost:3001/';

const SERVER = {
  getCampSites() {
    return axios.get(serverURL + 'campsites.json');
  },

  getCampSite(campSiteId) {
    return axios.get(serverURL + 'campsites/' + campSiteId + '.json')
  },

  getAmenities() {
    return axios.get(serverURL + 'amenities.json');
  },

  getUsers() {
    return axios.get(serverURL + 'users.json');
  }
};

export default SERVER;
