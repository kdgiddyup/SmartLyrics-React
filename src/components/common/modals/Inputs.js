import React, { Component } from 'react';
import '../../../App.css';


class Inputs extends Component {

componentDidMount() {
    // clear values
    const inputs = document.getElementsByTagName("input");
    for (var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
}

    render() {
        return(
            <div>
                <div>
                    <label>Username:</label>
                    <input className="form-control" type="text" placeholder="Username" name="username" value={this.props.nameValue}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={this.props.passValue}/>
                </div>
                <input type="hidden" value={this.props.type} name="type"/>
            </div>
        )
    }
}

export default Inputs