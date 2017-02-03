var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');

// Load foundation
$(document).foundation();

// Load app.css
require('style!css!sass!applicationStyles');


ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);
