import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Grid, Paper } from "@material-ui/core";
import Navbar from "../Navbar/navbar";
//GraphQL
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Query } from "react-apollo";
const Traveller_SignUp_Query = gql`
  mutation travellersignup(
    $username: String!
    $password: String!
    $phonenumber: String!
    $aboutme: String!
    $city: String!
    $gender: String!
    $school: String!
    $hometown: String!
    $company: String!
    $age: String!
  ) {
    travellersignup(
      username: $username
      password: $password
      phonenumber: $phonenumber
      aboutme: $aboutme
      city: $city
      gender: $gender
      school: $school
      hometown: $hometown
      company: $company
      age: $age
    ) {
      username
    }
  }
`;

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 13,
    direction: "column",
    justify: "space-evenly",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    borderBottomWidth: 3
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 5
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});
class TravellerSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      multiline: "",
      phoneno: "",
      city: "",
      school: "",
      hometown: "",
      company: "",
      gender: "",
      password: ""
    };
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
    console.log(event.target.value);
  };
  handleClick = e => {
    // console.log(this.state)
    const data = {
      name: this.state.name,
      password: this.state.password,
      age: this.state.age,
      multiline: this.state.multiline,
      phoneno: this.state.phoneno,
      city: this.state.city,
      school: this.state.school,
      hometown: this.state.hometown,
      company: this.state.company,
      gender: this.state.gender
    };

    axios.defaults.withCredentials = true;
    console.log(data);
    axios.post("http://localhost:3001/travellersignup", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true
        });
        window.location = "/travellerlogin";
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      // <form className={classes.container} noValidate autoComplete="off">
      <Grid container className={classes.container}>
        <Navbar position="absolute" />
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <TextField
              id="standard-name"
              label="Username"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              value={this.state.password}
              onChange={this.handleChange("password")}
              margin="normal"
            />
            <TextField
              id="standard-phoneno"
              label="Phone Number"
              className={classes.textField}
              value={this.state.phoneno}
              onChange={this.handleChange("phoneno")}
              margin="normal"
            />

            <TextField
              id="standard-multiline-flexible"
              label="Full Name"
              multiline
              rowsMax="4"
              value={this.state.multiline}
              onChange={this.handleChange("multiline")}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="standard-city"
              label="City"
              className={classes.textField}
              value={this.state.city}
              onChange={this.handleChange("city")}
              margin="normal"
            />
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="gender"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChangeGender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio checkedIcon />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio checkedIcon />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio checkedIcon />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              id="standard-school"
              label="School"
              className={classes.textField}
              value={this.state.school}
              onChange={this.handleChange("school")}
              margin="normal"
            />
            <TextField
              id="standard-hometown"
              label="Hometown"
              className={classes.textField}
              value={this.state.hometown}
              onChange={this.handleChange("hometown")}
              margin="normal"
            />
            <TextField
              id="standard-company"
              label="Company"
              className={classes.textField}
              value={this.state.company}
              onChange={this.handleChange("company")}
              margin="normal"
            />
            <TextField
              id="standard-age"
              label="Age"
              value={this.state.age}
              onChange={this.handleChange("age")}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
            <Mutation mutation={Traveller_SignUp_Query}>
              {travellersignup => (
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  onClick={() => {
                    travellersignup({
                      variables: {
                        username: this.state.name,
                        password: this.state.password,
                        age: this.state.age,
                        city: this.state.city,
                        phonenumber: this.state.phoneno,
                        aboutme: this.state.multiline,
                        gender: this.state.gender,
                        school: this.state.school,
                        hometown: this.state.hometown,
                        company: this.state.company
                      }
                    });
                  }}
                >
                  Submit
                </Button>
              )}
            </Mutation>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

TravellerSignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TravellerSignUp);
