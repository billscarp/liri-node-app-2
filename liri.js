var fs = require("fs");
var searchTerm = "";

var liriCommand = (process.argv[2]);
// console.log(liriCommand);

if (process.argv.length > 3) {
    for (let i = 3; i < process.argv.length; i++) {
        searchTerm += (process.argv[i] + "+");
    }
}

// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
if (liriCommand === "my-tweets") {
    var Twitter = require('twitter');
    var keys = require("./keys.js");
    var client = new Twitter(keys);

    var params = {
        screen_name: 'LiriTweets1',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, data) {
        if (error) throw error;

        for (i = 0; i < data.length; i++) {
            console.log(data[i].text);
        }
    });
}

// node liri.js spotify-this-song '<song name here>'
if (liriCommand === "spotify-this-song") {
    // This will show the following information about the song in your terminal/bash window
    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from
    // If no song is provided then your program will default to "The Sign" by Ace of Base.


    if (searchTerm == "") {
        var songSearch = "The Sign artist:Ace of Base";
    } else {
        var songSearch = '"'+searchTerm+'"';
    }

    var SpotifyWebApi = require('spotify-web-api-node');

    var spotifyApi = new SpotifyWebApi({
        clientId: '7d18c66395e84a77b70de7708bb4d3e1',
        clientSecret: 'bb69571e30f4441387e936bfc09f927b',
    });

    // Retrieve an access token
    spotifyApi.clientCredentialsGrant()
        .then(function (data) {
            // console.log('The access token expires in ' + data.body['expires_in']);
            // console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);

            // search tracks with song name in title
            spotifyApi.searchTracks('track:' + songSearch, { limit: 1 })
                .then(function (response) {
                    // var songInfo = response.body.tracks.items;
                    var songInfo = response.body.tracks.items[0];
                    // console.log(songInfo);
                    console.log("Artist:",songInfo.album.artists[0].name);
                    console.log("Song:",songInfo.name);
                    console.log("Preview link:",songInfo.preview_url);
                    console.log("Album:",songInfo.album.name);
                }, function (err) {
                    console.log('Something went wrong!', err);
                });
        }, function (err) {
            console.log('Something went wrong when retrieving an access token', err.message);
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