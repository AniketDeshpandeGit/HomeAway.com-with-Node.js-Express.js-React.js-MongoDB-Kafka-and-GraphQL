import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//import PricingProperty from "./PricingProperty";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

//import DetailsProperty from "./DetailsProperty";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
class LocationComponent extends React.Component {
  state = {
    country: "",
    street_address: "",
    unit: "",
    city: "",
    statelive: "",
    zipcode: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  onClick = event => {
    //console.log("on click");
    //console.log(this.state);
    const data = {
      country: this.state.country,
      street_address: this.state.street_address,
      unit: this.state.unit,
      city: this.state.city,
      statelive: this.state.statelive,
      zipcode: this.state.zipcode
    };
   // console.log(data);
  };

  submitDescription = e => {
    //prevent page from refresh
    e.preventDefault();

    const data = {
      country: this.state.country,
      street_address: this.state.street_address,
      unit: this.state.unit,
      city: this.state.city,
      statelive: this.state.statelive,
      zipcode: this.state.zipcode
    };
    //console.log(data);

    this.props.locationChangeHandler(data);
    this.props.handleNext();
  };

  render() {
    const { classes } = this.props;

    return (
      // <form className={classes.container}>
      <Grid container className={classes.container}>
      
        <Grid item xs={12}>
          <Grid
             container
  direction="column"
  justify="space-evenly"
  alignItems="center"
  
          >
        <TextField
          id="standard-name"
          label="Country"
          className={classes.textField}
          value={this.state.country}
          onChange={this.handleChange("country")}
          margin="normal"
          value={this.props.country}
        />
        <br />
        <TextField
          id="standard-street_address"
          label="Street Address"
          className={classes.textField}
          value={this.state.street_address}
          onChange={this.handleChange("street_address")}
          margin="normal"
          value={this.props.street_address}
        />
        <br />
        <TextField
          id="standard-unit"
          label="Unit, Suite Buiding, Etc"
          className={classes.textField}
          value={this.state.unit}
          onChange={this.handleChange("unit")}
          margin="normal"
          value={this.props.unit}
        />
        <br />
        <TextField
          id="standard-city"
          label="City"
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange("city")}
          margin="normal"
          value={this.props.city}
        />
        <br />
        <TextField
          id="standard-state"
          label="State"
          className={classes.textField}
          value={this.state.statelive}
          onChange={this.handleChange("statelive")}
          margin="normal"
          value={this.props.statelive}
        />
        <br />
        <TextField
          id="standard-zip_code"
          label="Zipcode"
          className={classes.textField}
          value={this.state.zipcode}
          onChange={this.handleChange("zipcode")}
          margin="normal"
          value={this.props.zipcode}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.submitDescription}
        >
          Save
        </Button>
        </Grid></Grid></Grid>
     
    );
  }
}

LocationComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationComponent);