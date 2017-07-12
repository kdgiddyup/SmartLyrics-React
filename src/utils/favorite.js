// what happens when this page is loaded?
  
$(document).ready(function(){
   var user = currentUser();
    $("#userGreeting").html(`${user}'s favorites ...`);
    
    // hit the "get all favorited songs" route with username appended and render a list of results
    $.get(`/api/favorites/${user}`,function(data){
        console.log("attempting to retrieve favorites");
        if (data.length > 0) {
            $("#favoritesTitle").text("Favorites");
           // 
           renderSavedResults(data);
        }
        else {
            $("#favoritesList").html("<h2 id=\"favoritesTitle\">No results</h2><p>You haven't saved any favorites! <a href=\"/search.html\">Search for some here</a>.</p>");
        }
    })
}) // end ready function


function renderSavedResults(songs){
    
    // takes in mongo db search results; we'll use song_id and title 
    // we'll store results in a globally available object
    var results ={};
    
    // remove any previous results
    $("#favoritesList").html("<h4>Favorites</h4>");
    
    // loop through api call results and extract data
    $(songs).each(function(index,element){
      // add properties to global results object
      results[element.song_id] = {
      title: element.title,
      artist: element.artist,
      lyrics: element.lyrics,
      image: element.image,
      user: element.user
    }; 
      // generate HTML
      var thisSong = $("<div>").attr({class:"song col-lg-12","data-song-id":element.song_id});
  
      thisSong.append(`<h2>${element.title} <span class="glyphicon glyphicon-align-justify lyricsButton" data-song-id=${element.song_id} data-toggle="modal" data-target="#lyricsModal" aria-hidden="true" data-lyrics-url=${element.lyrics}></span> <span class="glyphicon glyphicon-trash removeButton" data-song-id=${element.song_id} aria-hidden="true"></span></h2>`);
  
      thisSong.append(`<p class="artist">${element.artist}</p>`);
      
      // add song div to display 
      $("#favoritesList").append(thisSong); 
    }); // end add song results loop
   
    // attach click listener to lyrics button
    $(".lyricsButton").on("click",function(){
        
        //clear hidden modal window of any previous search results
        $("#lyricsModalTitle").html("Searching . . .");
        $("#lyricsModalBody").html("<i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>");

        // what song is this?
        var thisSong = $(this).attr("data-song-id");
        fetchLyrics(thisSong,results);
        
    });  // end lyrics button click function

    // attach click listener to unfavorite button
    $(".removeButton").on("click",function(){
        // hit /api/remove
        $.get(`/api/remove/${$(this).attr("data-song-id")}`,function(response){
            $(`.song[data-song-id='${response.song}']`).fadeOut("slow").remove();
        })
    })
  
  } // end renderSavedResults function

  function currentUser(){
    // first, does the browser support local storage?
    if (typeof(Storage) !== "undefined") {
        // try to retrieve any current user stored from previous log-in
        if (localStorage.getItem("sl_user")) {
            user = localStorage.getItem("sl_user");
            return user;
        }
        else {
            console.log("No local storage supported");
            return false;
        }
    }
};