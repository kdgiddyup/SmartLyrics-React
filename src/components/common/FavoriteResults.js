import React, { Component } from 'react'
import '../../App.css'
import FavoritedSong from "./FavoritedSong"
import NoFavorites from "./NoFavorites"

class FavoriteResults extends Component {
    
    renderSongs() {
        console.log("FavoriteResults props:",this.props);

        if (!this.props.results || this.props.results.length === 0) {
            return <NoFavorites/>;
            };
        return (
            this.props.results.map(song => (
            <FavoritedSong key={song.song_id.toString()} 
                title={song.title}
                song_id={song.song_id}
                lyrics={song.lyrics}
                favorite={song.favorite}
                artist={song.artist}
                thumb={song.thumb}
                user={song.user}
                RemoveFavorite={this.props.RemoveFavorite}
                GetLyrics={this.GetLyrics}
            />))
        );
    } 

    render() {
        return (
            <div>
                <h2 className="resultsHeader">Your favorites</h2>
                {this.renderSongs()}    
            </div>
        )
   }
}

export default FavoriteResults