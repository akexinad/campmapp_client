import axios from 'axios';

const SERVER_URL = 'http://localhost:3001/'

const SERVER = {
  getCampSites() {
    return axios.get(SERVER_URL + 'campsites.json');
  },

  getCampSite(campSiteId) {
    return axios.get(SERVER_URL + 'campsites/' + campSiteId + '.json')
  },

  getAmenities() {
    return axios.get(SERVER_URL + 'amenities.json');
  },

  getUsers() {
    return axios.get(SERVER_URL + 'users.json');
  }
};

export default SERVER;
