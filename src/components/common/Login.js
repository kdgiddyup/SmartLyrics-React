import React, { Component } from 'react';
import "../../App.css";

class Login extends Component {  
  render() {
    return (
        <div>
          {/* onclick sends this button type to AuthModal's form() method */}
          
          <div onClick = { () => this.props.form('login') } className="btn btn-success" id="signinModalBtn" value="Log in">Log in
          </div>

          <div onClick = { () => this.props.form('signup') } className="btn btn-success" id="signupModalBtn" value="Create account">Create account
          </div>
          
        </div>  
    )
  }
}

export default Login; 
