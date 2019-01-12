import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


const styles = theme => ({
  card: {
    display: 'flex',

    height:'auto',
    padding:'1%',
    maxWidth:'600'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    
    height: 200,
    width:200
  },
  controls: {
    display: 'flex',
   
   
  },
 
});


class CardOwner extends Component {
    constructor(){
        super();
        this.state = {
          property_list : [],
          ownerkey:"",
          propertykey:""              
        }
        this.Bookit = this.Bookit.bind(this);
    }
   

    Bookit = (e) => {
   console.log("in Bookit")
  //  console.log(this.props.props.property_key)
  //  console.log(this.props.props.ownerkey)
   var  propertykey =this.props.props.property_key
   var ownerkey =this.props.props.ownerkey
      const data={
        propertykey,ownerkey
       
      }
      //console.log(data)
      axios.defaults.withCredentials = true;

      axios.post('http://localhost:3001/bookproperty',data)
          .then(response => {
              console.log("Status Code : ",response.status);
              if(response.status === 200){
                  this.setState({
                      authFlag : true
                  })
                  
              }else{
                  this.setState({
                      authFlag : false
                  })
              }
          });
  }    
         
  

    render(){
      
      //console.log(this.props.props.state)
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
          {this.props.props.headline} - {this.props.props.type}
          </Typography>
          <Typography variant="subheading" color="textSecondary">
          {this.props.props.unit} {this.props.props.streetaddress} {this.props.props.city} {this.props.props.state} {this.props.props.zipcode} {this.props.props.country}
         
          </Typography>
        
       
          <Typography gutterBottom variant="h1" >
            Your set price ${this.props.props.nightly_rate} per night<br/>
          </Typography>
          
          <Typography variant="h2">
        Dates Avalable {this.props.props.opendate_from} - {this.props.props.opendate_to}
          </Typography>
          <CardActions >
        
        
      </CardActions>
      </CardContent>
      </div>
     
    </Card> 
  );

}
}

CardOwner.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CardOwner);