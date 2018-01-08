import React, { Component } from "react";

class List extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    fetch('/users')
    .then(users => this.setState ( { users }));

  }

  render() {
    //more here
    return (
      <div>
        <div className="app">{this.state.users.map( user => 
          <li key={user.id}>{user.username}</li>
            )}</div>
        
      </div>
      )
  }


}

export default List;
