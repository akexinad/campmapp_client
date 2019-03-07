import axios from 'axios';

// const serverURL = 'https://campmapp.herokuapp.com/';
const serverURL = 'http://localhost:4444/';

const SERVER = {
  user() {
    return serverURL + 'user';
  },

  userToken() {
    return serverURL + 'user_token';
  },

  getCampSites() {
    let token = localStorage.getItem("auth-token");
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${token}`
      }
    };

    return axios.get(serverURL + 'campsites.json', axiosConfig);
  },

  getCampSite(campSiteId) {
    return axios.get(serverURL + 'campsites/' + campSiteId + '.json')
  },

  postCampSite(newCampSite) {
    let token = localStorage.getItem("auth-token");
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${token}`
      }
    }

    return axios.post(serverURL + 'campsites.json', { campsite: newCampSite }, axiosConfig);
  },

  getAmenities() {
    return axios.get(serverURL + 'amenities.json');
  },

  postAmenities(amenity) {
    let token = localStorage.getItem("auth-token");
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization" : `Bearer ${token}`
      }
    }

    return axios.post(serverURL + 'amenities.json', { amenity: amenity }, axiosConfig);
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
