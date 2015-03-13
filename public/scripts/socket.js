window.onload = function() {
  var socket = io(),
      elements = document.getElementsByClassName('graph-link'),
      graphData,
      graphType;

  function toggleGraph() {
    socket.emit('graph-change-request', this.getAttribute('data-graph-type'));
  }

  function getLabel() {
    switch(graphType) {
      case 'requests':
        return 'Requests';
        break;
      case 'size':
        return 'Size (bytes)';
        break;
      case 'time':
        return 'Time (ms)';
        break;
      default:
        return 'Unknown';
        break;
    }
  }

  // paintGraph is destructive; need to send a copy.
  function copyGraphData(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function repaintGraph() {
    console.log("Painting Graph: " + graphType);
    console.log(graphData[graphType]);
    paintGraph(copyGraphData(graphData[graphType]), getLabel());
  }

  function toggleNavigation(type) {
    console.log('Toggling navigation to ' + type);

    var selected = document.getElementsByClassName("selected")[0];
    selected.classList.remove('selected');

    var el = document.querySelector('[data-graph-type=' + type + ']');
    el.className += ' selected';
  }

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', toggleGraph, false);
  }

  socket.on('graph-change', function(type) {
    console.log('Graph change request received');

    if (graphType != type) {
      graphType = type;
      toggleNavigation(graphType);

      if (graphData !== undefined) {
        repaintGraph();
      }
    }
  });

  socket.on('data-change', function(data) {
    console.log('Data Change...');
    graphData = data;
    console.log(data);
    repaintGraph();
    console.log('Done');
  });

  window.addEventListener('resize', repaintGraph);
}
