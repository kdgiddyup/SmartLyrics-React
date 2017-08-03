import React, { Component } from 'react';
import '../../App.css';
import ajax from "../../utils/ajax"
import SearchedSong from "./SearchedSong"
import FavoritedSong from "./FavoritedSong"
import LyricsBody from "./LyricsBody"

class SongList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lyricsOpen: false
        }

    // methods for the lyrics box to be bound here
    this.lyricsClose = this.lyricsClose.bind(this);
    this.lyricsOpen = this.lyricsOpen.bind(this);

  }
    
  // methods used to manage control of lyrics box
    lyricsClose = () => {
            console.log("trying to close lyrics");
            this.setState({ lyricsOpen: false })
        }
    
    lyricsOpen = () => {
            this.setState({ lyricsOpen: true })
        }

    
  // here's how we get our song lyrics from Genius' API
    GetLyrics = ( song ) => {
        // close any open lyrics
        this.lyricsClose();
        
        ajax.getLyrics( song, 
        
            //error callback
            (response) => {
                console.log(`Error: ${response}`);
            },
            //success callback
            (response) => {
                this.setState({
                    lyrics:response.response,
                    lyricsOpen: true
                })
            }
        )
    }
    // lot going on in renderSongs():
    // 1. maps each song in the props.results array to the <LyricsModal component
    // 2. builts a songObj on the fly for each song which will be passed to the GetLyrics method
    // 4. adds favorite status to searched songs and Lyrics/Annotation methods
    // 5. adds remove method to favorited songs as well as the Lyrics/Annotation methods

    renderSongs(type){

        if (type === "favorite") { 
            console.log("favorites results",this.props.results);
        return this.props.results.map( song => ( 
                <FavoritedSong key={song.song_id.toString()} 
                    songObj={{
                        "song_id":song.song_id,
                        "title":song.title,
                        "url":song.lyrics,
                        "artist":song.artist,
                        "image":song.image}}  
                    favorite={song.favorite}
                    user={this.props.user}
                    RemoveFavorite={this.props.RemoveFavorite}
                    GetLyrics={this.GetLyrics}
                />
            ));
        }
        // if it wasn't "favorite" type, had to "search"
        else {  
            return this.props.results.map( song => (
                <SearchedSong key={song.song_id.toString()}
                    songObj={{
                        "song_id":song.song_id,
                        "title":song.title,
                        "url":song.lyrics,
                        "artist":song.artist,
                        "image":song.image}}            
                    favorite={song.favorite}
                    user={this.props.user}
                    GetAnnotations={this.GetAnnotations}
                    SetFavorite={this.props.SetFavorite} 
                    GetLyrics={this.GetLyrics}
                />
            ));
        } 
    }

    renderLyrics(lyrics) {
        if (this.state.lyricsOpen) {
            return <LyricsBody lyricsClose={this.lyricsClose} lyrics={this.state.lyrics} />;
        }
    }

    render() {
        return (
            <div>
                {/* render lyrics box here when user triggers them */}
                {this.renderLyrics(this.state.lyrics)}

                {/*  search or favorite results are conditionally placed here */}
                {this.renderSongs(this.props.type)}                         
            </div>
             );
    }
}

export default SongList