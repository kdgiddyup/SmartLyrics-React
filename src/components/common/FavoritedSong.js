import React, { Component } from "react"
import {Link} from "react-router-dom"
import '../../App.css'

class FavoritedSong extends Component {

    render() {
        const song_id = this.props.song_id;
        return(
            <div key={this.props.song_id.toString()} className="row">
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-offset-1 col-sm-12 col-xs-12">
                    <div className="panel">
                        <h3>{this.props.title} 
                        
                            <span onClick= { ()=>this.props.GetLyrics (song_id)} className="glyphicon glyphicon-align-justify lyricsButton" data-song-id={song_id} data-toggle="modal" data-target="#lyricsModal" aria-hidden="true" data-lyrics-url={this.props.lyrics}></span> 
                            
                            <span onClick = { () => this.props.RemoveFavorite(song_id) } className="glyphicon glyphicon-trash removeButton" data-song-id={song_id} aria-hidden="true"></span> 
                        
                        </h3>
                        
                        <h4 className="artist">
                            <Link to={`/search/${this.props.artist}`}>
                                {this.props.artist}
                            </Link>    
                        </h4>

                    </div>
                </div>
           </div> 
        )
    }
}

export default FavoritedSong