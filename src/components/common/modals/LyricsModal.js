import React, { Component } from 'react';
import '../../../App.css';
import Signout from '../Signout';
import Modal from "react-bootstrap/lib/Modal"; 
import Button from "react-bootstrap/lib/Button"; 
import ajax from "../../../utils/ajax";

class LyricsModal extends Component {
    constructor() {
        super();
        this.state = {
        };
        // Binding form function to this component since we'll be passing   
    }

    // some necessary modal methods 
    getInitialState = () => {
        return { showModal: false };
    }
    close = () => {
        this.setState({ 
            showModal: false,
            message: "" 
        });
    }
    open = () => {
        this.setState({ showModal: true });
    }    
  
    render() {

        // functions for bootstrap modal module
        // h/t https://www.npmjs.com/package/react-bootstrap-modal  
        return (
            <div>

                {/* here we render our modal using react-bootstrap built-in components; it will be invisible until needed */}

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Lyrics</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* we render our lyrics results here */}
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <ModalMessage message={this.state.message} />
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LyricsModal;