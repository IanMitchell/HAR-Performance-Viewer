/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router-component');
var Graph = require('./components/Graph.jsx');

var App = React.createClass({
  render: function() {
    return (
      <html>
        <head lang="en">
          <meta charSet="UTF-8" />
          <title>HAR Performance Viewer</title>
          <link rel="stylesheet" href="/stylesheets/style.css" />
        </head>
        <body>
          <header id="navbar">
            <div className="wrapper">
              <h1>HAR Performance Metrics</h1>
              <nav>
                <ul>
                  <li>
                    <a href="#" className="graph-link selected" data-graph-type="requests">Requests</a>
                  </li>
                  <li>
                    <a href="#" className="graph-link" data-graph-type="size">Size</a>
                  </li>
                  <li>
                    <a href="#" className="graph-link" data-graph-type="time">Time</a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <Graph />

          <script src="/scripts/react-0.12.2.min.js"></script>
          <script src="/socket.io/socket.io.js"></script>
          <script src="/scripts/socket.js"></script>
          <script src="/scripts/d3.min.js"></script>
          <script src="/scripts/graph.js"></script>
        </body>
      </html>
    );
  }
});

module.exports = App;
