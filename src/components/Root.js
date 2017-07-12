import React, { Component } from 'react'

class Root extends Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        );
    }
}
export default Root