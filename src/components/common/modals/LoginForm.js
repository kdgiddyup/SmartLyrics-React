import React, { Component } from 'react';
import '../../../App.css';
import Inputs from "./Inputs";

class LoginForm extends Component {

    constructor() {
    super();
    this.state = {
        nameValue: "",
        passValue: "",
        message: ""
        }
    }  
   
    render() {
        return (
            <div>
                <h4>Log in <i className="fa fa-sign-in" aria-hidden="true"></i></h4>
                <form onSubmit={this.props.handleSubmit} id="login" className="input-group">
                    
                    <Inputs name={this.state.nameValue} pass={this.state.passValue} handleSubmit={this.handleSubmit} type="login"/>

                    <div>
                        <button className="btn btn-primary" id="loginBtn" value="Log In" type="submit">Log In</button>
                    </div>

                </form>
            </div> 
            )
    }
}

export default LoginForm;