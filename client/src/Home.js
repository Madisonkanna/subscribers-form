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
        <h1>Subscribe to our newsletter!</h1>
        <Form />
      
      
        <Link to="/list" input type="submit">List of subscribers  </Link>
      </div>
    );
  }
}

export default Home;
