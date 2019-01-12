import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import Navbar from '.././Navbar/navbar';
import LocationList from '../LocationList/LocationList';
import DetailsProperty from '../DetailsProperty/DetailsProperty';
import PricingProperty from '.././PricingProperty/PricingProperty';
import Photo from '.././Photo/Photo';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    marginTop : '100px',

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});
  
  class DrawerProperty extends React.Component {
    constructor(props){

      super(props);
      this.state = {
        value: '',
        active: 'location',
        
       
    }
      this.handleClick = this.handleClick.bind(this);
      
   }

  state = {
    active: '',
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
     this.setState({
      active:this.name,
      
    },
    console.log(name));
    console.log("in onclick")
    console.log(name)
    console.log(event)
    
};


   


  render() {
    const data={
      username:"rajas",
      password:"rajas"
    }
    const { classes } = this.props;
    return (
        <div>
      <Navbar/>
      
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
            paper: classes.drawerPaper,
          }}
          // onClick={this.getItem}
        >
          <div className={classes.toolbar} />
          <List>
          <ListItem button component={({...props}) => <Link to={this.props.match.url + '/location'} {...props} />}>
       
        <ListItemText primary="Location" />
      </ListItem>
      <ListItem button component={({...props}) => <Link to={this.props.match.url + '/details'}  {...props} />}>
        <ListItemText primary="Details" />
      </ListItem>
      <ListItem button component={({...props}) => <Link to={this.props.match.url + '/photo'} {...props} />}>
        
        <ListItemText primary="Photos" />
      </ListItem>
      <ListItem button component={({...props}) => <Link to={this.props.match.url + '/price'} {...props} />}>
       
        <ListItemText primary="Pricing" />
  </ListItem>
  
  
          </List>
          <Divider />
        
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* <Route path="propertylist/login1" component={PricingProperty} />
          <Route path="propertylist/login1" component={LocationList} />
          <Route path="propertylist/login3" component={DetailsProperty} /> */}
          <Route path={this.props.match.url + "/location"} component={LocationList}/>
          <Route path={this.props.match.url + "/details"} component={DetailsProperty}/>
          <Route path={this.props.match.url + "/price"} component={PricingProperty}/>
          <Route path={this.props.match.url + "/photo"} component={Photo}/>
          {/* <PricingProperty/> */}
          {/* <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography> */}
        </main>
      </div>
      </div>
    );
  }



}

DrawerProperty.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerProperty);
