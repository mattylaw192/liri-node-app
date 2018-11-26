console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};


var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this": 
  concert();
  break;

  case "spotify-this-song":
  song();
  break;

  case "movie-this":
  movie();
  break;

  case "do-what-it-says":
  four();
  break;
  
}





function concert(){

};

function song (){

};

function movie (){

};

function four(){

};