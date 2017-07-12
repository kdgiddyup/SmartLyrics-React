function fetchLyrics(thisSong,results) {
        // post song lyrics request
        console.log(results);
        var lyricsPost = {
            url:results[thisSong].lyrics,
            title: results[thisSong].title,
            artist: results[thisSong].artist,
            image: results[thisSong].image
        };

        $.post("/api/lyrics", lyricsPost, function(data){
            
            // update modal window with artist name
            $("#lyricsModalTitle").text(data.title);
            
            // add in artist's name and lyrics
            $("#lyricsModalBody").html(`<p class="artist_name">${data.artist}</p><p>${data.text}</p>`);
            
            // add artist thumb if available to lyrics text
            if (data.image != "") {
            var image = $("<img>").attr(
                {
                "src":data.image,
                class:"lyricThumb"
                });
            $("#lyricsModalBody").prepend(image);
            };
        
        // **** process returned lyrics html **//
        // 1. remove native genius hrefs - we'll get those referent annotations through the api; 
        $(".referent").removeAttr("href");
        
        // 2. add click listeners to lyric text to trigger ajax call to our geniusAPI to get and display annotations; it takes a parameter that is the annotation id (an attribute called 'data-id')
        $(".referent").on("click",function(){
            var thisRef = $(this);

            $.get(`/api/annotation/${$(thisRef).attr("data-id")}`,function(data) {
            var thisAnnotation = $(data.annotation.body.html).attr("class","referentText");
            var closeBtn = $("<button>").attr({type:"button",class:"btn btn-primary close",refId:$(thisRef).attr("data-id")}).html("&times;");
            $(closeBtn).on("click",function(){
                $(thisAnnotation).remove();
            });
            $(thisAnnotation).prepend(closeBtn);
            
            $(thisRef).after(thisAnnotation);
            });
        });
    });
}