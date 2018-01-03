import React, { Component } from "react";
import { Link } from "react-router-dom";

class Form extends React.Component {

  state = { email: '', name: '' }

//        <input value={this.state.term} onChange={(event) => this.setState({ term: event.taret.value })} />;

  //code here

  render() {
    //more here
    return (


      <form className="signup-form">
       <h2>Sign up</h2>
       <div>
         <label htmlFor="email">Email address</label>
         <input type="email" onChange={(event) => this.setState({ email: event.target.value })}

          className="form-control"
           name="email" />
       </div>





       <div>
         <label htmlFor="name">Name</label>
         <input type="name" onChange={(event) => this.setState({ name: event.target.value })}
 name="name" />
       </div>
       <button type="submit">
          Sign up
       </button>
     </form>

      )
  }

}

export default Form;
