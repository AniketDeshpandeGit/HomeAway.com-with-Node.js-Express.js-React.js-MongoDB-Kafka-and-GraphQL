import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Navbar from ".././Navbar/navbar";
import Cards from "../Cards/Cards";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    position: "fixed",
    top: "0",
    marginTop: "100px"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: "100px"
  }
});

class ShowProperty extends Component {
  constructor() {
    super();
    this.state = {
      property_list: [],
      state_name: [],
      travellerkey: ""
    };
  }
  componentDidMount() {
    console.log("in show did mount");
    this.state.travellerkey = this.props.location.state.profile.travellerid;
    console.log(this.props.location.state.profile);
    const data = {
      search: this.props.location.state.profile.search,
      date_from: this.props.location.state.profile.date_from,
      date_to: this.props.location.state.profile.date_to,
      num_people: this.props.location.state.profile.num_people,
      travellerkey: this.props.location.state.profile.travellerid
    };
    console.log("in show property");
    console.log(data);
    axios
      .get("http://localhost:3001/getproperty", { params: { data: data } })
      .then(response => {
        const data = JSON.stringify(response.data);

        this.setState({
          property_list: this.state.property_list.concat(response.data)
        });
      });
  }

  render() {
    const { classes, theme } = this.props;
    // var rowelements=[]
    // for(var i=0;i<this.state.property_list.length;i++){
    //     rowelemets[i]=Object.keys(this.state.property_list)

    // }
    var arr3 = Object.values(this.state.property_list);
    console.log(arr3);
    // console.log(this.state.property_list.length)
    var elements = [];
    for (var i = 0; i < this.state.property_list.length; i++) {
      elements.push(
        <Cards key={i} travellerkey={this.state.travellerkey} props={arr3[i]} />
      );
    }
    //   console.log("this. property Ani "+this.state.property_list)
    //       var data=this.state.property_list
    //       var row1=JSON.stringify(data[0])
    //       console.log("data"+row1)
    // var keys = Object.keys(this.state.property_list)
    // console.log("Keys" + this.props.props)

    return (
      <div>
        <div className={classes.root}>
          <Navbar />
        </div>
        <div>
          <Paper className={classes.paper} elevation={1}>
            {elements}
          </Paper>
        </div>
      </div>
    );
  }
}

// ShowProperty.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(ShowProperty);
