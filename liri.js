require("dotenv").config();


//Global Variables//
var inquirer = require("inquirer");
var keys = require("./keys");
var spotifyReq = require('node-spotify-api');
// var spotifyKeys = new Spotify(keys.spotify);
var axios = require("axios");
var action = process.argv[2];
var input = process.argv[3];

var bandInput = "";
var spotifyInput = "";
var movieInput = "";

// console.log(spotifyKeys);




//This starts the prompt//
function runProgram() {
    console.log("\n~~~~~~~~~~~~~~~~WELCOME TO LIRI!~~~~~~~~~~~~~~~~~~~")
    console.log("~~~~~~~~~~~~~~~TO START, TYPE IN~~~~~~~~~~~~~~" + "\n1. node liri.js concert-this" + "\n2. node liri.js spotify-this-song" + "\n3. node liri.js movie-this, or " + "'\n4. node liri.js do-what-it-says'")

};


var search = function () {
    //BandsInTown//

    if (action === "concert-this") {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What band do you want to search?",
            },
        ]).then(function (user) {
            bandInput = user.name;
            console.log(bandInput);
            var queryUrl = "https://rest.bandsintown.com/artists/" + bandInput + "/events?app_id=codingbootcamp";

            console.log(queryUrl);

            axios.get(queryUrl).then(
                function (response) {
                    console.log(response.data[0].venue);
                }
            );
        });



    }




    //Spotify//
    else if (action === "spotify-this-song") {
        inquirer.prompt([{
            name: "name",
            message: "What song would you like to search?",
        }]).then(function (user) {
            spotifyInput = user.name;
            console.log(spotifyInput);
            function song() {

                var spotify = new spotifyReq(keys.spotify);


                if (spotifyInput === "") {
                                        
                    spotify.search({
                        type: 'track',
                        query: "The Sign",
                        limit: 1
                    }, function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("\n~~~~~~~~~~~~~~~~" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].album.external_urls.spotify);
                        }

                    });



                }
                else {
                    spotify.search({
                        type: 'track',
                        query: spotifyInput,
                        limit: 1
                    }, function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("\n~~~~~~~~~~~~~~~~" + "\nArtist:" + data.tracks.items[0].album.artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nPreview Link: " + data.tracks.items[0].album.external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name);

                        }

                    });

                }

            }
            song();
        })

    }



    //Movie DB//
    else if (action === "movie-this") {
        inquirer.prompt([{
            name: "movie",
            message: "What movie would you like to search?"
        }]).then(function (user) {
            movieInput = user.name;
            console.log(movieInput);
            var queryUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy";

            console.log(queryUrl);

            axios.get(queryUrl).then(
                function (response) {
                    console.log("title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1] + "\nCountry of Origin: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
                }
            );
        })
    }
};



runProgram();
search();