import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from ".././Navbar/navbar";

import Button from "@material-ui/core/Button";
import { Route } from "react-router-dom";

import { connect } from "react-redux";
import { createBook } from "../../actions";

import { loginDetails } from "../../actions";
import { Field, reduxForm } from "redux-form";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      authFlag: false,
      travellerkey: "",
      traveller: [],
      profile: ""
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }

  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  submitLogin = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };

    axios.defaults.withCredentials = true;

    axios.post("http://localhost:3001/login", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log(response);
        this.setState({
          traveller: this.state.traveller.concat(response.data)
        });
        console.log("traveller" + this.state.traveller[0]._id);
        const data1 = {
          username: this.state.username,
          password: this.state.password,
          travellerkey: response.data._id
        };
        console.log(data1);
        this.setState({
          authFlag: true,
          profile: data1
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };

  render() {
    // console.log(cookie)
    // let redirectVar = null;
    // if(cookie.load('cookie')){
    //     //console.log(cookie.load('cookie'))
    // redirectVar = <Redirect to= "/home"/>
    // }

    // if(this.state.authFlag===true){
    //     console.log(this.state.authFlag)
    //     //console.log(cookie.load('cookie'))
    //     redirectVar = <Redirect to= "/home"/>
    //  }
    const { authFlag, profile } = this.state;
    let redirectVar = null;
    if (authFlag) {
      console.log(this.state.authFlag);
      if (this.state.authFlag === true) {
        return (redirectVar = (
          <Redirect
            to={{
              pathname: "/travellerafterlogin",
              state: { profile: this.state.profile }
            }}
          />
        ));
      }
    }

    return (
      <header class="loginhead">
        <Navbar position="absolute" />
        <div>
          {redirectVar}
          <div className="container">
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>Traveller Login</h2>
                  <p>Please enter your username and password</p>
                </div>
                <div className="form-group">
                  {/* <input onChange = {this.usernameChangeHandler}  className="form-control" name="username" placeholder="Username"/>
                   */}
                  <input
                    label="username"
                    name="username"
                    type="text"
                    component={this.renderField}
                    onChange={this.usernameChangeHandler}
                  />
                </div>
                <div class="form-group">
                  {/* <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/> */}
                  <input
                    label="password"
                    name="password"
                    type="password"
                    component={this.renderField}
                    onChange={this.passwordChangeHandler}
                  />
                  <br />
                </div>
                <Button
                  onClick={this.submitLogin}
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
                &nbsp;
                <Route
                  render={({ history }) => (
                    <Button
                      variant="contained"
                      color="primary"
                      value="Owner"
                      onClick={() => {
                        history.push({
                          pathname: "/travellersignup"
                        });
                      }}
                    >
                      Sign Up
                    </Button>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Login;

// export default reduxForm({
//   destroyOnUnmount: false,
//   form: "NewOwner"
// })(
//   connect(
//     null,
//     { loginDetails }
//   )(Login)
// );
