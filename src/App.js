import './App.css';
import React, { Component } from 'react';

import MusicNote from "./assets/music-note.png";
import VisualizerPlaceholder from "./assets/visualizer-placeholder.png";
import TB from "./assets/tb-placeholder.png";
import 'fontsource-roboto';

const SongTitle = "No Song Selected"
const ArtistTitle = "No Artist"

class App extends Component {
  render() {
    return (
      <div className= "App">
        <header className="App-header">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
          <h1>React Music Visualizer</h1>
          <img src={MusicNote} alt="Spotify Note" />
        </header>
        <div className="Sub-header">
          <h1>{SongTitle}</h1>
          <h2>{ArtistTitle}</h2>
        </div>
        <div className= "Main-panel">
          <div className= "Button-column">
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
      </div>
    );
  }
}

export default App;
