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

        <table>
          <tr>
            <th>Email</th>
            <th>Name</th>
          </tr>
          <tbody>
          {this.state.users.map(user => {
            return (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.name}</td>
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
