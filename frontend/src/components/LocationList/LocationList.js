import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PricingProperty from '.././PricingProperty/PricingProperty';
import {Link} from 'react-router-dom';

import DetailsProperty from '../DetailsProperty/DetailsProperty';



const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    root: {
        display: 'flex',
      },
      formControl: {
        margin: theme.spacing.unit * 5,
      },
      group: {
        margin: `${theme.spacing.unit}px 0`,
      },
  });
  class LocationList extends React.Component {


  state = {
    country: '',
    street_address: '',
    unit : '', 
    city : '',
    statelive : '',
    zipcode : '',
  };

  componentDidMount(){
    const {handle } =this.props.match.params
    const {active}=this.props
    console.log(this.props)
    console.log(this.props.match.params);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
};
onClick = event => {
  console.log("on click")
  console.log(this.state)
  const data ={
    country: this.state.country,
    street_address: this.state.street_address,
    unit : this.state.unit, 
    city : this.state.city,
    statelive : this.state.statelive,
    zipcode : this.state.zipcode,
  }
  console.log(data)
 
};
   


  render() {
    const { classes } = this.props;
     //<Route exact path="/propertylist/price" component={PricingProperty}/>
    <Route exact path={"propertylist/details"} component={DetailsProperty}/> 
    return (
        <form className={classes.container}>
        <TextField
        id="standard-name"
        label="Country"
        className={classes.textField}
        value={this.state.country}
        onChange={this.handleChange('country')}
        margin="normal"
        />
        <br/>
         <TextField
          id="standard-street_address"
          label="Street Address"
          className={classes.textField}
         
          value={this.state.street_address}
        onChange={this.handleChange('street_address')}
          margin="normal"
        /><br/>
        <TextField
        id="standard-unit"
        label="Unit, Suite Buiding, Etc"
        className={classes.textField}
        value={this.state.unit}
        onChange={this.handleChange('unit')}
        margin="normal"
        />
      <br/>

     
        <TextField
        id="standard-city"
        label="City"
        className={classes.textField}
        value={this.state.city}
        onChange={this.handleChange('city')}
        margin="normal"
        /><br/>
         <TextField
        id="standard-state"
        label="State"
        className={classes.textField}
        value={this.state.statelive}
        onChange={this.handleChange('statelive')}
        margin="normal"
        /> <br/>
           <TextField
        id="standard-zip_code"
        label="Zipcode"
        className={classes.textField}
        value={this.state.zipcode}
        onChange={this.handleChange('zipcode')}
        margin="normal"
        /> 
        <Button variant="contained" color="primary" className={classes.button} onClick={this.onClick} >
        Save
      </Button>&nbsp;
         <Button variant="contained" color="primary" className={classes.button} component={({...props}) => <Link to= '/propertylist/price' {...props} />}>
        Next
      </Button>
      <Button onClick={this.onClick} component={({...props}) => <Link to='/propertylist/details/' state={{ deatils: this.data }} {...props} />}>
        test
        </Button>
      
          </form>
    );
  }



}

LocationList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationList);
