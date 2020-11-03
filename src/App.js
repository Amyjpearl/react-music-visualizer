/* eslint-disable no-template-curly-in-string */
import './App.css';
import React, { Component } from 'react';

import MusicNote from "./assets/music-note.png";
import VisualizerPlaceholder from "./assets/visualizer-placeholder.png";
import TB from "./assets/tb-placeholder.png";
import Volume from  "./assets/volume-placeholder.png";
import Pause from "./assets/pause.png";
import Play from "./assets/play.png";
import Stop from "./assets/stop.png";

import 'fontsource-roboto';
import SpotifyWebApi from 'spotify-web-api-js';

const SpotifyId = "f9420ee2fb79467287adf5898d77ba05";
const SpotifySecret = "dc2980fa63e34684b0303e6174ee0568";

var spotifyApi = new SpotifyWebApi();
var request = require('request'); // "Request" library

class App extends Component {
  constructor(props){
    super();
    this.state = {
      Authenticated: false,
      trackCollection: null,
      SongTitle: "No Song Selected",
      ArtistTitle: "No Artist",
    }
  }

  render() {
    if (!this.state.Authenticated)
    {
      this.AuthenticateSpotify();
    }
    return (
      <div className="App">
        <header className="App-header">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
          <h1>React Music Visualizer</h1>
          <img src={MusicNote} alt="Spotify Note" />
        </header>
        <div className="Sub-header">
          <h1>{this.state.SongTitle}</h1>
          <h2>{this.state.ArtistTitle}</h2>
        </div>
        <div className="Main-panel">
          <div className="Button-column">
            <button>
              Spheres
            </button>
            <button>
              Bars
            </button>
            <button>
              Equalizer
            </button>
          </div>
          <div className="Visualizer">
            <img src={VisualizerPlaceholder} alt="Visualizer"/>
          </div>
          <div className="Equalizer">
            <img src={TB} alt="Treble"/>
          </div>
        </div>
        <div className="Volume-panel">
          <div className="Volume">
            <img src={Volume} alt="Volume Control" />
          </div>
          <div className="Control-holder">
            <img src ={Pause} alt="Pause" />
            <img src ={Play} alt="Play" onClick={() => this.PlayClicked()} />
            <img src ={Stop} alt="Stop" />
          </div>
        </div>
        {/*
          Debug Section REMOVE in production
        */}
        <div className="debug">
          access_token: {this.state.accessToken ?? "Not Authenticated"}<br/>
          tracks: {this.GetTracks()}<br/>
          song play: {this.state.song}
        </div>
      </div>
    );
  }

  AuthenticateSpotify() {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(SpotifyId + ':' + SpotifySecret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        this.setState({ accessToken: body.access_token, Authenticated: true });
        spotifyApi.setAccessToken(this.state.accessToken);
        spotifyApi.searchTracks('Alan Parsons').then(function(data) {
          this.setState({trackCollection: data});
        }.bind(this));
      }
    });
  }

  GetTracks() {
    if (this.state.trackCollection == null)
      return "No Tracks found";
    console.log(this.state.trackCollection.tracks.items);
    return this.state.trackCollection.tracks.items.length;
  }

  PlayClicked() {
    if (this.state.trackCollection != null) {
      var tracks = this.state.trackCollection.tracks.items;
      if (tracks.length > 0) {
        var track = tracks[0];
        var artist = track.artists[track.artists.length - 1];
        this.setState({ SongTitle: track.name, ArtistTitle: artist.name });
        this.setState({ song: track.href + "&Authorization: Bearer " + this.state.accessToken });
        spotifyApi.play();
      };
    }
  }
}

export default App;
