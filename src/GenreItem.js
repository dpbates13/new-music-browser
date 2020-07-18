import React, { Component } from "react";

class AlbumItem extends Component {
  render() {
    return (
      <div className="albumElement">
        <img
          src={this.props.album.images[0].url}
          alt={`${this.props.album.name} by ${this.props.album.artists[0].name}`}
        ></img>
        <a className="album" href={this.props.album.uri}>
          {this.props.album.name}
        </a>
        <p className="artist">{this.props.album.artists[0].name}</p>
      </div>
    );
  }
}

export default AlbumItem;
