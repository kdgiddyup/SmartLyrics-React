import React, { Component } from 'react'
import '../../App.css'
import FavoritedSong from "./FavoritedSong"
import ajax from "../../utils/ajax"


class FavoriteResults extends Component {
    
    renderSongs() {
        return this.props.results.map(song => (
            <FavoritedSong
                title={song.title}
                song_id={song.song_id}
                lyrics={song.lyrics}
                favorite={song.favorite}
                artist={song.artist}
                thumb={song.thumb}
                RemoveFavorite={this.props.RemoveFavorite}
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

export default FavoriteResults