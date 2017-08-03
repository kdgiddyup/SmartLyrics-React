import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../App.css';

class Footer extends Component {

  render(){
    return (
      <div id="footer" className="row">
          <div className="col-lg-12">
           <p>A Mongo-React-Express-Node demo project <Link to={"https://github.com/kdgiddyup"}>Kelly Davis</Link> <i className="fa fa-copyright" aria-hidden="true"></i> 2017</p>
          </div>
      </div>
      );
    }
  }

export default Footer;  
