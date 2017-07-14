import React, { Component } from 'react'
import ajax from "../utils/ajax"
import "../App.css"
import FavoriteResults from "./common/FavoriteResults"
import FavoritesLoading from "./common/FavoritesLoading"

class Favorites extends Component {
    constructor() {
    super();
    this.state = {
        songs: null,
        child: <FavoritesLoading/>
        };

    this.RemoveFavorite = this.RemoveFavorite.bind(this); 
    }
    
    

    componentDidMount(){   
        
       // search for favorites requires current user
        ajax.favorites(this.props.user,

        // error function:
        (response) => {
            // to do: handle error
            console.log('error:', response.message)
        },

        //success function:
        (response) => {
            this.setState({
                songs:response.data,
                child: <FavoriteResults user={this.props.user} results={response.data} GetLyrics={this.GetLyrics} RemoveFavorite={this.RemoveFavorite}/>
            });

            
        })
    }

    RemoveFavorite = (song_id) => {
        console.log("remove attempt song_id:",song_id);
        ajax.remove(song_id,
            // error function
            (response) => {
                console.log(response.error)
            },
            // success function
            (response) => {
                // response should be a song id, which we filter from songs in state and setState with resulting array
                //response = response;                
                this.setState({
                    songs: this.state.songs.filter( (song) => song.song_id !== response),
                    child: <FavoriteResults results={this.state.songs} RemoveFavorite={this.RemoveFavorite}/>
                })
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12" id="favoritesList">
                 {this.state.child}
                </div>
            </div>
        );
    }
}
export default Favorites