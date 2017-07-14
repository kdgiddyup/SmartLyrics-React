import React, { Component } from 'react'
import ajax from "../utils/ajax"
import SearchResults from "./common/SearchResults"
import '../App.css'

class Search extends Component {
    constructor() {
    super();
    this.state = {
        songs: null
        };
    }

    componentDidMount() {
        // is this a search form use (term=false) or a URL param search?
        console.log("search term:",this.props.term);
        if (this.props.term) {
           this.doSearch(this.props.term.trim())     
        }
    }

    processForm = (event) => {
        event.preventDefault();
        this.doSearch(event.target.lyricsSearch.value.trim())
    }

    doSearch = (searchTerm) => {
        // input is an object consisting of input string and user
        const input = {
            input: searchTerm,
            user: this.props.user
        };
        // search requires both input and the current user
        ajax.search(input,

        // error function:
        (response) => {
            // to do handle error
            console.log('error:', response)
        },
        //success function sets state
        (response) => {
            this.setState({
                songs:response.songs
            })
        })
    }

    // method for toggling a favored song in search results
    SetFavorite = (song_id) => {
        const songs = this.state.songs; 
        var favPost = {};
        // loop through songs in state to find which matches this id
        for (var i=0;i<songs.length;i++){
             
            if (songs[i].song_id === song_id) {
               
                const thisSong = songs[i];
                // is this a favoriting or an unfavoriting?
                (thisSong.favorite === "") ?  thisSong.favorite = "favorite" : thisSong.favorite="";
                favPost = {
                    title:thisSong.title,
                    artist:thisSong.artist,
                    lyrics:thisSong.lyrics,
                    thumb:thisSong.thumb,
                    user:this.props.user,
                    song_id:song_id,
                    favorite:thisSong.favorite
                }
                
            }        
        }
        ajax.favorite(favPost,
        //error function
        (response) => {
            console.log("Error favoriting:",response)
        },
        // success function
        (response) => { 
        // build a new array to update state
        var updated = [...this.state.songs];

        for (var i=0;i<updated.length;i++) {
            if (updated[i].song_id === response.song.song_id)
                updated[i] = response.song
        };   
        
        this.setState({
             songs:updated
         })
        })
    }
    
    RenderResults = () => {
        return (
        (!this.state.songs) ? null : <SearchResults results={this.state.songs} SetFavorite={this.SetFavorite} /> 
        )
    }

   render() {

        return (
            <div className="row">
                <div id="searchInput" className="col-lg-12">
                     <form onSubmit={this.processForm} id="signup">
                        <input className="input" id="lyricsSearch" name="lyricsSearch" placeholder="Enter lyrics, artists or song titles" type="text"/>
                     
                        <button className="btn btn-primary btn-block" id="lyricsSearchButton" type="submit">Submit</button>
                    </form>
                </div>
                <div id="searchResults" className="row">
                    <div className="col-lg-12" id="resultsList">
                        
                        {/* render results when there are some */}
                        {this.RenderResults()}

                    </div>  
                </div>
            </div>
        );

    }
}
export default Search