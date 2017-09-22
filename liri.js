var fs = require("fs");

var liriCommand = process.argv[3];

// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
if (liriCommand === "my-tweets") {
    var keys = require("./keys.js");


}

// node liri.js spotify-this-song '<song name here>'
if (liriCommand === "spotify-this-song") {
    // This will show the following information about the song in your terminal/bash window
    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from
    // If no song is provided then your program will default to "The Sign" by Ace of Base.

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: "7d18c66395e84a77b70de7708bb4d3e1",
        secret: "bb69571e30f4441387e936bfc09f927b"
    });

    spotify
        .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });
}

// node liri.js movie-this '<movie name here>'
if (liriCommand === "movie-this") {
    // This will output the following information to your terminal/bash window:
    //   * Title of the movie.
    //   * Year the movie came out.
    //   * IMDB Rating of the movie.
    //   * Rotten Tomatoes Rating of the movie.
    //   * Country where the movie was produced.
    //   * Language of the movie.
    //   * Plot of the movie.
    //   * Actors in the movie.
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    // The OMDB API requires an API key. You may use 40e9cece.

}


// node liri.js do-what-it-says
if (liriCommand === "do-what-it-says") {
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Feel free to change the text in that document to test out the feature for other commands.

    var doIt = require("./random.txt");
    console.log("doIt", doIt);
}

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.