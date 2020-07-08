import React from "react";

export default function GenreButton(props) {
  return (
    <button
      name={props.genre}
      type="button"
      onClick={props.selectGenre}
      className="genreButton"
    >
      {props.genre}
    </button>
  );
}
