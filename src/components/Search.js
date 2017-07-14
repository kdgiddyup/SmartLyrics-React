import React, { Component } from 'react'
import ajax from "../utils/ajax"
import '../App.css'
import LyricsModal from './common/modals/LyricsModal'
import SearchLoading from "./common/SearchLoading"


class Search extends Component {
    constructor() {
    super();
    this.state = {
        songs: [],
        showLoader: false
        };
    }

    componentDidMount() {
        
        // is this search from the form (term=false) or a URL param search?
        // if term is false, go right to search; if the form was used, it will trigger the processForm method and then do the search
        if (this.props.term) {
           this.doSearch(this.props.term.trim())     
        }
    }

    processForm = (event) => {
        event.preventDefault();
        this.doSearch(event.target.lyricsSearch.value.trim())
    }

    doSearch = (searchTerm) => {
        
        // show search loader
        this.setState({
            showLoader: true
        })

        // input is an object consisting of input string and user
        const input = {
            input: searchTerm,
            user: this.props.user
        };
        
        // search requires both input and the current user;
        // it passes input and error/success callbacks to our ajax handler
        ajax.search(input,

        // error function:
        (response) => {
            // shut off search load signal
            this.setState({
                showLoader: false
            });
            // to do: handle error
            console.log('error:', response)
        },
        //success function sets state
        (response) => {
            // update state with songs;
            // shut off search load signal
            this.setState({
                showLoader: false,
                songs:response.songs
            });                
            }) // end of ajax call
    }

    // method for toggling a favored song in search results
    SetFavorite = (song_id) => {
        const songs = this.state.songs; 
        var favPost = {};
        // loop through songs in state to find which matches this id
        for (var i=0;i<songs.length;i++){
            if (songs[i].song_id === song_id) {
                const songInState = songs[i];
               
                // is this a favoriting or an unfavoriting? test results in two courses of action 
                if (songInState.favorite !== "favorite") {

                    // continue with favoriting. 
                    // first, construct post body to send to our ajax handler, being sure to set the "favorite" property to "favorite"
                    favPost = {
                        title:songInState.title,
                        artist:songInState.artist,
                        lyrics:songInState.lyrics,
                        thumb:songInState.thumb,
                        user:this.props.user,
                        song_id:song_id,
                        favorite:"favorite"
                    }
                    
                    // make the call
                    ajax.favorite( favPost,
                        //error function
                        (response) => {

                            // error function
                            console.log("Error favoriting:",response)
                            },

                            // success function; response is the api returning the song object back
                            (response) => {

                                // clone a new array to update state, but with this particular song inserted in place of its former self
                                var updated = [...this.songs.state];
                                for (var i=0;i<updated;i++) {
                                    if (response.song.song_id === updated[i].song_id) {
                                        updated[i].favorite="favorite"
                                    };
                                };

                                // set state to updated array of songs to trigger re-rendering
                                this.setState({
                                    songs:updated,
                                    showLoader: false
                                })
                            }) // end of ajax post 
                    } // end true branch of if statement
                else {  

                    // song is already favorited, so we're really unfavoriting
                    ajax.remove( song_id,
                        // error function
                        (response) => {
                            console.log(response.error)
                        },
                        // success function
                        (response) => {

                            // response should be a song id, which we filter from songs in state and setState with resulting array             
                            this.setState({
                                songs: this.state.songs.filter( (song) => song.song_id !== response),
                                showLoader: false
                            })
                        })
                }
            }
        }
    } // end SetFavorite function
    
    RenderLoader = () => {
        // should <SearchLoading/> be showing?
        if (this.state.showLoader) {
            return <SearchLoading/>
        };
        return null 
    };
    RenderResults = () => {
        // should search results be loaded?
        if (this.state.songs.length > 0) {
            return <LyricsModal type="search" results={this.state.songs} SetFavorite={this.SetFavorite} />
        };
        return null
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
                        
                        {/* show search loader if we need it */}
                        {this.RenderLoader()}

                        {/* likewise, statefully render results */}
                        {this.RenderResults()}

                    </div>  
                </div>
            </div>
        );

    }
}
export default Search