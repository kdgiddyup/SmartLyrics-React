import React, { Component } from 'react'
import '../../App.css'
import SearchedSong from "./SearchedSong"
import ajax from "../../utils/ajax"


class SearchResults extends Component {
    
    renderSongs() {

        return this.props.results.map(song => (
            <SearchedSong
                title={song.title}
                song_id={song.song_id}
                lyrics={song.lyrics}
                favorite={song.favorite}
                artist={song.artist}
                thumb={song.thumb}
                // we also pass in our favorite method and songObj so we can access it for the favorite button 
                SetFavorite={this.props.SetFavorite}
            />)
        );   
    }
    render() {
        return (
            <div>
                <h2>Results</h2>
                {this.renderSongs()}    
            </div>
        )
   }
}

export default SearchResults