import React from "react";

export default function GenreButton(props) {
  return (
    <a href={props.link}>
      <button
        name={props.genre}
        type="button"
        onClick={props.selectGenre}
        className="genreButton"
      >
        {props.genre}
      </button>
    </a>
  );
}
