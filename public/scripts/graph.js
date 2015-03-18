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

function getMaxPointY(data) {
  console.log("Calculating max Y point");
  var max = 0;

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].values.length; j++) {
      if (data[i].values[j].y > max) {
        max = data[i].values[j].y;
      }
    }
  }

  console.log("Max: " + max);

  return max;
}

function formatData(data) {
  console.log("Beginning to format data...");

  var parseDate = d3.time.format("%m-%d-%Y").parse;
  var formatted = [];

  var values = [];

  var keyColors = [
    { key: 'Internal CSS',    color: '#2ECC40' },
    { key: 'Internal HTML',   color: '#0074D9' },
    { key: 'Internal Image',  color: '#FF4136' },
    { key: 'Internal Script', color: '#B10DC9' },
    { key: 'Internal Other',  color: '#FFDC00' },
    { key: 'Internal Total',  color: '#111111' },

    { key: 'External CSS',    color: '#3D9970' },
    { key: 'External HTML',   color: '#7FDBFF' },
    { key: 'External Image',  color: '#85144b' },
    { key: 'External Script', color: '#F012BE' },
    { key: 'External Other',  color: '#FF851B' },
    { key: 'External Total',  color: '#AAAAAA' }
  ];

  for (var i = 0; i < keyColors.length; i++) {
    if (values[i] === undefined) {
      values[i] = [];
    }

    for (var j = 0; j < data['homepage'].length; j++) {
      var location = keyColors[i].key.split(' ')[0].toLowerCase();
      var type = keyColors[i].key.split(' ')[1].toLowerCase();

      values[i].push({
        x: j, // parseDate(data['homepage'][j]['date']),
        y: data['homepage'][j][location][type]
      });
    }
  }

  for (var k = 0; k < keyColors.length; k++) {
    formatted.push({
      values: values[k],
      key: keyColors[k].key,
      color: keyColors[k].color
    });
  }

  console.log("Formatted Data:");
  console.log(formatted);
  return formatted;
}

function paintGraph(data, label) {
  var margin = {
    top: 80,
    right: 80,
    bottom: 80,
    left: 80
  };

  var formattedData = formatData(data);

  var width = getWidth() - margin.left - margin.right,
      height = getHeight() - margin.top - margin.bottom;

  console.log('Calculated margin, width, and height values');

  d3.select('#chart').selectAll("*").remove();

  console.log("Reset SVG.");
  console.log("Formatting NV Chart...");

  nv.addGraph(function() {
    var chart = nv.models.lineChart()
      .margin(margin)
      .useInteractiveGuideline(true)
      .showLegend(true)
      .forceY([0, Math.round(getMaxPointY(formattedData) * 1.1)])
      .showYAxis(true)
      .showXAxis(true);

    console.log("Created Chart obj");

    chart.xAxis
      .axisLabel('Date')
      .tickFormat(function(d) {
        return d3.time.format('%m/%d')(new Date(data['homepage'][d]['date']))
      });

    console.log("Created xAxis");

    chart.yAxis
      .axisLabel(label);

    console.log("Created yAxis");

    d3.select('#chart')
      .datum(formattedData)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(chart);

    console.log("Created D3 Object");

    return chart;
  });
}
