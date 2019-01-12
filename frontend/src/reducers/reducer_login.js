import _ from "lodash";
import { FETCH_LOGIN } from "../actions";
import { FETCH_OWNER_SIGNUP } from "../actions";
import { FETCH_TRAVELLER_SIGNUP} from "../actions";
import { FETCH_OWNER_POST_PROPERTY } from "../actions";

//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 
    case FETCH_LOGIN:
    
    return _.mapKeys(action.payload.data, "username");

case FETCH_OWNER_SIGNUP:

    return _.mapKeys(action.payload.data, "username");

case FETCH_TRAVELLER_SIGNUP:

    return _.mapKeys(action.payload.data, "username");

case FETCH_OWNER_POST_PROPERTY:

    return _.mapKeys(action.payload.data, "username");

default:
 return state;
  }
}
