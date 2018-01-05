import React, { Component } from "react";
import { Link } from "react-router-dom";

class Form extends React.Component {  

  constructor(props) {
    super(props);
    this.state = { email: '', name: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
   handleSubmit(event) {
    event.preventDefault();

    fetch('/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify (this.state)
    }) 
      .then(res => res.json()) 
      //need a then that decides what happens based on whether the create was succesful or not. if it's succesful, go to another page. if it fails, we get error.
      .then(users => this.setState ( { users }));
      //if succesful response, 
      //use RabbitMQ to send a subscription confirmation email
    
    
  } 
  
  render() {

    return (

      <form method="post" onSubmit={this.handleSubmit} className="signup-form">
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
       <div className="checkbox">
        <input className="checkbox" 
          type="checkbox" required />I agree to recieve emails from you
        </div>
        <input value="Sign up" type="submit"/>
       
     </form>

      )
  }

}

export default Form;
