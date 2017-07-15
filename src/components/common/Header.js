import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../App.css';

class Header extends Component {

  render(){
    return (
      <div id="header" className="row">
          <div className="col-lg-12">
            <Link to={"/"}>
              <h1>SmartLyrics</h1>
            </Link>
            <Link to={"http://genius.com"}>
              <h4>Powered by Genius.com</h4>
            </Link>

            {/*} Greeting comes from props */}
            <p id="userGreeting">{this.props.greeting}</p>
          </div>
      </div>
      );
    }
  }

export default Header;  
