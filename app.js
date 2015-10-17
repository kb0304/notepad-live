"use strict";
// Importing modules used. 
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
//var jade  = require('jade');

//Configuring view engine as jade
app.set('view engine', 'jade');

//Importing files used
var conf = require('./server/conf.js');


//Running server on localhost:PORT
server.listen(conf.PORT);
console.log('Server running on '+conf.PORT);


//Serving index.html on localhost:PORT/ url
app.get('/', function (req, res) 
{
  var path_to_index = path.join(__dirname + conf.PATH_TO_INDEX_FILE);
  var options =
    {
      PORT : conf.PORT,
      baseUrl : conf.BASE_URL,
    };
  res.render(path_to_index,options);
});


//On connection 
io.on('connection', function (socket) {
  socket.emit('abc', { developer: 'Karan Bedi' });
});

