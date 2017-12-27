import React, { Component } from "react";
import { Link } from "react-router-dom";

class Form extends React.Component {


  //code here

  render() {
    //more here
    return (
      <div>
      <form>
          <label>
          Name:
            <input onChange={this.onInputChange} name="name" />
          </label>
          <label>
          Email:
            <input onChange={this.onInputChange} email="email" />
          </label>
          <Link to="/confirmation" input type="submit">Subscribe  </Link>
        </form>
        <form onSubmit={this.handleFormChange}>Submit</form>

      </div>

      )
  }

}

export default Form;
