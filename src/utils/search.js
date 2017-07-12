var user = currentUser();

// what happens when search button is clicked?
  $(document).ready(function(){

    // check local storage for a current user
    if (currentUser()) {
        $("#userGreeting").html(`Welcome, ${user}`);
    }

    $("#lyricsSearchButton").on("click",function(){
      var input=$("#lyricsSearch").val().trim();
      console.log("searching",input);
      
      // we'll send input and user, since we'll use user info in back end to check on favorited status of songs
      $.post("api/search/",{input,user},function(data){
        console.log(data);
        renderSearchResults(data.songs);
      });
    })

     }) // end ready function

function renderSearchResults(songs){
    // takes in genius api  search results
    // we'll store results in a globally available object
    var results ={};
    
    // replace any previous results with the header
    $("#resultsList").html("<h4>Results</h4>");
    
    // loop through api call results and extract data
    $(songs).each(function(index,element){
      // add properties to global results object, including current user, who will be associated with any favoriting action     
      
      results[element.song_id] = {
      title: element.title,
      artist: element.artist,
      image: element.thumb,
      lyrics: element.lyrics,
      user: user,
      favorite: element.favorite  // will either be 'favorited' or ''; this value will become the class on the "favorite" button
    };
      
      // generate HTML
      var thisSong = $("<div>").attr({"class":"song col-lg-12","data-song-id":element.id});
      
      
      // build up song div 
      thisSong.append(`<h2>${element.title} <span class="glyphicon glyphicon-align-justify lyricsButton" data-song-id=${element.song_id} data-toggle="modal" data-target="#lyricsModal" aria-hidden="true" data-lyrics-url=${element.lyrics}></span> <span class="glyphicon glyphicon-heart favoriteButton ${element.favorite}" data-song-id=${element.song_id} aria-hidden="true"></span> </h2>`);
  
      thisSong.append(`<p class="artist">${element.artist}</p>`);
      
      // add song div to display 
      $("#resultsList").append(thisSong); 
    }); // end add song results loop
   
    // attach click listener to lyrics buttons
    $(".lyricsButton").on("click",function(){
      
      //clear hidden modal window of any previous search results
      $("#lyricsModalTitle").html("Searching . . . ");
       $("#lyricsModalBody").html(" <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>");

      // what song is this?
      var thisSong = $(this).attr("data-song-id");
      
      fetchLyrics(thisSong,results);

  });  // end lyrics button click function
  
  // attach click listener to favorites buttons
  $(".favoriteButton").on("click",function(){
    var thisSong = $(this).attr("data-song-id");

    // is this already favorited? then this is really a remove operation
    if ($(this).hasClass("favorite")) {
       // remove "favorite" class for this song
        $(this).removeClass("favorite");
       
       // hit /api/remove
        $.get(`/api/remove/${thisSong}`,function(response){
            console.log(response);
        })
    }
    else {
      
      // build a post body:
      var body = {"title":results[thisSong].title,"artist":results[thisSong].artist,"song_id":thisSong,image:results[thisSong].image,lyrics:results[thisSong].lyrics,user:results[thisSong].user};
      
      $.post("/api/favorites",body,function(data){
        console.log("Favorited",data);  
      });

      // add "favorite" to class for this song
      $(this).addClass("favorite");
    }
  });


} // end renderSearchResults function

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