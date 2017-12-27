import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Home extends Component {
  // initialize state to an empty array of subscribers
  
  state = { users: [] }

  //after component mounts

  onInputChange(event) {
    console.log(event.target.value);

  }

  
  componentDidMount() {
    fetch('/users')
    .then(res => res.json())
    .then(users => this.setState( { users }));

  }


  render() {
    const Content = 'Subscribe'

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{Content}</h1>

        </header>


        <form>
          <label>
          Name:
            <input onChange={this.onInputChange} name="name" />
          </label>
          <input type="submit" value="submit" />
        </form>

          {this.state.users.map( user => 
            <li key={user.id}>{user.username}</li>
            )}
            
      </div>
    );
  }
}

export default Home;
