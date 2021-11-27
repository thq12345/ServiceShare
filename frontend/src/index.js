import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
require("dotenv").config();

const APIlink =
  "https://maps.googleapis.com/maps/api/js?key=" +
  process.env.GOOGLE_MAP_API +
  "&libraries=places";

//DO NOT CHANGE ANYTHING IN THIS FILE!!!!!!
ReactDOM.render(
  <React.StrictMode>
    <script src={APIlink}></script>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
