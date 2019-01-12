import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginTop : theme.spacing.unit,
      width: 200,
    },
     container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
     
    });
  
  class PricingProperty extends React.Component {


  state = {
    startdate: '',
    enddate: '',
    nightrate : '', 
    minimumstay : '',
   
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
};

   


  render() {
    console.log("props "+JSON.stringify(this.props)) 
    const { classes } = this.props;
    console.log("props"+JSON.stringify(classes))
    return (
        <div>
        <form className={classes.container}>
        <TextField
        id="date"
        label="Start Date"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        value={this.state.startdate}
        onChange={this.handleChange('startdate')}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="End Date"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        value={this.state.enddate}
        onChange={this.handleChange('enddate')}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="standard-nightrate"
        label="Nightly Rate"
        className={classes.textField}
        value={this.state.nightrate}
        onChange={this.handleChange('nightrate')}
        margin="normal"
        />
        <TextField
        id="standard-minimumstay"
        label="Minimum Stay"
        className={classes.textField}
        value={this.state.minimumstay}
        onChange={this.handleChange('minimumstay')}
        margin="normal"
        />
         <Button variant="contained" color="primary" className={classes.button}>
        Save
      </Button>
    
          </form>
          </div>
    );
  }



}

PricingProperty.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PricingProperty);
