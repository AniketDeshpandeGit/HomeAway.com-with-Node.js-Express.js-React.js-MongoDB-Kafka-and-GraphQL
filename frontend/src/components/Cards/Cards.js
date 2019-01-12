import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import cookie from "react-cookies";
import { TextField } from "@material-ui/core";
const styles = theme => ({
  card: {
    display: "flex",

    height: "auto",
    padding: "1%",
    maxWidth: "600"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    height: 200,
    width: 200
  },
  controls: {
    display: "flex"
  }
});

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      property_list: [],
      ownerkey: "",
      propertykey: "",
      traverllerkey: "",
      multiline: "Message"
    };
    this.Bookit = this.Bookit.bind(this);
    this.Message = this.Message.bind(this);
  }

  componentDidMount() {
    // var cookieload=cookie.load('cookie')
    // var getdata=cookies.get('username')
    console.log("card in search");
    console.log(this.props);
    // var arr6 = Object.keys(cookieload);
    // console.log(arr6)
    // var a=cookieload[18]
    //console.log(a)
    //
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  Bookit = e => {
    console.log("in Bookit");
    console.log(this.props);
    console.log(this.props.travellerkey);
    var propertykey = this.props.props._id;
    var ownerkey = this.props.props.ownerkey;
    var traverllerkey = this.props.travellerkey;
    var propertyHeadLine = this.props.props.headline;

    console.log("propertyHeadLine " + propertyHeadLine);
    console.log("this.props.props " + this.props.props);
    const data = {
      propertykey,
      ownerkey,
      traverllerkey,
      propertyHeadLine
    };
    console.log(data);
    axios.defaults.withCredentials = true;

    axios.post("http://localhost:3001/bookproperty", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };

  Message = e => {
    console.log("in message");
    console.log(this.props);
    console.log(this.state);
    console.log(this.props.travellerkey);
    var propertykey = this.props.props._id;
    var ownerkey = this.props.props.ownerkey;
    var traverllerkey = this.props.travellerkey;
    var message = this.state.multiline;
    const data = {
      propertykey,
      ownerkey,
      traverllerkey,
      message
    };
    console.log(data);
    axios.post("http://localhost:3001/message", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };

  render() {
    //console.log(this.props.props)
    const { classes, theme } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=architecture-beautiful-exterior-106399.jpg&fm=jpg"
          title="Property"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography gutterBottom component="h1" variant="headline">
              {this.props.props.headline}
            </Typography>
            <Typography variant="subheading" color="textSecondary">
              {this.props.props.bedroom}BR {this.props.props.bathroom} BT Sleeps{" "}
              {this.props.props.accomodates}
            </Typography>

            <Typography gutterBottom align="right" variant="h1">
              ${this.props.props.nightly_rate} per night
              <br />
            </Typography>

            <Typography component="p">
              {this.props.props.property_description}
            </Typography>
            <CardActions>
              <Button size="big" color="primary" onClick={this.Bookit}>
                Book
              </Button>
              <TextField
                id="standard-multiline-flexible"
                label="Message"
                multiline
                rowsMax="4"
                value={this.state.multiline}
                onChange={this.handleChange("multiline")}
                className={classes.textField}
                margin="normal"
              />
              <Button size="big" color="primary" onClick={this.Message}>
                Message Owner
              </Button>
            </CardActions>
          </CardContent>
        </div>
      </Card>
    );
  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Cards);
