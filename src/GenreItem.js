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
        {/*<h1>{this.props.genre}</h1>
        <ul>
          {this.props.albumDatabase.map((album) => {
            if (album.genres.includes(this.props.genre)) {
              return <h3>{album.name}</h3>;
            }
          })}
        </ul>*/}
      </div>
    );
  }
}

export default AlbumItem;
