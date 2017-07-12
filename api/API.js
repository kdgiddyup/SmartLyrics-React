var axios= require("axios");

// this will change depending on environment
var resourceHost = "https://smartlyricsapi.herokuapp.com";

console.log("Using this api resource:",resourceHost);

module.exports = function(app) {

/*******************'
 user auth routes
*********************/
// Route to send user sign-up info to smartlyricsapi
  app.post("/api/signup", function(req, res) {
    console.log("sign-in object:",req.body);
    // req.body should include username and password
    if (!req.body.username || !req.body.password) {
        res.json({"success":false,"message":"You must include a username and a password"});
    }
    // send it to our smartlyrics api:
    else {
        axios.post(`${resourceHost}/api/signup`,req.body)
        .then(function(response){
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    })


    app.post("/api/login", function(req, res) {
        console.log("log in route, to:",resourceHost);
        axios.post(`${resourceHost}/api/login`,req.body).then(function(response){
            res.json(response.data);
        })
        .catch(function(error) {
            console.log(error)
        });
    });

/********************
  Mongoose handlers
*********************/

    // Route to save our favorited song to mongoDB via mongoose
    app.post("/favorites", function(req, res) {
    
    // req.body should include title , artist, song_id, image url, lyrics page url
    console.log("post favorites route, to:",`${resourceHost}/favorites`);
    
    // send it to our smartlyrics api:
    axios.post(`${resourceHost}/favorites`,req.body)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    })

    // Route to retrieve and show favorited articles
    app.get("/favorites/:user", function(req, res){
    
        // find favorites of currently logged-in user
        axios.get(`${resourceHost}/api/favorites/${req.params.user}`)
            .then(function(response){
                res.json(response.data)
            })
            .catch(function (error) {
                console.log(error);
        });
    });

    // Route to remove favorited article
    app.get("/remove/:id", function(req,res){
    axios.get(`${resourceHost}/api/remove/${req.params.id}`)
    .then(function(response){
        console.log("remove song raw response:",response.data);
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });
    })

/****************
Genius api handlers
******************/
// send search terms to my api, which are then sent off to Genius api
app.post("/search", function(req, res) {
    axios.post(`${resourceHost}/api/search`,req.body)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    });

 // search for annotations on lyrics panels
app.get("/annotation/:id", function(req, res) {
    axios.get(`${resourceHost}/api/annotation/${req.params.id}`)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    });

// scrape lyrics -- this is for DEMO only. Genius API prohibits scraping for lyrics in production apps
app.post("/lyrics", function(req, res) {
    axios.post(`${resourceHost}/api/lyrics`,req.body)
        .then(function(response){
            res.json(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    });

 /* GET Home Page */
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});
}; // end module export