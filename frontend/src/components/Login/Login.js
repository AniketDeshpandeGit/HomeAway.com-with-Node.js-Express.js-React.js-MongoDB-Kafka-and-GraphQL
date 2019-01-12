import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Navbar from ".././Navbar/navbar";

import Button from "@material-ui/core/Button";
import { Route } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createBook } from "../../actions";

import { loginDetails } from "../../actions";

//GraphQL
import gql from "graphql-tag";
import { Query } from "react-apollo";
const PROPERTIES_QUERY = gql`
  query PropertiesQuery {
    properties {
      _id
      ownerID
      country
      street_address
      unit
      city
      statelive
      zipcode
      headline
      property_description
      type_house
      bedrooms
      accomodates
      bathrooms
      startdate
      enddate
      nightrate
      minimumstay
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      authFlag: false,
      redirect: false,
      owner: [],
      ownerkey: "",
      profile: "",
      resultTrue: false,
      gData: {},
      results: {}
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);
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
  //change
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
    console.log(data);

    axios.defaults.withCredentials = true;

    axios.post("http://localhost:3001/ownerlogin", data).then(response => {
      console.log("Status Code : ", response.status);
      console.log(response.data._id);
      if (response.status === 200) {
        this.setState({
          authFlag: true,
          owner: this.state.owner.concat(response.data)
        });

        console.log("Owner ");
        console.log(this.state);
        const data1 = {
          username: this.state.username,
          password: this.state.password,
          ownerkey: response.data._id
          //ownerkey : 2
        };
        this.setState({
          redirect: true,
          profile: data1
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };

  componentDidMount() {
    console.log("did mount: " + this.state.resultTrue);
    this.state.resultTrue = true;
    console.log("did mount: " + this.state.resultTrue);

    // if (this.state.resultTrue) {
    //   console.log("Result True " + this.state.resultTrue);
    //   this.state.results =

    //   console.log("Result After query " + JSON.stringify(this.state.results));
    // }
  }

  render() {
    const { redirect, profile } = this.state;

    var finalThing = this.state.results;

    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "ownerdashboard",
            state: { profile: this.state.profile }
          }}
        />
      );

    // let results = <h4>Loading</h4>;
    // if (this.state.resultTrue) {
    //   results = (
    //     <Query query={PROPERTIES_QUERY}>
    //       {(loading, error, data) => {
    //         if (loading) return <h4>Loading...</h4>;
    //         if (error) console.log(error);

    //         this.setState({
    //           gData: data
    //         });

    //         if (this.state.gData) {
    //           console.log("data Inside " + data);
    //         }
    //         console.log("data" + data);
    //         return <h4>{this.state.gData}</h4>;
    //       }}
    //     </Query>
    //   );
    // }

    return (
      <header class="loginhead">
        <Navbar />
        <div>
          <div className="container">
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>Owner Login</h2>
                  <p>Please enter your username and password</p>
                </div>
                <div className="form-group">
                  {/* <input onChange = {this.usernameChangeHandler} type="text" className="form-control" name="username" placeholder="Username"/> */}
                  <input
                    label="username"
                    name="username"
                    type="text"
                    component={this.renderField}
                    onChange={this.usernameChangeHandler}
                  />
                </div>
                <div class="form-group">
                  <input
                    label="password"
                    name="password"
                    type="password"
                    component={this.renderField}
                    onChange={this.passwordChangeHandler}
                  />
                  {/* <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/> */}
                </div>
                <Button
                  onClick={this.submitLogin}
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>{" "}
                &nbsp;
                {/* <Route render={({ history}) => (
            <Button variant="contained" color="primary" value ="Owner" onClick={() => { history.push({
      pathname:"/ownerdashboard",
      state:{
        username: this.state.username,
        password: this.state.password,
        
       }
      }); }}
>
                Login
            </Button>
             )} /> &nbsp; */}
                <Route
                  render={({ history }) => (
                    <Button
                      variant="contained"
                      color="primary"
                      value="Owner"
                      onClick={() => {
                        history.push({
                          pathname: "/signupowner"
                        });
                      }}
                    >
                      Sign Up
                    </Button>
                  )}
                />
                <Query query={PROPERTIES_QUERY}>
                  {({ loading, error, data }) => {
                    if (loading) return <h4 />;
                    if (error) console.log(error);

                    //gData: data

                    // if (this.state.gData) {
                    //   console.log("data Inside " + data);
                    // }
                    //console.log("data" + data);
                    return <h4 />;
                  }}
                </Query>
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

//Change over here
