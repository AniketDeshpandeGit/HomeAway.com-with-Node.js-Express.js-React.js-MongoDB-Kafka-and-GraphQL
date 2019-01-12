import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import '../../App.css';
import Searchpagehotel from '.././SearchPageHotel/SearchPageHotel';
import Navbar from '../Navbar/navbar';


class searchpage extends Component{
    
    constructor(props){
        
        super(props);
        this.state = {           
            travellerkey: '',
        }
      
    }
    componentDidMount(){
        //console.log(this.props.location.state.profile.travellerkey)
        console.log("in seachpage")
        console.log(this.props.location.state.profile.travellerkey)
        this.setState({
            travellerkey : this.props.location.state.profile.travellerkey
        })
    }

render(){
    console.log("traveller"+this.state)
    console.log(this.state)
    const x =String(this.state.travellerkey)
   
    return(
        <header class="masthead">
        <div class="container">
          <div class="intro-text">
          <Navbar/>
            <div class="intro-lead-in">Start Seaching</div>
            <div class="intro-heading">Book beach houses, cabins,<br/>condos and more, worldwide</div>
           
            <Searchpagehotel travellerkey={x}/>
            </div>
          </div>
            </header>

        )

}
}

export default searchpage;

