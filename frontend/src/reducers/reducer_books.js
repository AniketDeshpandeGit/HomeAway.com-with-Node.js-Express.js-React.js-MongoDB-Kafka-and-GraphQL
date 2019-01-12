import _ from "lodash";
import { FETCH_BOOKS } from "../actions";


//Reducer listening to different action types
//initial state is {}
export default function(state = {}, action) {
  switch (action.type) {
    //target 
    case FETCH_BOOKS:
      return _.mapKeys(action.payload.data, "BookID");
    default:
      return state;
  }
}
