import './App.css';
import React, { Component } from 'react';

import MusicNote from "./assets/music-note.png"
class App extends Component {
  render() {
    return (
      <div className= "App">
        <header className="App-header">
          <h1>React Music Visualizer</h1>
          <img src={MusicNote} alt="Spotify Button" />
        </header>
      </div>
    );
  }
}

export default App;
