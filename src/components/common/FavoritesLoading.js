import React, { Component } from 'react'
import '../../App.css'

class FavoritesLoading extends Component {
    render() {
        return (

                    <h2 id="favoritesTitle" className="text-center">Searching . . . <i className="fa fa-spinner fa-pulse fa-fw"></i>
                    <span className="sr-only">Loading...</span></h2>
    );
    }
}
export default FavoritesLoading