import axios from 'axios';

// const serverURL = 'https://campmapp.herokuapp.com/';
const serverURL = 'http://localhost:4444/';

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
  },

  authoriseMapRender() {
    let token = localStorage.getItem("auth-token");
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${token}`
      }
    }
    return axios.get(serverURL + 'campsites.json', axiosConfig);
  },

  authoriseShowCampSite(campSiteId) {
    let token = localStorage.getItem("auth-token");
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${token}`
      }
    }
    return axios.get(serverURL + 'campsites/' + campSiteId + '.json', axiosConfig);
  },

  authoriseGetAmenities() {
    let token = localStorage.getItem("auth-token");
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${token}`
      }
    }
    return axios.get(serverURL + 'amenities.json', axiosConfig);
  }

};

export default SERVER;
