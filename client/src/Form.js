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

//myemail+signup1@gmail.com write something different in signup each time
// Rejected: 'Confirm your email' Sandbox subdomains are for test purposes only. Please add your own domain or add the address to authorized recipients in Account Settings.:

//To do:
//Go clean up my page link 'list all subscribers'
//Display all my subscribers on my list page
//Create signup page that says 'thanks for signing up, please check your email'
//Need confirmation page that someone goes to based on link in their email. That page looks up the key in redis and confirms that person in Mongo.
//In body of email I need to include a link that goes to confirmation page, and has link: 
//http://myserver.com/subscribe/confirm?key=<uuid>
//make confirm route on the server to process and pass on. Just need a route that sends you to the frontend. It can be automatic redirect

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
      //need a then that decides what happens based on whether the create was succesful or not. if it's succesful, go to another page. if it fails, we get error.

      //.then(res => res.redirect())
      //.then(subscribers => this.setState ( { subscribers }));
      .catch(err => {
        console.log("Error!");
        
      })
  
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
