import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

const data = [
  { start: 30, end: 150 },
  { start: 540, end: 600 },
  { start: 560, end: 620 },
  { start: 610, end: 670 }
];

ReactDOM.render(<App data={data} />, document.getElementById("root"));
