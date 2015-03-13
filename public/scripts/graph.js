function getAbsoluteHeight(el) {
  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

function getWidth() {
  return window.innerWidth;
}

function getHeight() {
  var navHeight = getAbsoluteHeight(document.getElementById('navbar'));
  return window.innerHeight - navHeight;
}

function paintGraph(data, label) {
  console.log('Graph receiving data:');
  console.log(data);
  console.log('Clearing SVG');
  d3.select('#visualization').selectAll("*").remove();

  console.log('Beginning paint');

  var margin = {
    top: 40,
    right: 80,
    bottom: 40,
    left: 80
  };

  var width = getWidth() - margin.left - margin.right,
      height = getHeight() - margin.top - margin.bottom;

  var parseDate = d3.time.format("%m-%d-%Y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(data['homepage'].length - 1)
      .tickSubdivide(0)
      .tickFormat(d3.time.format("%m-%d"));;

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  // TODO
  var line = d3.svg.line()
      .interpolate("linear")
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.total); });

  var svg = d3.select("#visualization")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  console.log('Initial setup complete...');

  color.domain(d3.keys(data['homepage'][0]).filter(function(key) {
    return key !== "date";
  }));

  console.log('Colors set...');
  console.log(color.domain());

  data['homepage'].forEach(function(d) {
    d.date = parseDate(d.date);
  });

  console.log('Dates set...');
  console.log(data);

  var requests = color.domain().map(function(name) {
    return {
      name: name,
      values: data['homepage'].map(function(d) {
        return {
          date: d.date,
          total: d[name]['total'],
        };
      })
    };
  });

  console.log('Requests set...');
  console.log(requests);

  x.domain(d3.extent(data['homepage'], function(d) {
    return d.date;
  }));

  console.log('X Axis set...');

  y.domain([
    d3.min(requests, function(c) {
      return d3.min(c.values, function(v) {
        return 0;
      });
    }),
    d3.max(requests, function(c) {
      return d3.max(c.values, function(v) {
        return v.total;
      });
    })
  ]);

  console.log('Y Axis set... Label: ' + label);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", -30)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .text(label);

  var request = svg.selectAll(".request")
      .data(requests)
      .enter().append("g")
      .attr("class", "request");

  request.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  request.append("text")
      .datum(function(d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.total) + ")";
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });


  console.log('Fin');
}
