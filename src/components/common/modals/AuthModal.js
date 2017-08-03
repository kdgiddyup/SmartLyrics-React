import React, { Component } from 'react';
import '../../../App.css';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Login from '../Login';
import Signout from '../Signout';
import ModalMessage from "./ModalMessage";
import Modal from "react-bootstrap/lib/Modal"; 
import Button from "react-bootstrap/lib/Button"; 
import ajax from "../../../utils/ajax";

class AuthModal extends Component {
    constructor() {
        super();
        this.state = {
            formType: "signup",
            message: "",
            nameValue: "",
            passValue: ""
        };
        // Binding form function to this component since we'll be passing this method to other components to use
        this.form = this.form.bind(this);

        //Binding handleSubmit function
        this.handleSubmit = this.handleSubmit.bind(this);

        // Binding message function 
        this.message = this.message.bind(this);  
    }
    
    // catch form submissions
    handleSubmit = (event,message) => {
        event.preventDefault();
        let thisMessage = "";
        let thisType = "";
        if (event.target.type.value === "login") {
            thisType = "login";
            thisMessage =  "Attempting to log you in"
        }
        else {
            thisType = "signup";
            thisMessage = "Attempting to create your account ..."
        };
        this.setState(
            {
            nameValue: event.target.username.value,
            passValue: event.target.password.value,
            message: thisMessage,
            formType: thisType
            }, 
            // setState callback does these things: 
            () => {

            // 1. calls message method to update the form message area with the new message state
            this.message(this.state.message);
            
            // 2. makes the appropriate api calls
            const userInfo = { 
                "username": this.state.nameValue,
                "password": this.state.passValue
            };
            console.log(`Trying to ${this.state.formType}`)
            // a sign-up attempt:
            if (this.state.formType === "signup") { 
                ajax.signup(userInfo,
                    // error function:
                    (response)=>{
                    this.message(response);
                    },
                    // success function:
                    (response)=>{
                        // close the modal    
                        this.close();
                        this.props.updateGreeting(`${response.message}!`);
                        this.props.updateUser(userInfo.username);
                        // local storage method
                        this.storeUser(userInfo);
                    }
                )
                }
            // a log-in attempt
            else {    
                ajax.login(userInfo,
                // error:
                (response)=>{
                    this.message(response);
                },
                // success
                (response)=>{
                    this.close();
                    this.props.updateGreeting(`${response.message}!`);
                    this.props.updateUser(userInfo.username);
                    this.storeUser(userInfo);
                }
            )
            } // end setState callback    
    })
    } // end handlesubmit function

    // message function passes message into modal window to update user
    message = (statement) => {
        this.setState({
            message: statement
        })
    }

    storeUser = (userInfo) => {
        // Store user in local storage
        localStorage.setItem("sl_user", userInfo.username);
    }

    // some necessary modal methods 
    // getInitialState = () => {
    //     return { showModal: false };
    // }
    close = () => {
        this.setState({ 
            showModal: false,
            message: "" 
        });
    }
    open = () => {

        this.setState({ showModal: true });
    }    
    // form type depends user choice so we need conditions
    form = (type) => {
        if (type === "login"){
            this.setState({
                formType: "login"
            },function(){
                this.open();
            })
        }
        else {
            this.setState({
                formType: "signup"
            }, function(){
                this.open();
            })
        }
    }
    putForm = (type) => {
        if (type === "login") {
            // prop includes the message setting function
            return <LoginForm handleSubmit={this.handleSubmit}/>
        }
        return <SignupForm handleSubmit={this.handleSubmit}/>
    }
    // buttons to show depend on user presence so we need conditions
    buttons = (isUser) => {
        if (!isUser)

            // <Login/> includes both the log-in and sign-up btns
            // props are form type and the message updating function 
            return <Login form={this.form} />;
        return <Signout/>
    }
  
    render() {

        // functions for bootstrap modal module
        // h/t https://www.npmjs.com/package/react-bootstrap-modal  
        
        return (
            <div>
                {/* render authorization buttons and pass in click handler and the right button component */}
                <div id="authBtns" className="col-lg-12">
                    {this.buttons(this.props.user)}
                </div>

                {/* here we render our modal using react-bootstrap built-in components; it will be invisible until needed */}

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Let's get to know each other!</Modal.Title>
                    </Modal.Header>
                       {/* we render either our log-in or sign-in form here */}
                        {this.putForm(this.state.formType)}
                    <Modal.Footer>
                        <ModalMessage message={this.state.message} />
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AuthModal;