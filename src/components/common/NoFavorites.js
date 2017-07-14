import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

class NoFavorites extends Component {
    render() {
        return (
            <div className="text-center">
                <h2 id="favoritesTitle">We found nothing!</h2>
                <i className="fa fa-frown-o fa-4x fa-fw"></i><span className="sr-only">Frown ...</span>
                <Link to={"/search"}>
                    <p>Find some songs to save...</p>
                </Link>
            </div>
    );
    }
}
export default NoFavorites