import React, { Component } from "react"
import {Link} from "react-router-dom"
import '../../App.css'

class SearchedSong extends Component {
 
   render() {
        const thisSong = this.props.songObj; 
        
        // set classes for 'favorite' icon depending on status for this user
        const favClasses = `glyphicon glyphicon-heart favoriteButton ${this.props.favorite}`;

        return(
            <div className="row song">
                <div className="col-lg-10 col-lg-offset-1 col-xs-12">        
                        <h2>
                            <span  onClick = { () => {this.props.SetFavorite(thisSong.song_id)} } className=
                            { favClasses }  data-song-id={thisSong.song_id}></span>  
                            
                            <span class="getLyricsSpan" onClick= { () => this.props.GetLyrics (thisSong)}>{thisSong.title}</span> -  <Link to={`/search/${thisSong.artist}`}>{thisSong.artist}</Link>
                        </h2>

                </div>
            </div> 
        )
    }
}

export default SearchedSong