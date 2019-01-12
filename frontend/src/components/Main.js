import React, { Component } from "react";
import { Route } from "react-router-dom";
// import Button from './Button/button_com';
// import Calculate from './calculate/calculate';
// import Input from './Input/input';
import Login from "./Login/Login";

// import calculate from './calculate/calculate';
import Navbar from "./Navbar/navbar";
import Searchpage from "./SearchPage/searchpage";
import Searchpagehotel from "./SearchPageHotel/SearchPageHotel";
import LoginWhich from "./StartPage/StartPage";
import SignUpTraveller from "./OwnerSignup/OwnerSignup";
import TravellerSignUp from "./TravellerSignUp/TravellerSignUp";
import OwnerSignup from "./OwnerSignup/OwnerSignup";
import DrawerProperty from "./DrawerProperty/DrawerProperty";
import PricingProperty from "./PricingProperty/PricingProperty";
import TravellerLogin from "./TravellerLogin/TravellerLogin";
import Photo from "./Photo/Photo";
import Cards from "./Cards/Cards";
import "../index2.css";
import ShowProperty from "./ShowProperty/ShowProperty";
import OwnerDashboard from "./OwnerDashboard/OwnerDashboard";
import DrawerList from "./DrawerList/DrawerList";
import TravellerAfterLogin from "./TravellerAfterLogin/TravellerAfterLogin";
import Message from "./Message/Message";

import LoginRedux from "./LoginRedux/Login.js";

import RootReducer from "../reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Switch } from "react-router-dom";
import promise from "redux-promise";
//graphQL
import ApolloClinet from "apollo-boost";
import { ApolloProvider } from "react-apollo";
const client = new ApolloClinet({
  uri: "http://localhost:3001/graphql"
});

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));

class Main extends Component {
  render() {
    return (
      //  <div className='rowC'>
      //<Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/ownerlogin" component={Login} />
              {/* <Route path="/login1" component={LoginRedux} /> */}
              <Route path="/travellersignup" component={TravellerSignUp} />
              <Route path="/login" component={LoginWhich} />
              <Route path="/home" component={Searchpage} />
              <Route path="/signupowner" component={SignUpTraveller} />
              <Route path="/travellerlogin" component={TravellerLogin} />
              <Route path="/propertylist" component={DrawerList} />
              <Route path="/ownersignup" component={OwnerSignup} />
              <Route path="/photo" component={Photo} />
              <Route path="/card" component={Cards} />
              <Route path="/show" component={ShowProperty} />
              <Route path="/ownerdashboard" component={OwnerDashboard} />
              <Route path="/test" component={Searchpagehotel} />
              <Route
                path="/travellerafterlogin"
                component={TravellerAfterLogin}
              />
              <Route path="/message" component={Message} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default Main;
