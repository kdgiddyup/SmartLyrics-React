import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

class MenuBtns extends Component {

    render() {
        return (
            <div className="row" id="menuBtns">
               <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <Link to={"/search"}>
                        <button type="button" className="btn btn-default btn-lg" data-toggle="tooltip" data-placement="auto top" title="Search for songs by title, artist or lyrics">
                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                        </button>
                    </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <Link to={"/favorites"}>
                        <button type="button" className="btn btn-default btn-lg" data-toggle="tooltip" data-placement="auto top" title="See your saved songs">
                        <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                        </button>
                    </Link> 
                </div>
            </div>
        )
  }
}
export default MenuBtns;