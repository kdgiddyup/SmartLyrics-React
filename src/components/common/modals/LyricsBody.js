import React, { Component } from 'react'
import '../../../App.css'
import ajax from "../../../utils/ajax"
import Notes from "./Notes"
import $ from "jquery"

class LyricsBody extends Component {
    constructor() {
    super();
    this.state = {
        noteData: "",
        showNotes: false
    }
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
            <img alt="Song art" className=".lyricThumb" src={this.props.lyrics.image}/>
            )
        }

    HandleTextClick = ( event ) => {
        console.log(event.target);
        const note_id = $(event.target).attr("data-id");

        if (!note_id) {
            return false
        }
        // make the ajax call to my api, powered by Genius
        ajax.getAnnotations( note_id , 
    
        //error callback
        (response) => {
            console.log(`Error: ${response}`)
        },

        //success callback
        (response) => {
            console.log(response.annotation);
            this.setState({
                noteData: response.annotation,
                showNotes: true
            })
        })
    } 
    
    CloseAnnotation = () => {
        this.setState({ showNotes: false })
    }

    RenderNotes = () => {
            if (!this.state.showNotes) {
                return false
            };
            return (
                <Notes notes={this.state.noteData} show={this.state.showNotes} close={this.CloseAnnotation} />
            )
        }

    render() {
       
        return (
            <div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" id="lyricsModalBody">
                    {/* song art, if any, goes here */}
                    {this.renderSongArt()}

                        {/* div has click handler to show annotations i a popover*/}
                        {/* html from scraping is handled with a special react prop to remind us this can be dangerous */}

                        <div onClick={this.HandleTextClick} id="lyricsText" dangerouslySetInnerHTML = {this.createMarkup(this.props.lyrics.lyrics)}/>
                </div>
                {this.RenderNotes()}
            </div> 
        );
    }
}

export default LyricsBody;