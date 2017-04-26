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
  apiKey: "AIzaSyA7xzwggPFVSKtCL7CF7RsiG2jyFiUEDYg",
  authDomain: "react-finance-app.firebaseapp.com",
  databaseURL: "https://react-finance-app.firebaseio.com",
  storageBucket: "react-finance-app.appspot.com",
  messagingSenderId: "113635739632"
};
firebase.initializeApp(config);

ReactDOM.render(<FinanceApp />, document.getElementById("app"));
