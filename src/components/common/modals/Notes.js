import React, { Component } from 'react';
import '../../../App.css';

class Notes extends Component {
    render() {
        const note = {"__html": this.props.notes.body.html};
        
        return (
            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12" dangerouslySetInnerHTML={ note } style={
                {
                    ...this.props.style,
                    position: "absolute",
                    top: "10%",
                    backgroundColor: '#EEE',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                    border: '1px solid #CCC',
                    borderRadius: 3,
                    marginLeft: -5,
                    marginTop: 5,
                    padding: 20
                }
            }>
                
            </div>
            
        );
    }
}

export default Notes
