import React, { Component } from "react";


class Confirmation extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    fetch('/users')
    .then(res => res.json()) 
    .then(users => this.setState ( { users }));

  }


  render() {
    //more here
    return (
      <div className="app">{this.state.users.map( user => 
            <li key={user.id}>{user.username}</li>
            )}</div>
      )
  }

}

export default Confirmation;
