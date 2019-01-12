
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createBook } from "../../actions";

import { loginDetails } from "../../actions";

class Login extends Component {

  //Define component that you wanbt to render
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  /*Action call
  Whenever onSubmit event is triggered, execute an action call called createBook 
  */
  onSubmit(values) {
    console.log(values);
    this.props.loginDetails(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (

      //handleSubmit is the method that comes from redux and it tells redux what to do with the submitted form data
      //Field is a component of redux that does the wiring of inputs to the redux store.
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      
        <Field
          label="usernmae"
          name="username"
          component={this.renderField}
        />

        <Field
          label="password"
          name="password"
          component={this.renderField}
        />
       
        <button type="submit" className="btn btn-primary">Submit</button>
        
      </form>
    );
  }
}



export default reduxForm({

  form: "NewBookForm"
})(connect(null, { loginDetails })(Login));