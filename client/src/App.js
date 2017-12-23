import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // initialize state to an empty array of subscribers
  state = { users: [] }

  //after component mounts

  componentDidMount() {
    fetch('/users')
    .then(res => res.json())
    .then(users => this.setState( { users }));

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Subscribers app</h1>
            <ul>
          {this.state.users.map( user => 
            <li key={user.id}>{user.username}</li>
            )}
            </ul>
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
