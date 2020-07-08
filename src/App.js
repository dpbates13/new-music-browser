import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./landingPage";
import Mainpage from "./Mainpage";

class App extends Component {
  state = {
    bearer: "",
    albumDatabase: [],
    artistDatabase: {},
    genreList: [],
    url: "https://api.spotify.com/v1/search?q=tag%3Anew&type=album&limit=50",
    loaded: 0,
  };
  getToken() {
    const data = { grant_type: "client_credentials" };
    return new Promise((resolve, reject) => {
      fetch(`https://accounts.spotify.com/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic NWYxNmE2ZjZjZTA2NDBmZTllNTVhNTQ5NTNiOGJlNzY6YWEzMmNhZTEzZjI3NGRjMGE1YWZlNWVmOTVmYWUzYmM=",
        },
        body: new URLSearchParams(data),
      })
        .then((res) => res.json())
        .then((res) => {
          let newBearer = "Bearer " + res.access_token;
          this.setState({ bearer: newBearer });
          console.log(this.state.bearer);
          resolve();
        });
    });
  }
  createAlbumDatabase(url) {
    return new Promise((resolve, reject) =>
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.state.bearer,
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            if (response.status === 404 || 401) {
              resolve(this.state.albumDatabase);
            } else {
              throw `${response.status}: ${response.statusText}`;
            }
          }
          const r = response.json();
          console.log(r);
          return r;
        })
        .then((responseJson) => {
          //let idCount = 0;
          for (let i = 0; i < responseJson.albums.items.length; i++) {
            if (responseJson.albums.items[i] != null) {
              this.setState({
                albumDatabase: [
                  ...this.state.albumDatabase,
                  responseJson.albums.items[i],
                ],
              });
            }
            /*if (responseJson.albums.items[i] == null) {
              let z = 0;
            } else {
              this.setState({
                albumDatabase: [
                  ...this.state.albumDatabase,
                  responseJson.albums.items[i],
                ],
              });
            }*/
          }
          //idCount++;
          if (
            responseJson.albums.next !==
            "https://api.spotify.com/v1/search?query=tag%3Anew&type=album&offset=2000&limit=50"
          ) {
            console.log(responseJson.albums.next);
            resolve(this.createAlbumDatabase(responseJson.albums.next));
          } else {
            resolve();
          }
        })
    );
  }
  createArtistStrings(data) {
    let strArr = [];
    let artStr = "";
    let count = 0;
    console.log(data[0].artists[0].id);
    for (let i = 0; i < data.length; i++) {
      for (const artist in data[i].artists) {
        if (count === 49) {
          artStr += `${data[i].artists[artist].id}`;
          strArr.push(artStr);
          artStr = "";
          count = 0;
        } else {
          artStr += `${data[i].artists[artist].id},`;
          count++;
        }
      }
    }
    console.log(strArr);
    return strArr;
  }
  getArtists(data, count = 0) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.spotify.com/v1/artists?ids=${data[count]}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.state.bearer,
        },
      })
        .then((response) => {
          const r = response.json();
          console.log(r);
          return r;
        })
        .then((response) => {
          for (let i = 0; i < response.artists.length; i++) {
            if (
              !this.state.artistDatabase.hasOwnProperty(
                `${response.artists[i].name}`
              )
            ) {
              this.setState((prevState) => {
                let artistDatabase = { ...prevState.artistDatabase };
                artistDatabase[`${response.artists[i].name}`] =
                  response.artists[i].genres;
                return { artistDatabase };
              });
            }
          }
          /*for (let i = 0; i < response.artists.length; i++) {
            if (
              this.state.artistDatabase.hasOwnProperty(
                `${response.artists[i].name}`
              )
            ) {
              let fdsjhf = 0;
            } else {
              this.setState((prevState) => {
                let artistDatabase = { ...prevState.artistDatabase };
                artistDatabase[`${response.artists[i].name}`] =
                  response.artists[i].genres;
                return { artistDatabase };
              });
            }
          }*/
          count++;
          if (count < data.length) {
            resolve(this.getArtists(data, count));
          } else {
            resolve();
          }
        });
    });
  }
  createGenreList() {
    for (const artist in this.state.artistDatabase) {
      for (let j = 0; j < this.state.artistDatabase[artist].length; j++) {
        if (
          this.state.genreList.includes(this.state.artistDatabase[artist][j]) ==
          false
        ) {
          this.setState({
            genreList: [
              ...this.state.genreList,
              this.state.artistDatabase[artist][j],
            ],
          });
        }
      }
    }
  }
  addGenreData() {
    console.log(this.state.albumDatabase);
    console.log(this.state.albumDatabase[0].artists[0].name);
    console.log(this.state.artistDatabase);
    for (let x = 0; x < this.state.albumDatabase.length; x++) {
      this.setState((prevState) => {
        let albumDatabase = { ...prevState.albumDatabase };
        albumDatabase[x].genres = [];
      });
    }
    for (let i = 0; i < this.state.albumDatabase.length; i++) {
      for (const artist in this.state.albumDatabase[i].artists) {
        this.setState((prevState) => {
          let albumDatabase = { ...prevState.albumDatabase };
          for (const genre in this.state.artistDatabase[
            this.state.albumDatabase[i].artists[artist].name
          ]) {
            albumDatabase[i].genres.push(
              this.state.artistDatabase[
                this.state.albumDatabase[i].artists[artist].name
              ][genre]
            );
          }
        });
      }
    }
  }
  openSite() {
    this.setState({ loaded: 1 });
  }
  async componentDidMount() {
    await this.getToken();
    console.log("yeah we goin");
    await this.createAlbumDatabase(this.state.url);
    console.log(this.state.albumDatabase);
    await this.getArtists(this.createArtistStrings(this.state.albumDatabase));
    this.addGenreData();
    this.createGenreList();
    this.openSite();
  }
  render() {
    return (
      <main>
        <Route
          path="/"
          exact
          component={() => <LandingPage loaded={this.state.loaded} />}
        />
        <Route
          path="/Main"
          render={() => (
            <Mainpage
              albumDatabase={this.state.albumDatabase}
              genreList={this.state.genreList}
            />
          )}
        />
      </main>
    );
  }
}

export default App;
