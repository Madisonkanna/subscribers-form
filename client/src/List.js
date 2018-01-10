import React, { Component } from "react";

class List extends React.Component {

  state = {
    users: [],
    query: ''
  }
  
  handleSearch(event) {
    console.log(this);
    console.log(this.input);
    this.setState({ query:this.input.value })
  }
    
  filteredUsers() {
    let {query, users} = this.state;
    if (!query) return users;
    return users.filter(user => user.email.includes(query));
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
        onKeyUp={this.handleSearch.bind(this)}
        ref={(userInput) => this.input = userInput}
        placeholder="Search by email" />

        <table className="subscriber-list">
          <tr>
            <th className="subscriber-list">Email</th>
            <th className="subscriber-list">Name</th>
            <th className="subscriber-list">Subscribed at</th>
          </tr>
          <tbody>
          {this.filteredUsers().map(user => {
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
