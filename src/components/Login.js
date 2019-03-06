import React, { Component } from 'react';
import axios from 'axios';
import SERVER from '../utils.js';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {}
  }

  _handleSubmit = (e) => {
    e.preventDefault();
  }

  _handleSubmit = (e) => {
    let token = localStorage.getItem('auth-token');
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorisation" : `Bearer ${ token }`
      }
    };
    // let url = 'http://localhost:4444/user_token'
    axios.post(SERVER.userToken(), {
      auth: {
        email: e.email,
        password: e.password
      }
    }, axiosConfig)
    .then( response => {
      localStorage.setItem("auth-token", response.data.jwt);
      this.saverUserToLocal(e);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  saverUserToLocal = (e) => {
    let token = localStorage.getItem('auth-token');
    // let url = 'http://localhost:4444/user';
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "Authorization" : `Bearer ${token}`
      }
    }

    let params = {
      params: {
        "email": e.email
      }
    }

    axios.get(SERVER.user(), params, axiosConfig)
    .then( results => {
      let user = JSON.stringify(results.data);
      console.log(user);
      localStorage.setItem("current-user", user);
      this.props.history.push("/home");
    })
  }

  render() {
    let state = <LoginForm onSubmit={ this._handleSubmit } />;
    return (
      state
    );
  }
}


class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false
    }
  }

  _handleInputs = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }


  render() {
    return(
      <div>
        <form onSubmit={ this._handleSubmit }>
        <h2>Login</h2>
          <input
            placeholder="Email"
            name="email"
            required
            onInput={ this._handleInputs }
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            required
            onInput={ this._handleInputs }
            protected="true"
          />
          <input
            id="submit"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}
