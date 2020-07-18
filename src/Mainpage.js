import React, { Component } from "react";
import GenreButton from "./GenreButton";
import AlbumItem from "./GenreItem";

class Mainpage extends Component {
  constructor(props) {
    super();
    this.input = React.createRef();
  }
  state = {
    selected: [],
    idsUsed: [],
  };
  addIds(id) {
    this.setState({ idsUsed: [...this.state.idsUsed, id] });
  }
  selectGenre(genreName) {
    let albumCount = 0;
    const re = new RegExp(genreName.replace("amp;", "").toLowerCase());
    let listFromGenreName = [];
    for (let i = 0; i < this.props.genreList.length; i++) {
      if (this.props.genreList[i].search(re) > -1) {
        listFromGenreName.push(this.props.genreList[i]);
      }
    }
    this.setState({ selected: listFromGenreName });
  }

  render() {
    const idsUsed = [];
    return (
      <div className="content">
        <h1>Please select a genre below</h1>
        <p className="instructions">
          This will display albums associated with that genre, sorted by
          subgenre
        </p>
        <ul id="top" className="keyGenres">
          <GenreButton
            link="#subGenres"
            genre="hip hop"
            selectGenre={() => this.selectGenre("hip hop")}
          />
          <GenreButton
            link="#subGenres"
            genre="r&b"
            selectGenre={() => this.selectGenre("r&b")}
          />
          <GenreButton
            link="#subGenres"
            genre="pop"
            selectGenre={() => this.selectGenre("pop")}
          />
          <GenreButton
            link="#subGenres"
            genre="dance"
            selectGenre={() => this.selectGenre("dance")}
          />
          <GenreButton
            link="#subGenres"
            genre="edm"
            selectGenre={() => this.selectGenre("edm")}
          />
          <GenreButton
            link="#subGenres"
            genre="electronic"
            selectGenre={() => this.selectGenre("electronic")}
          />
          <GenreButton
            link="#subGenres"
            genre="trap"
            selectGenre={() => this.selectGenre("trap")}
          />
          <GenreButton
            link="#subGenres"
            genre="rock"
            selectGenre={() => this.selectGenre("rock")}
          />
          <GenreButton
            link="#subGenres"
            genre="metal"
            selectGenre={() => this.selectGenre("metal")}
          />
          <GenreButton
            link="#subGenres"
            genre="punk"
            selectGenre={() => this.selectGenre("punk")}
          />
          <GenreButton
            link="#subGenres"
            genre="folk"
            selectGenre={() => this.selectGenre("folk")}
          />
          <GenreButton
            link="#subGenres"
            genre="country"
            selectGenre={() => this.selectGenre("country")}
          />
          <GenreButton
            link="#subGenres"
            genre="reggaeton"
            selectGenre={() => this.selectGenre("reggaeton")}
          />
          <GenreButton
            link="#subGenres"
            genre="latin"
            selectGenre={() => this.selectGenre("latin")}
          />
          <GenreButton
            link="#subGenres"
            genre="classical"
            selectGenre={() => this.selectGenre("classical")}
          />
          <GenreButton
            link="#subGenres"
            genre="alternative"
            selectGenre={() => this.selectGenre("alternative")}
          />
          <GenreButton
            link="#subGenres"
            genre="indie"
            selectGenre={() => this.selectGenre("indie")}
          />
        </ul>
        <p className="instructions">Or enter your own search term</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.selectGenre(this.input.current.value);
          }}
          className="keySearch"
        >
          <input
            id="text"
            type="text"
            ref={this.input}
            aria-label="Genre Search"
          ></input>
          <button type="submit" className="submit">
            Search Genres
          </button>
        </form>
        <div id="subGenres">
          <ul className="subGenres">
            {this.state.selected.map((genre) => (
              <GenreButton
                link="#showAlbums"
                key={genre}
                genre={genre}
                selectGenre={() => this.selectGenre(genre)}
              />
            ))}
          </ul>
        </div>
        <div id="showAlbums" className="showAlbums">
          {this.state.selected.map((genre) => (
            <div key={genre} className="genreDiv">
              <h1>{genre}</h1>
              <div className="albumElements">
                {this.props.albumDatabase.map((album) => {
                  if (
                    album.genres.includes(genre) &&
                    !idsUsed.includes(album.id)
                  ) {
                    idsUsed.push(album.id);
                    return <AlbumItem key={album.id} album={album} />;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
        <a href="#top" className="toTop">
          ^
        </a>
      </div>
    );
  }
}

export default Mainpage;
