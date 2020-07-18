import React from "react";

export default function Loader(props) {
  for (let i = 0; i < 100000; i++) {
    if (i % 2 === 0) {
      return <p> . </p>;
    } else if (i % 3 === 0) {
      return <p> .</p>;
    } else {
      return <p>. </p>;
    }
  }
}
