import React, { Component } from 'react'
import ajax from "../utils/ajax"
import "../App.css"
import SongList from './common/SongList'
import FavoritesLoading from "./common/FavoritesLoading"
import NoFavorites from "./common/NoFavorites"

var FavoriteComp = FavoritesLoading;

class Favorites extends Component {
    constructor() {
    super();
    this.state = {
        songs: [] 
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
            console.log("favorites call response",response);
            if (response.data.length === 0) {
                FavoriteComp = false; 
                this.setState({
                    songs: response.data
                    })
                }
            else {
                FavoriteComp = true;
                console.log("favorites call response:",response)
                this.setState({
                    songs: response.data
                    }) 
                }

        })
    }
    
    
    
    
    // var updated = this.state.songs.filter( song  => song.song_id !== Number(response));
    //   console.log("unfaved after:",updated);

    RemoveFavorite = (song_id) => {
        console.log("remove attempt song_id:",song_id);
        ajax.remove(song_id,
            // error function
            (response) => {
                console.log(response.error)
            },
            // success function;
            (response) => {
                // response should be a song id, which we filter from songs in state and setState with resulting array
                var updated = this.state.songs.filter( (song) => Number(song.song_id) !== Number(response))
                
                // what if we just unfavorited our last song? the child component is determined by length of song list now in state
                if (updated.length === 0) {
                    FavoriteComp = false
                }
                else {
                    FavoriteComp = true
                }
                this.setState({
                    songs: updated
                });
               
            })
    }
    
    RenderFavorites = (comp) => {
        if (!comp) {
            return <NoFavorites/>
        }
        else if (comp) {
            return <SongList type="favorite" results={this.state.songs} RemoveFavorite={this.RemoveFavorite}/>
            }
        else {
            return <FavoritesLoading/>
        } 

    }  

    render() {
        return (
            <div className="row">
                <div className="col-lg-12" id="favoritesList">
                    {/* child here will be either default of <FavoritesLoading/>, <NoFavorites/> or <LyricsModal/>, a generic list rendering component with a modal attached */}
                    {this.RenderFavorites(FavoriteComp)}
                </div>
            </div>
        );
    }
}
export default Favorites