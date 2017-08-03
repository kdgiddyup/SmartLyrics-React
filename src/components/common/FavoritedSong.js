import React, { Component } from "react"
import {Link} from "react-router-dom"
import '../../App.css'

class FavoritedSong extends Component {

    render() {
        const thisSong = this.props.songObj;

        return(
            <div className="row song">
                <div className="col-lg-10 col-lg-offset-1 col-xs-12"> 
                        <h2>
                            <span onClick = { () => this.props.RemoveFavorite(this.props.user,thisSong.song_id) } className="glyphicon glyphicon-trash removeButton" data-song-id={thisSong.song_id} aria-hidden="true"></span> 
                            
                            <span className="getLyricsSpan" onClick= { () => this.props.GetLyrics (thisSong)}>{thisSong.title}</span> - <Link to={`/search/${thisSong.artist}`}>           {thisSong.artist}</Link> 
                        
                        </h2>

                    </div>
           </div> 
        )
    }
}

export default FavoritedSong