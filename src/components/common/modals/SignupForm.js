import React, { Component } from 'react';
import '../../../App.css';
import Inputs from "./Inputs";
import Button from "react-bootstrap/lib/Button"; 

class SignupForm extends Component {
    constructor() {
    super();
    this.state = {
        nameValue: "",
        passValue: "",
        message: ""
        }
    }  
    
    render() {
        return(
            <div>
            <h4>Sign up <i className="fa fa-user-plus" aria-hidden="true"></i></h4>

            <form onSubmit={this.props.handleSubmit} id="signup" className="input-group">
                
                <Inputs name={this.state.nameValue} pass={this.state.passValue} type="signup"/>
                                
                <div>
                    <Button type="submit" className="btn btn-primary" id="signupBtn" value="Sign Up">Sign Up</Button>
                </div>
            </form> {/* end input-group */}      
            </div>
        )
    }
}

export default SignupForm;