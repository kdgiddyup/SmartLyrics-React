import React, { Component } from 'react'
import '../../App.css'

class FavoritesLoading extends Component {
    render() {
        return (
        <div className="row">
            <div id="favoritesList" className="col-lg-12">
                <h2 id="favoritesTitle" className="modal-title">Searching . . . <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span></h2>
            </div>
        </div>
    );
    }
}
export default FavoritesLoading