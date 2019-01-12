import { combineReducers,createStore } from "redux";
import { reducer as formReducer } from "redux-form";

import LoginReducer from "./reducer_login";
import OSignUpReducer from "./reducer_login";
import TSignUpReducer from "./reducer_login";
import OPostProperty from "./reducer_login";

const rootReducer =  combineReducers({
 
  owner_post_property : OPostProperty,
  traveller_signup : TSignUpReducer,
  owner_signup : OSignUpReducer,
  login: LoginReducer,
  form: formReducer

});

export default rootReducer;