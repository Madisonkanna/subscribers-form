import React, { Component } from "react";

class List extends React.Component {

  state = {
    users: []
  }
  
  handleSearch(event) {
    console.log(this);
    console.log(this.input);
    const users = this.state.users.filter(user => user.email.includes(this.input.value));
    this.setState({ users })
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
        <input type="text" 
        onKeyPress={this.handleSearch.bind(this)} 
        ref={(userInput) => this.input = userInput}
        placeholder="Search by email" />

        <table className="subscriber-list">
          <tr>
            <th className="subscriber-list">Email</th>
            <th className="subscriber-list">Name</th>
            <th className="subscriber-list">Subscribed at</th>
          </tr>
          <tbody>
          {this.state.users.map(user => {
            return (
              <tr key={user._id}>
                <td className="subscriber-list">{user.email}</td>
                <td className="subscriber-list">{user.name}</td>
                <td className="subscriber-list">{user.subscribedAt}</td>
              </tr>    
            )
          })}
  
          </tbody>
        </table>

        
      </div>
      )
  }


}

export default List;
