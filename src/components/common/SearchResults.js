import React, { Component } from 'react'
import '../../App.css'
import LyricsModal from "./modals/LyricsModal"

// really just a wrapper for the lyrics modal window and search results
class SearchResults extends Component {
    render() {
        return (
            <div>
                <LyricsModal results={this.props.results} SetFavorite={this.props.SetFavorite} />    
            </div>
        )
   }
}

export default SearchResults