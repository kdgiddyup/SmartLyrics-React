import $ from "jquery";

const resource = "https://smartlyricsapi.herokuapp.com";

const ajax = {
    
    signup: (userInfo,error,success) =>  {
         $.post(`${resource}/api/signup`,userInfo, (response)=>{
            if (!response.success) {
                error(response.message)
            }
            else {
                console.log("Sign-up successful");
                success(response)
                }
            })
        },

    login: (userInfo,error,success) => {
        $.post(`${resource}/api/login`,userInfo, (response) =>{
            if(!response.success) {
                error(response.message)
            }
            else {
                console.log("Login successful");
                success(response)
                }
            })
        },

    search: (input,error,success) =>{
        $.post(`${resource}/api/search`,input,(response) => {
            if(response.length===0) {
                error("Sorry, there was a problem, or no results.")
            }
            else {
                console.log("Search successful");
                success(response);
            }
        })
    },

    // hit our api to retrieve favorites
    favorites: (user,error,success) =>{
        $.get(`${resource}/api/favorites/${user}`, (response) => {
            if(!response.success) {
                error(response.message)
            }
            else {
                console.log("Favorites fetch successful");
                success(response)
            }
        })
    },

    // hit our api to post a favorite
    // song is an object of song data
    favorite: ( song, error, success ) => {

        // request should include title , artist, song_id, image url, lyrics page url
        $.post(`${resource}/api/favorites`,song,(response) => {
            if (!response.success) {
                error(response.message)
            }
            else {
                console.log("Favoriting successful");;
                success(response)  
            }    
        })
    },

    // hit our api to remove a favorite
    // here, we only need song_id
    remove: ( song_id, error, success ) => { 
        
        // get request sends song_id to remove route at api
        $.get(`${resource}/api/remove/${song_id}`, (response) => {
          
            if (!response.success) {
                error(response.message)
            }
            else {
                console.log("Unfavorite successful");
                success(response.song)
            }
        })
    },

    getLyrics: ( song, error, success ) => {
        $.post(`${resource}/api/lyrics`, song, (response) => {
            if (response.error){
                error(response)
            }
            else {
                console.log("Lyrics fetch successful");
                success(response)
            }
        })
        },

    getAnnotations: ( note_id, error, success ) => {
        $.get(`${resource}/api/annotation/${ note_id }`, (response)=>{
            if (response.error){
                error(response)
            }
            else {
                console.log("Annotation search successful");
                success(response)
            }
            }) 
        }
}

export default ajax;