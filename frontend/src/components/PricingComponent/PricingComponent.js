import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: 200
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class PricingComponent extends React.Component {
  state = {
    startdate: "",
    enddate: "",
    nightrate: "",
    minimumstay: ""
  };

  componentDidMount() {
    this.setState({
      startdate: "",
      enddate: ""
    });
  }

  submitPricing = e => {
    //prevent page from refresh
    e.preventDefault();

    const data = {
      startdate: this.state.startdate,
      enddate: this.state.enddate,
      nightrate: this.state.nightrate,
      minimumstay: this.state.minimumstay
    };
   // console.log(data);

    this.props.pricingChangeHandler(data);
    this.props.handleSubmit();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
   // console.log("props " + JSON.stringify(this.props));
    const { classes } = this.props;
    //console.log("props" + JSON.stringify(classes));
    return (
      <div>
        <form className={classes.container}>
          <TextField
            id="date"
            label="Start Date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            value={this.props.startdate}
            onChange={this.handleChange("startdate")}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="date"
            label="End Date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            value={this.props.enddate}
            onChange={this.handleChange("enddate")}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="standard-nightrate"
            label="Nightly Rate"
            className={classes.textField}
            value={this.props.nightrate}
            onChange={this.handleChange("nightrate")}
            margin="normal"
          />
          <TextField
            id="standard-minimumstay"
            label="Minimum Stay"
            className={classes.textField}
            value={this.props.minimumstay}
            onChange={this.handleChange("minimumstay")}
            margin="normal"
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.submitPricing}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

PricingComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PricingComponent);