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
          message_list : [],
          message:"",
            
        }
       
    }
   

   
         
  

    render(){
      //console.log("in message")
     // console.log(this.props.props.message)
  const { classes, theme } = this.props;


  return (
   
     <Card className={classes.card}>
    
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography gutterBottom component="h1" variant="headline">
            {this.props.props.message}
          </Typography>
         
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