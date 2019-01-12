import axios from "axios";

export const FETCH_LOGIN = "login";
export const FETCH_OWNER_SIGNUP = "owner_signup";
export const FETCH_TRAVELLER_SIGNUP = "traveller_signup";

export const FETCH_OWNER_POST_PROPERTY = "owner_post_property";

const ROOT_URL = "http://localhost:3001";

//target action

export function loginDetails(values, callback) {
  const request = axios
  console.log("in function redux")
    .post(`${ROOT_URL}/ownerlogin`, values)
    .then(() => callback());
    console.log("Response in redux",values);
  return {
    type: FETCH_LOGIN,
    payload: request
  };
}

export function ownerSignupDetails(values, callback) {
  const request = axios
  console.log("in function redux owner signup")
    .post(`${ROOT_URL}/ownersignup`, values)
    .then(() => callback());
    console.log("Response in redux",values);
  return {
    type: FETCH_OWNER_SIGNUP,
    payload: request
  };
}

export function travellerSignupDetails(values, callback) {
  const request = axios
  console.log("in function redux owner signup")
    .post(`${ROOT_URL}/travellersignup`, values)
    .then(() => callback());
    console.log("Response in redux",values);
  return {
    type: FETCH_TRAVELLER_SIGNUP,
    payload: request
  };
}

export function ownerPostProperty(values, callback) {
  const request = axios
  console.log("in function redux owner postproperty")
    .post(`${ROOT_URL}/propertylist`, values)
    .then(() => callback());
    console.log("Response in redux",values);
  return {
    type: FETCH_OWNER_POST_PROPERTY,
    payload: request
  };
}