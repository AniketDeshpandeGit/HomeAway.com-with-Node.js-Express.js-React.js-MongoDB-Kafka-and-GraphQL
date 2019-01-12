import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from 'material-ui/icons/MoveToInbox';
// import DraftsIcon from 'material-ui/icons/Drafts';
// import StarIcon from 'material-ui/icons/Star';
// import SendIcon from 'material-ui/icons/Send';
//import Navbar from ".././Navbar/navbar";
import LocationComponent from "../LocationComponent/LocationComponent";
//import DetailsComponent from "./DetailsProperty";

//import Photo from ".././Photo/Photo";
//import AddressForm from "./AddressForm";
import PhotoComponent from "../PhotoComponent/PhotoComponent";
import DetailsComponent from '../DetailsComponent/DetailsComponent';
import axios from "axios";
import PricingComponent from "../PricingComponent/PricingComponent";
//import Review from "./Review";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "../Navbar/navbar";
// import ownerLogo from "../../Owner/ownerLogo.svg";


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 800,
    zIndex: 1,
   
    position: "relative",
    display: "flex",
    marginTop: "100px"
  },
  appBar: {
    height:80,
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

class DrawerList extends React.Component {
  
  setStepContent = step => e => {
   
    this.setState({
      activeStep: step
    });

  };
  getStepContent(step) {
    switch (step) {
      case 1:
        return (
          <LocationComponent
            locationChangeHandler={this.locationChangeHandler}
            handleNext={this.handleNext}
            country={this.country}
            street_address={this.street_address}
            unit={this.unit}
            city={this.city}
            statelive={this.statelive}
            zipcode={this.zipcode}
          />
        );
      case 2:
        return (
          <DetailsComponent
            detailsChangeHandler={this.detailsChangeHandler}
            handleNext={this.handleNext}
            headline={this.headline}
            property_description={this.property_description}
            type_house={this.type_house}
            bedrooms={this.bedrooms}
            accomodates={this.accomodates}
            bathrooms={this.bathrooms}
          />
          
        );
      case 3:
        return <PhotoComponent />;
      case 4:
        return (
          <PricingComponent
            pricingChangeHandler={this.pricingChangeHandler}
            handleSubmit={this.handleSubmit}
            startdate={this.startdate}
            enddate={this.enddate}
            nightrate={this.nightrate}
            minimumstay={this.minimumstay}
          />
        );

      default:
        throw new Error("Unknown step");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      activeStep: 1,
      country: "",
      street_address: "",
      unit: "",
      city: "",
      statelive: "",
      zipcode: "",
      headline: "",
      property_description: "",
      type_house: "",
      bedrooms: "",
      accomodates: "",
      bathrooms: "",
      startdate: "",
      enddate: "",
      nightrate: "",
      minimumstay: "",
      ownerkey:""

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.detailsChangeHandler = this.detailsChangeHandler.bind(this);
    this.pricingChangeHandler = this.pricingChangeHandler.bind(this);
  }
  componentDidMount() {
    const data={
    ownerkey: this.props.location.state.ownerkey
    }
   // console.log("in component")
    console.log(this.props)
    this.setState(
      {
        ownerkey: this.props.location.state.ownerkey
      });
      
    this.setState.activeStep = 0;
  }

  pricingChangeHandler = data => {
    this.startdate = data.startdate;
    this.enddate = data.enddate;
    this.nightrate = data.nightrate;
    this.minimumstay = data.minimumstay;
  };

  locationChangeHandler = data => {
    this.country = data.country;
    this.street_address = data.street_address;
    this.unit = data.unit;
    this.city = data.city;
    this.statelive = data.statelive;
    this.zipcode = data.zipcode;
  };

  detailsChangeHandler = data => {
    this.headline = data.headline;
    this.property_description = data.property_description;
    this.type_house = data.type_house;
    this.bedrooms = data.bedrooms;
    this.accomodates = data.accomodates;
    this.bathrooms = data.bathrooms;
  };

  handleSubmit() {
   console.log("On Submit" + this.props.location.state.ownerkey);

    const data = {
      ownerkey: this.props.location.state.ownerkey,
      country: this.country,
      street_address: this.street_address,
      unit: this.unit,
      city: this.city,
      statelive: this.statelive,
      zipcode: this.zipcode,
      headline: this.headline,
      property_description: this.property_description,
      type_house: this.type_house,
      bedrooms: this.bedrooms,
      accomodates: this.accomodates,
      bathrooms: this.bathrooms,
      startdate: this.startdate,
      enddate: this.enddate,
      nightrate: this.nightrate,
      minimumstay: this.minimumstay
    };
    console.log(data)
    axios.post("http://localhost:3001/addproperty", data).then(result => {
      // access results...
    });
    window.location = "/ownerlogin"
  }

  // handleClick = (event) => {

  //   //this.setState({ drawertype : event.this.value });
  //   console.log("in onclick")
  //   console.log(event)
  // //   this.setState({
  // //     active: 'location'
  // // })
  // console.log(event)
  // };
  handleClick = name => event => {
    this.setState(
      {
        active: this.name
      },
      console.log(name)
    );
    console.log("in onclick");
    console.log(name);
    console.log(event);
  };

 

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  render() {
    
    const data = {
      username: "admin",
      password: "admin"
    };
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              <Navbar/>
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                List Your Property
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            // onClick={this.getItem}
          >
            <div className={classes.toolbar} />
            <List>
              <ListItem button onClick={this.setStepContent(1)}>
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#000000" }}
                      variant="headline"
                    >
                      Location
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem button onClick={this.setStepContent(2)}>
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#000000" }}
                      variant="headline"
                    >
                      Details
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem button onClick={this.setStepContent(3)}>
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#000000" }}
                      variant="headline"
                    >
                      Photos
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem button onClick={this.setStepContent(4)}>
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#000000" }}
                      variant="headline"
                    >
                      Pricing
                    </Typography>
                  }
                />
              </ListItem>

              {/* <ListItem
                button
                component={({ ...props }) => (
                  <Link to={this.props.match.url + "/details"} {...props} />
                )}
              >
                <ListItemText primary="Details" />
              </ListItem>
              <ListItem
                button
                component={({ ...props }) => (
                  <Link to={this.props.match.url + "/photo"} {...props} />
                )}
              >
                <ListItemText primary="Photos" />
              </ListItem>
              <ListItem
                button
                component={({ ...props }) => (
                  <Link to={this.props.match.url + "/price"} {...props} />
                )}
              >
                <ListItemText primary="Pricing" />
              </ListItem> */}
            </List>
            <Divider />
          </Drawer>
          <main className={classes.content} xl>
            <div className={classes.toolbar} />

            {this.getStepContent(this.state.activeStep)}
            {/* <Route
              path={this.props.match.url + "/location"}
              component={LocationComponent}
            />
            <Route
              path={this.props.match.url + "/details"}
              component={DetailsComponent}
            />
            <Route
              path={this.props.match.url + "/price"}
              component={PricingComponent}
            />
            <Route
              path={this.props.match.url + "/photo"}
              component={PhotoComponent}
            /> */}
            {/* <PricingComponent/> */}
            {/* <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography> */}
          </main>
        </div>
      </div>
    );
  }
}

DrawerList
.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DrawerList
);