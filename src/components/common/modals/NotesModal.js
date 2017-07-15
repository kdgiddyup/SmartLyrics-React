import React, { Component } from 'react'
import '../../../App.css'
import Modal from "react-bootstrap/lib/Modal"
import Button from "react-bootstrap/lib/Button"


class NotesModal extends Component {
    constructor() {
    super();
    this.state = {
        showModal: false
        }
    }
// some modal methods 
    close = () => {
        this.setState({ 
            showModal: false
        });
    }
    open = () => {
        this.setState({ 
            showModal: true 
        });
    }  

    render() {
        var note = {"__html": this.props.notes.body.html};
        // functions for bootstrap modal module
        // h/t https://www.npmjs.com/package/react-bootstrap-modal  
        return (
            <div>

                {/* here we render our modal using react-bootstrap built-in components; it will be invisible until needed */}
                <Modal show={this.props.showModal} onHide={this.props.close}>
                    <Modal.Header>
                        <Modal.Title>
                            <h2>Lyric notes</h2>
                        </Modal.Title>
                    </Modal.Header>
                        <div id="notesModal" dangerouslySetInnerHTML={ note }/>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NotesModal