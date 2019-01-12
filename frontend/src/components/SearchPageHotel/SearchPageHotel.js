import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies';
import ShowProperty from '.././ShowProperty/ShowProperty';
import Navbar from '../Navbar/navbar';
import { Grid } from '@material-ui/core';
import Image from '../../maldives.jpg';
import {Redirect} from 'react-router';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      direction:"row",
    // backgroundColor: 'white'
      //backgroundImage: `url(${Image})`
    },
    input: {
      color: 'white'
  },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
      color:'white',
      
    },
    paper: {
     
    
      color:'white',
      
    },

  });

class SearchPageHotel extends Component{
    
    constructor(props){
        
        super(props);
        this.state = {           
          search: '',
          date_from: '',
          date_to : '', 
          num_people : '',
          travellerid:'',
          authFlag:false,
          profile:""

          
          };
          this.SearchProperties = this.SearchProperties.bind(this);
        
      
    }
   
    componentDidMount(){
      this.setState({
        authFlag : false
    })
    //   var cookieload=cookie.load('cookie')
    //   // var getdata=cookies.get('username')
    //  // var a=cookieload
    //  // var a=cookieload[18]
    //  this.state.travellerid=this.props.props
      // console.log("in search page hotel")
      // console.log(this.props)
      // console.log("in search page hotel1")
      // console.log(this.state)
      //console.log(this.props.location.state)
       
  }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
      
      SearchProperties = (e) => {
      console.log("in Bookit")
      console.log("search"+this.props)
      this.state.travellerid=this.props.props
    //   this.setState({
    //     travellerid:this.props.props,
    //     authFlag : true
    // })
     
      const data = {
        search: this.state.search,
        date_from: this.state.date_from,
        date_to : this.state.date_to, 
        num_people : this.state.num_people,
        travellerid :this.props.travellerkey,

    }
     console.log(data)
     //console.log(this.props.travellerkey)
    //  this.state.history.push({
    //   pathname:"/show",
    //   state:{
    //     search: this.state.search,
    //     date_from: this.state.date_from,
    //     date_to : this.state.date_to, 
    //     num_people : this.state.num_people,
    //    }
    this.setState({
      authFlag : true,
      profile:data
  })
    
   
     }     

render(){
  
  <Route path="/show" component={ShowProperty} />
  // console.log("in hotel")
  // console.log(this.props)
//   //var x=this.props.props

   const { classes } = this.props;
//   const takekey =() =>{
//     this.setState({
//       //travellerid:this.props.props
//     })
//   }
  const{authFlag,profile}=this.state
  let redirectVar = null;
         if(authFlag){
          console.log(this.state.profile)
            console.log(this.state.authFlag)
            if(this.state.authFlag===true){
                return(
             
                    redirectVar = <Redirect to={{
                     pathname: '/show',
                     state: { profile: this.state.profile }
                    }
                  } /> 
                 ) 
            }
         }
    return(
     
      <Grid container className={classes.container}>
     
      <Grid item xs={12}>
                    <TextField
                      id="standard-search"
                      label="Search field"
                      type="search"
                      className={classes.textField}
                      value={this.state.search}
                      onChange={this.handleChange('search')}
                      margin="normal"
                      InputProps={{
        className: classes.paper,
    }}
                    />
                    
                    <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    value={this.state.date_from}
                    onChange={this.handleChange('date_from')}
                    InputLabelProps={{
                    shrink: true,
                    
                    }}
                    InputProps={{
        className: classes.input,
    }}
                />
              
                     <TextField
                    id="date"
                    label="Return Date"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    value={this.state.date_to}
                    onChange={this.handleChange('date_to')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    InputProps={{
        className: classes.input,
    }}
                />
                
                   <TextField
                    id="standard-number"
                    label="Number"
                    value={this.state.num_people}
                    onChange={this.handleChange('num_people')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
        className: classes.input,
    }}
          margin="normal"
        />
      <Button onClick = {this.SearchProperties} variant="contained" color="primary">Search</Button>&nbsp;
        {/* <Route render={({ history}) => (
            <Button variant="contained" size="small" color="primary" className={classes.paper} onClick={() => { history.push({
      pathname:"/show",
      state:{
        search: this.state.search,
        date_from: this.state.date_from,
        date_to : this.state.date_to, 
        num_people : this.state.num_people,
        travellerid: this.state.travellerid
       }
     }); }}
>
               Search
            </Button>
             )} /> */}
                </Grid> 
              </Grid>
                
        )

}
}



SearchPageHotel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchPageHotel);

