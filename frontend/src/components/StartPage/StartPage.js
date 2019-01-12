import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '.././Navbar/navbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../../App.css';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      //color: theme.palette.text.secondary,
      marginTop : theme.spacing.unit * 40,
     // marginLeft : theme.spacing.unit * 40,
      marginRight : theme.spacing.unit * 15,
    },
  });

class StartPage extends Component{
    
    constructor(props){
        
        super(props);
        
      
    }


render(){
    
    const { classes } = this.props;
    return(
            <div className="logincheck">
            {/* <button className="pure-button pure-button-primary" >Traveller Login</button>
            <button className="pure-button pure-button-primary">Owner Login</button> */}
            
           <Navbar/>
           <Route render={({ history}) => (
            <Button variant="contained" color="primary" value ="Owner" className={classes.paper} onClick={() => { history.push('/ownerlogin') }}
>
                Owner Login
            </Button>
             )} />
          
          <Route render={({ history}) => (
            <Button variant="contained" color="primary" value ="Owner" className={classes.paper} onClick={() => { history.push('/travellerlogin') }}
>
                Travellers Login
            </Button>
             )} />
      
    
            </div>

    )

}
}

StartPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(StartPage);


