import React, { Component } from "react";

class List extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    fetch('/users')
    .then(res => {
      res.json().then(response => this.setState({ users:response.users }))
    })
  }

  render() {
    console.log(this.state);
    //more here
    return (
      <div>
        <div className="app">{this.state.users.map( user => 
          <li key={user.id}>{user.email}{user.name}</li>

            )}</div>
        
      </div>
      )
  }


}

export default List;
