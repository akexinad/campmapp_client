import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import { Transition, animated } from 'react-spring/renderprops';

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
    return (
      <Spring
        from={{
          opacity: 0,
          marginTop: -500,
        }}
        to={{
          opacity: 1,
          marginTop: 0,
        }}
        config={{
          duration: 1000
        }}
      >
        { props => (
          <div style={ props }>
            <LoginForm onSubmit={ this._handleSubmit } />;
          </div>
        )}
      </Spring>
    );
  }
}


class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      showLoginForm: true,
    }
  }

  _handleInputs = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  fadeOut = (e) => {
    this.setState({
      showLoginForm: !this.state.showLoginForm,
    })
  }



  render() {
    return(

      <Transition
          native
          items={ this.state.showLoginForm }
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          { show => show && (props => (
            <animated.div style={props}>
              <div className="login-container">
                <h2 className="login-title">CampMapp</h2>
                <img
                  className="login-image"
                  src="./images/login-tent-icon.png"
                  alt="Tiny Tent"
                />
                <form
                  className="login-form"
                  onSubmit={ this._handleSubmit }
                >
                <h3 className="login-sub-heading">Login</h3>
                  <input
                    className="login-input"
                    placeholder="Email"
                    name="email"
                    required
                    onInput={ this._handleInputs }
                  />
                  <input
                    className="login-input"
                    placeholder="Password"
                    name="password"
                    type="password"
                    required
                    onInput={ this._handleInputs }
                    protected="true"
                  />
                  <input
                    className="submit-btn"
                    id="submit"
                    type="submit"
                    value="Submit"
                    onClick={ this.fadeOut }
                  />
                </form>
              </div>
            </animated.div>
          ))}
        </Transition>
    );
  }
}
