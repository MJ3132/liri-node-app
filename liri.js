require("dotenv").config();


var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

const request = require('request');

let fs = require('fs');

var getmyTweets = function () {
    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: 'Martin J' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            // go through all the tweets and get the created at and tweet text parameters in the tweets object

            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });
}

var getArtistNames = function (artist) {
    return artist.name;
}

var getMeSpotify = function (songName) {
    var customer = new Spotify(keys.spotifyKeys);

    customer.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        console.log(songs);

        for (var j = 0; j < songs.length; j++) {
            console.log(j);

            console.log('Artists(s):' + songs[j].artists.map(getArtistNames));
            console.log(' ');
            console.log('Song Name:' + songs[j].name);
            console.log(' ');
            console.log('preview url:' + songs[j].preview_url);
            console.log(' ');
            console.log('Album:' + songs[j].album.name);
            console.log('__________________________');
        }

    });
}


var getMovie = function (movieName) {
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieName + '&y=&plot=short&r=json', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        var jsonData = JSON.parse(body);

        console.log("Title: " + jsonData.Title);
        console.log("Year: " + jsonData.Year);
        console.log("imbRating: " + jsonData.imdbRating);
        console.log("Wrotten Tomato Ratings: " + jsonData.tomatoRating);
        console.log("Country: " + jsonData.Country);
        console.log("language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);


    });
}

var doWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
    

        var dataArr = data.split(',');

        console.log(dataArr);

        if (dataArr == 2) {    
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }
        console.log(dataArr);
    
    });
}

var pick = function (caseData, functionData) {

    switch (caseData) {
        case 'my-tweets':
            getmyTweets();
            break

        case 'spotify-this-song':
            getMeSpotify(functionData);
            break

        case 'movie-this':
            getMovie(functionData);
            break

        case 'do-what-it-says':
            doWhatItSays();
            break
        default:
            console.log('Liri does not know how to do that');

    }
}


var runThis = function (argOne, argtwo) {
    pick(argOne, argtwo);
}


runThis(process.argv[2], process.argv[3]);