import React, { Component } from "react";

class List extends React.Component {

  state = {
    users: [],
    query: '',
    reversed: false,
    clickedColumn: null
  }
  
  handleSearch(event) {
    this.setState({ query:this.input.value })
  }
    
  filteredUsers() {
    let {query, users} = this.state;
    if (!query) return users;
    return users.filter(user => user.email.includes(query));
  }
  
  
  sortData(key) {
     //take all of state and put it into the state 
    //spread operator. spread state into const state
    const state = {...this.state};
    //togg
    state.reversed = !state.reversed
    //touch button its set to true, touch again it goes to false. 
    //My old code did this in 6 lines
    // if (state.reversed == true) {
    //   state.reversed = false;
    // } else {
    //   state.reversed = true
    // }
    
    const users = state.users;
    users.sort((a, b) => {
      //user's propertiy = a[key]
      a[key] = a[key] || '';
      b[key] = b[key] || '';
      let comparison = 0;
      //Sort my users
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        comparison = -1;
      }
      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        comparison = 1;
      }
      if (this.state.reversed) {
        //reverses the sort
        return comparison * -1;
      }
      return comparison;  
      
      //A single line:
      //return this.state.reversed ? (comparison * -1) : comparison
    })
    state.clickedColumn = key;
    state.users = users;
     console.log(state)
    this.setState(state);
    
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
            <th onClick={this.sortData.bind(this, 'email')} className="subscriber-list">Email
            {this.state.clickedColumn == 'email' && 
              <span //I said that if this.state.reversed is true, I will return the down arrow, which signifies that it's in descending order. If it's not true (if it's in ascending order, then I return the up arrow. I'm using the ternary operator to make it look better)
                className={this.state.reversed ? "glyphicon glyphicon-arrow-down" : "glyphicon glyphicon-arrow-up"}></span> 
            }
            </th>
            
            <th onClick={this.sortData.bind(this, 'name')} className="subscriber-list">Name 
            {this.state.clickedColumn == 'name' && 
              <span className="glyphicon glyphicon-arrow-down"></span> 
            }
            </th>
            <th onClick={this.sortData.bind(this, 'subscribedAt')} className="subscriber-list">
            Subscribed at 
            {this.state.clickedColumn == 'subscribedAt' && 
              <span className="glyphicon glyphicon-arrow-down"></span> 
            }
            </th>
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
