import React, { Component } from 'react'
import '../../../App.css'
import ModalMessage from "./ModalMessage"
import Modal from "react-bootstrap/lib/Modal"
import Button from "react-bootstrap/lib/Button"
import ajax from "../../../utils/ajax"
import SearchedSong from "../SearchedSong"
import FavoritedSong from "../FavoritedSong"
import LyricsBody from "./LyricsBody"

class LyricsModal extends Component {
    constructor() {
        super();
        this.state = {
            lyrics: ""
        }

        // bind GetLyrics and GetAnnotation methods since we'll pass them down the tree
        this.GetLyrics = this.GetLyrics.bind(this);  
    } 
    // some modal methods 
    close = () => {
        this.setState({ 
            showModal: false
        });
    }
    open = () => {
        this.setState({ 
            showModal: true 
        });
    }  

    GetLyrics = ( song ) => {
        this.open();
        ajax.getLyrics( song, 
        
            //error callback
            (response) => {
                console.log(`Error: ${response}`);
                this.setState({
                    lyrics:response.response
                })

            },
            //success callback
            (response) => {
                this.setState({
                    lyrics:response.response
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
        return this.props.results.map( song => ( 
                <FavoritedSong key={song.song_id.toString()} 
                    songObj={{
                        "song_id":song.song_id,
                        "title":song.title,
                        "url":song.lyrics,
                        "artist":song.artist,
                        "image":song.thumb}}  
                    favorite={song.favorite}
                    user={song.user}
                    GetLyrics={this.GetLyrics}
                    RemoveFavorite={this.props.RemoveFavorite}
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
                        "image":song.thumb}}            
                    favorite={song.favorite}
                    GetLyrics={this.GetLyrics}
                    GetAnnotations={this.GetAnnotations}
                    SetFavorite={this.props.SetFavorite} 
                />
            ));
        } 
    }

    render() {

        // functions for bootstrap modal module
        // h/t https://www.npmjs.com/package/react-bootstrap-modal  
        return (

            <div>
                {/*  search or favorite results are conditionally placed here */}
                { this.renderSongs(this.props.type) }

                {/* here we render our modal using react-bootstrap built-in components; it will be invisible until needed */}
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>
                            <div className="pull-left">     
                                {this.state.lyrics.title}
                            </div>
                            <div className="pull-right">     
                                {this.state.lyrics.artist}
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* we render our lyrics results here */}
                        <LyricsBody lyrics={this.state.lyrics}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <ModalMessage message={this.state.message} />
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LyricsModal