import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./landingPage";
import Mainpage from "./Mainpage";

class App extends Component {
  state = {
    albumDatabase: [],
    genreList: [],
    loaded: 0,
  };

  getData() {
    return new Promise((resolve, reject) => {
      fetch("https://radiant-tundra-53106.herokuapp.com/data", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            albumDatabase: res.albumDatabase,
            genreList: res.genreList,
          });
          resolve();
        });
    });
  }

  openSite() {
    this.setState({ loaded: 1 });
  }
  async componentDidMount() {
    await this.getData();
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
