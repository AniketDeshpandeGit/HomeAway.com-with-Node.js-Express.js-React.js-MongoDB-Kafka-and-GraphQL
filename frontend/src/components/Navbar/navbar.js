import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import '../../App.css';


class Navbar extends Component{
    
    constructor(props){
        
        super(props);
        
      
    }


render(){

    return(
<nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="/login">Homeaway</a>
       
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ml-auto">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#">Contact</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="/login">Logout</a>
            </li>
          </ul>
        </div>
      </div>
</nav>

    )

}
}

export default Navbar;

