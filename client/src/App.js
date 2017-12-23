import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Subscribers app</h1>
        </header>
      
        <form>
          <label>
          Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default App;
