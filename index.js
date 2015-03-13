var express  = require('express'),
    url      = require('url'),
    chokidar = require('chokidar');

require('babel/register');
require('node-jsx').install({extension: '.jsx'});

var ReactAsync = require('react-async'),
    App        = require('./react/App.jsx');

var app  = express(),
    port = process.env.PORT || 8000,
    io   = require('socket.io').listen(app.listen(port)),
    clients = [];

var Parser = require('./lib/har_parser.js').Parser;
var parser = new Parser();

var watcher = chokidar.watch('./har/', {
  ignoreInitial: true,
  ignored: /[\/\\]\./,
  persistent: true
});

var graph = 'requests';

app.use(express.static(__dirname + '/public'));



app.get('*', function(request, response) {
  var path = url.parse(request.url).pathname;
  ReactAsync.renderComponentToStringWithAsyncState(App({path: path}), function(error, markup) {
    response.send('<!DOCTYPE html>' + markup);
  });
});

// // TODO: Implement Mobile Controls for GraphType, Page, and ViewGraph
// app.get('/', function(request, response) {
//
// });
//
// // TODO: Display Graph
// app.get('/graph', function(request, response) {
//
// })



io.on('connection', function(socket) {
  console.info('New client connected (id: ' + socket.id + ')');
  clients.push(socket)

  socket.emit('graph-change', graph);
  socket.emit('data-change', {
    requests: parser.requestData,
    size: parser.byteSizeData,
    time: parser.timeData
  });

  socket.on('graph-change-request', function(type) {
    console.info('Graph Change Request recieved');
    graph = type;
    io.emit('graph-change', graph);
  });

  socket.on('disconnect', function(){
    var index = clients.indexOf(socket);
    if (index != -1) {
        clients.splice(index, 1);
        console.info('Client disconnected (id: ' + socket.id + ')');
    }
  });
});


function dataChange() {
  console.info('Data Change Firing');
  io.emit('data-change', {
    requestData: parser.requestData,
    byteSizeData: parser.byteSizeData,
    timeData: parser.timeData
  });
}

var debug = require('debug')('react-starter');
var server = app.listen(app.get('port'), function() {
  console.info('Express server listening on port ' + server.address().port);

  parser.parseAllPages();

  watcher.on('add', function(path) {
    console.info('Watcher has detected a new file');
    parser.parseAllPages();
    dataChange();
  });
});
