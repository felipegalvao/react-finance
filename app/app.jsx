import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, IndexRoute, hashHistory } from "react-router";
import FinanceApp from "FinanceApp";

// Load foundation
$(document).foundation();

// Load app.css
require("style!css!sass!applicationStyles");

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAKEywpI6iUUOlunjGbHyU8vZU0f3QRu3s",
  authDomain: "okane-money-app.firebaseapp.com",
  databaseURL: "https://okane-money-app.firebaseio.com",
  projectId: "okane-money-app",
  storageBucket: "",
  messagingSenderId: "165886039147"
};
firebase.initializeApp(config);

ReactDOM.render(<FinanceApp />, document.getElementById("app"));
