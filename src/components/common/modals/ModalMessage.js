import React, { Component } from 'react';
import '../../../App.css';

class ModalMessage extends Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };
    }

    render() {
        return (
            <p>
                {this.props.message}
            </p>
        );
    }
}

export default ModalMessage;