import $ from "jquery";

const resource = "https://smartlyricsapi.herokuapp.com";

const ajax = {
    
    signup: (userInfo,error,success) =>  {
         $.post(`${resource}/api/signup`,userInfo, (response)=>{
            if (!response.success) {
                error(response.message)
            }
            else {
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
                success(response)
                }
            })
        },

    search: (input,error,success) =>{
        console.log("Attempting search on ",input);
        $.post(`${resource}/api/search`,input,(response) => {
            if(response.length===0) {
                error("Sorry, there was a problem, or no results.")
            }
            else {
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
                console.log(response);
                success(response)  
            }    
        })
    },

    // hit our api to remove a favorite
    // here, we only need song_id
    remove: ( song_id, error, success ) => { 
        console.log("attempting to remove:",song_id);
        // get request sends song_id to remove route at api
        $.get(`${resource}/api/remove/${song_id}`, (response) => {
            console.log("remove response:",response);
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response.song)
            }
        })
    },

    getLyrics: ( song, error, success ) => {
        console.log(`Fetching lyrics for #${song.song_id}`);

        $.post(`${resource}/api/lyrics`, song, (response) => {
            console.log("lyrics fetch response:",response);
            if (response.error){
                console.log("error getting lyrics",response.error);
                error(response)
            }
            else {
                success(response)
            }
        })
        },

    getAnnotations: ( note_id, error, success ) => {
        console.log(`Fetching lyrics for #${note_id}`);

        $.get(`${resource}/api/annotation/${ note_id }`, (response)=>{
            if (response.error){
                console.log("error getting annotations");
                error(response)
            }
            else {
                success(response)
            }
            }) 
        }
}

export default ajax;