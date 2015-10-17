"use strict";
// Importing modules used. 
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

//Importing files used
var conf = require('./server/conf.js');


//Running server on localhost:PORT
server.listen(conf.PORT);
console.log('Server running on '+conf.PORT);


//Serving index.html on localhost:PORT/ url
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + conf.PATH_TO_INDEX_FILE));
});


//On connection 
io.on('connection', function (socket) {
  socket.emit('abc', { developer: 'Karan Bedi' });
});

