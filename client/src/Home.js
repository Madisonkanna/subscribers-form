import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from "react-router-dom"
import Form from './Form';

import { Link } from "react-router-dom";


class Home extends Component {
  // initialize state to an empty array of subscribers
  
  state = { users: [] }

  //after component mounts

  onInputChange(event) {
    console.log(event.target.value);

  }

  //need to include form validation  
  //componentDidMount() {
    //fetch('/users')
    //.then(res => res.json())
    //.then(users => this.setState( { users }));

  //}


   render() {
    const Content = 'Subscribe'

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{Content}</h1>

        </header>
        <h1>Subscribe to our newsletter!</h1>
      
        {/* only on dev does localhost work */}
        <a href="http://localhost:3001/users">Signup yo</a>
        <Form/>

      


          {this.state.users.map( user => 
            <li key={user.id}>{user.username}</li>
            )}

        <Link to="/list" input type="submit">List of subscribers  </Link>
      </div>
    );
  }
}

export default Home;
