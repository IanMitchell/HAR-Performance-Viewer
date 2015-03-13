/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router-component');

var Graph = React.createClass({
  render: function() {
    return (
      <div id="graph">
        <svg id="visualization" width="1000" height="500"></svg>
      </div>
    );
  }
});

module.exports = Graph;
