import React, { Component } from "react";
import { Link } from "react-router-dom";
import Confirmation from './Confirmation';

//Next steps
//sent email asynchronously with RabbitMQ
//Heroku CloudAMQ could be helpful here
//When they click confirm, 
//Mailgun
// UseRedis to save the opt-in flag
//on subcribe I can SET a key, userID verified? to true
//Display all users by using the GET key 

//To do:
//Need confirmation page that someone goes to based on link in their email. That page looks up the key in redis and confirms that person in Mongo.
//In body of email I need to include a link that goes to confirmation page, and has link: 
//http://myserver.com/subscribe/confirm?key=<uuid>
//make confirm route on the server to process and pass on. Just need a route that sends you to the frontend. It can be automatic redirect
//Server side validation: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax

class Form extends React.Component {  

  constructor(props) {
    super(props);
    this.state = { email: '', name: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleRedirect(res) {
    if( res.status === 200 ){
      window.location = 'Confirmation';
    } else {
      console.log("Didn't handle redirect")
    }

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
      .then(this.handleRedirect) 
      .catch(err => {
        console.log("Error!");
        
      })
  
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
