import React, { Component } from "react";
import { Link } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';

const validator = require('validator');

class Form extends React.Component {
  state = { email: '', name: '',  }
  render() {

    //more here
    return (

    const email = document.getElementById("mail");

      <form className="signup-form">
       <h2>Sign up</h2>
       <div>
         <label htmlFor="email">Email address</label>
         <input type="email" onChange={(event) => this.setState({ email: event.target.value })}

          className="form-control"
           name="email" required />
       </div>

       <div>
         <label htmlFor="name">Name</label>
         <input type="name" onChange={(event) => this.setState({ name: event.target.value })}
 name="name" required />
       </div>

       <button>Submit </button>
     </form>

      )
  }

}

export default Form;
