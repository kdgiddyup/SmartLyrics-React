import React, { Component } from 'react';
import "../../App.css";

class Signout extends Component {

  handleSignOut = () => {
    // remove user's entry from local storage
    localStorage.removeItem("sl_user");
    
    // reload page
    window.open("/","_self");
  }
  render() {
    return (
        <div onClick = { () => this.handleSignOut() } className="btn btn-success" id="signoutBtn" value="Log out">Log out
        </div> 
    )
  }
}

export default Signout; 