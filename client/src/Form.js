import React, { Component } from "react";
import { Link } from "react-router-dom";

class Form extends React.Component {
  state = { email: '', name: '',   }
  
  render() {

    return (

      <form onSubmit={this.handleSubmit} className="signup-form">
       <div>
         <label className="email-address" htmlFor="email">Email address</label>
         <input type="email" onChange={(event) => this.setState({ email: event.target.value })}

          className="form-control"
           name="email" required />
       </div>

       <div>
         <label className="name" htmlFor="name">Name</label>
         <input type="name" onChange={(event) => this.setState({ name: event.target.value })}
 name="name" required />
       </div>
  
       
     </form>

      )
  }

}

export default Form;
