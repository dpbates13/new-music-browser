import React, { Component } from "react";
import GenreButton from "./GenreButton";
//import GenreItem from "./GenreItem";
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
    const re = new RegExp(genreName.replace("amp;", ""));
    let listFromGenreName = [];
    for (let i = 0; i < this.props.genreList.length; i++) {
      if (this.props.genreList[i].search(re) > -1) {
        listFromGenreName.push(this.props.genreList[i]);
      }
    }
    this.setState({ selected: listFromGenreName });
  }
  /*selectGenre = (e) => {
    e.preventDefault();
    const genreKeyWord = e.target.name;
    console.log(e.target);
    console.log(genreKeyWord);
  };*/

  render() {
    const idsUsed = [];
    return (
      <div className="content">
        <h1>Please select a genre below</h1>
        <p className="instructions">
          This will display albums associated with that genre, sorted by
          subgenre
        </p>
        <ul className="keyGenres">
          <GenreButton
            genre="hip hop"
            selectGenre={() => this.selectGenre("hip hop")}
          />
          <GenreButton
            genre="r&b"
            selectGenre={() => this.selectGenre("r&b")}
          />
          <GenreButton
            genre="pop"
            selectGenre={() => this.selectGenre("pop")}
          />
          <GenreButton
            genre="dance"
            selectGenre={() => this.selectGenre("dance")}
          />
          <GenreButton
            genre="edm"
            selectGenre={() => this.selectGenre("edm")}
          />
          <GenreButton
            genre="electronic"
            selectGenre={() => this.selectGenre("electronic")}
          />
          <GenreButton
            genre="trap"
            selectGenre={() => this.selectGenre("trap")}
          />
          <GenreButton
            genre="rock"
            selectGenre={() => this.selectGenre("rock")}
          />
          <GenreButton
            genre="metal"
            selectGenre={() => this.selectGenre("metal")}
          />
          <GenreButton
            genre="punk"
            selectGenre={() => this.selectGenre("punk")}
          />
          <GenreButton
            genre="folk"
            selectGenre={() => this.selectGenre("folk")}
          />
          <GenreButton
            genre="country"
            selectGenre={() => this.selectGenre("country")}
          />
          <GenreButton
            genre="reggaeton"
            selectGenre={() => this.selectGenre("reggaeton")}
          />
          <GenreButton
            genre="latin"
            selectGenre={() => this.selectGenre("latin")}
          />
          <GenreButton
            genre="classical"
            selectGenre={() => this.selectGenre("classical")}
          />
          <GenreButton
            genre="alternative"
            selectGenre={() => this.selectGenre("alternative")}
          />
          <GenreButton
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
        <div /*className="subGenres"*/>
          <ul className="subGenres">
            {this.state.selected.map((genre) => (
              <GenreButton
                key={genre}
                genre={genre}
                selectGenre={() => this.selectGenre(genre)}
              />
            ))}
          </ul>
        </div>
        <div className="showAlbums">
          {this.state.selected.map((genre) => (
            <div className="genreDiv">
              <h1>{genre}</h1>
              <div className="albumElements">
                {this.props.albumDatabase.map((album) => {
                  if (
                    album.genres.includes(genre) &&
                    !idsUsed.includes(album.id)
                  ) {
                    idsUsed.push(album.id);
                    //console.log(!this.state.idsUsed.includes(album.id));
                    return (
                      <AlbumItem
                        //addId={() => this.addIds(album.id)}
                        album={album}
                      />
                    );
                  }
                })}
              </div>
            </div>

            //console.log("component is going");
            /*<GenreItem
                key={genre}
                genre={genre}
                idsUsed={this.state.idsUsed}
                albumDatabase={this.props.albumDatabase}
                genreList={this.props.genreList}
            />*/
          ))}
        </div>
      </div>
    );
  }
}

export default Mainpage;
