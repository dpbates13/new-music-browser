import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./loader.gif";

class LandingPage extends Component {
  render() {
    if (this.props.loaded == 0) {
      return (
        <header className="loading" role="banner">
          <h2>Welcome to the Spotify New Music Browser</h2>
          <p>
            This website allows you to find albums released on Spotify that
            don't show up on Spotify's New Releases page. It also sorts them by
            genre, so that you don't have to waste time looking through music
            that doesn't interest you.
          </p>
          <p>Please wait while data is loaded from Spotify</p>
          <img src={logo} width="20px"></img>
        </header>
      );
    } else {
      return (
        <header className="loading" role="banner">
          <h2>Welcome to the Spotify New Music Browser</h2>
          <p>
            This website allows you to find albums released on Spotify that
            don't show up on Spotify's New Releases page. It also sorts them by
            genre, so that you don't have to waste time looking through music
            that doesn't interest you.
          </p>
          <Link to="/Main" className="genreButton">
            Enter Site
          </Link>
        </header>
      );
    }
  }
}

export default LandingPage;
