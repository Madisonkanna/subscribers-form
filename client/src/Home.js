import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from "react-router-dom"
import Form from './Form';
import { Link } from "react-router-dom";


class Home extends Component {
  // initialize state to an empty array of subscribers

  state = { term: '' }

   render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="signup">
          <h1 className="header">Subscribe to our newsletter!</h1>
          <Link to="/list">List of subscribers</Link>
          <Form className="signup" />
        </div>
      </div>
      
     );
    }
}

export default Home;
