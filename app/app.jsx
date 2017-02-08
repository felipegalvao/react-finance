var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import FinanceApp from 'FinanceApp'

// Load foundation
$(document).foundation();

// Load app.css
require('style!css!sass!applicationStyles');


ReactDOM.render(
  <FinanceApp/>,
  document.getElementById('app')
);
