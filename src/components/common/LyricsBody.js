import React, { Component } from 'react'
import '../../App.css'
import ajax from "../../utils/ajax"
import Modal from "react-bootstrap/lib/Modal"; 
import Button from "react-bootstrap/lib/Button"; 

import $ from "jquery"

class LyricsBody extends Component {
    constructor() {
    super();
    this.state = {
        noteData: "",
        showModal: false
        }
        this.notesClose = this.notesClose.bind(this);
        this.HandleTextClick = this.HandleTextClick.bind(this);
    }

    // easier to do some html fragment (NOT DOM manipulation) here with a jquery module
    cleanLyrics =  (html)  => {
       
        // 1) grab lyrics portion of html returned from our api scrape call         
        let lyrics = $(html).eq(2);
        
        // 2) remove native genius hrefs - we'll get those referent annotations in the LyricsBody component from the "annotation-fragment" attribute and 3) at the time add a toggle onclick method 
        $(lyrics).children(".referent").each( (index,element)=> { 
            $(element).removeAttr("href")
            });
        
        return(lyrics.html());
    }

    // method to render html in our Lyrics modal:
    createMarkup = (html) => {        
        return { "__html":this.cleanLyrics(html) };
    }

   // conditionally set art because it isn't always there
    renderSongArt = () => {

        if (!this.props.lyrics.image)
            return false;
        return (
            <img alt="Song art" className="lyricThumb" src={this.props.lyrics.image}/>
            )
        }

    HandleTextClick = ( event ) => {
        event.persist();
        const note_id = $(event.target).attr("data-id");
        
       if (!note_id) {
            return false
        }
        // make the ajax call to the Genius api
        ajax.getAnnotations( note_id , 
    
        //error callback
        (response) => {
            console.log(`Error: ${response}`)
        },

        //success callback
        (response) => {
            console.log("NOTE CALL response:",response.annotation);
            this.setState({
                noteData: response.annotation.body.html,
                showModal: true
            })
        })
    }; 

  
    notesClose = () => {
        this.setState({ showModal: false })
    }

    render() {
       return (

            <div id="lyricsWrapper">
                <div className="row">
                    <div id="lyricsHeader" className="col-lg-12">
                        <h3 className="pull-left">{this.props.lyrics.title}</h3>
                        <h3 className="pull-right">{this.props.lyrics.artist}</h3>
                    </div>
                </div>
                {/* we render our lyrics results here */}
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-4 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12" id="lyricsModalBody">
                        <button id="lyricsCloser" className="btn btn-primary btn-block" onClick={this.props.lyricsClose}>Hide</button>
                        
                        {/* song art, if any, goes here */}
                        {this.renderSongArt()}
            
                        {/* html from scraping is handled with a special react prop to remind us this can be dangerous */}
                        <div onClick={this.HandleTextClick} id="lyricsText" dangerouslySetInnerHTML = {this.createMarkup(this.props.lyrics.lyrics)}/>
                        
                        <button id="lyricsCloserBottom" className="btn btn-primary btn-block" onClick={this.props.lyricsClose}>Hide</button>
                    </div>                
                </div>

                {/* notes modal window is here, but visible unless we want it to be*/}
                 <Modal show={this.state.showModal} onHide={this.props.close}>
                    <Modal.Header>
                        <Modal.Title>
                            <h4>Lyric notes</h4>
                        </Modal.Title>
                    </Modal.Header>
                        <div id="notesModal" dangerouslySetInnerHTML={ {"__html": this.state.noteData} }/>
                    <Modal.Footer>
                        <Button onClick={this.notesClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default LyricsBody;