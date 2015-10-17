"use strict";
// Importing modules used. 
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var redis = require('redis');
var client = redis.createClient();

//Configuring view engine as jade
app.set('view engine', 'jade');

//Importing files used
var conf  = require('./server/conf.js');
var utils = require('./server/utils.js');
var notepadLive = require('./server/notepadLive.js');

//Running server on localhost:PORT
server.listen(conf.PORT);
console.log('Server running on '+conf.PORT);


//Serving index.html on localhost:PORT/ url
app.get('/', function (req, res) 
{
  var path_to_index = path.join(__dirname + conf.PATH_TO_INDEX_TEMPLATE);  
  notepadLive.get_idCount(utils,conf,client,function(err,idCount)
  {
    if(err)
    {
      console.log('ERROR: '+err);
      res.send('ERROR');
      //error function
    }
    else
    {
      var options = {};
      options.idCount = idCount;
      options.PORT = conf.PORT;
      options.baseUrl = conf.baseUrl;
      options.submitId_actionUrl = conf.submitId_actionUrl;
      options.newId = Number(idCount)+1;
      res.render(path_to_index,options);
    }
  });
});


//Gets id as a get parameter, and returns the corresponding textarea
app.get(conf.submitId_actionUrl,function(req,res)
{
  if(!req.query.id)
  {
    res.send("Error.");
  }
  else
  {
    notepadLive.get_idCount(utils,conf,client,function(err,idCount)
    {
      if(err)
        console.log("Error: "+err);
      else
      {
        var path_to_project = path.join(__dirname+conf.PATH_TO_PROJECT_TEMPLATE)
        var id = req.query.id;
        if(id>idCount)
          notepadLive.set_idCount(utils,conf,client,id,function(err)
          {
            if(err) console.log("Error: "+err);
         });
        var options = {
          id : id,
          baseUrl : conf.baseUrl,
        };
        notepadLive.fetch_projectValue(utils,conf,client,id,function(err,value)
        {
          if(err)
            console.log("ERROR: "+err);
          else
          {
            options.value = value;
            res.render(path_to_project,options);
          }
        });
      }
    });
  }
});




//Creating a constant live connection 
io.on('connection', function (socket) 
{

  //Listening to event update_textarea, which recieves value of a textarea with given id when it is updated and updates it in db.
  socket.on('update_project',function(id,value)
  {
    console.log("Updating project with id: "+id+" with value: \n"+value+"\n");
    utils.set_key(client,conf.dbKey_projectId(id),value,function(err,reply)
    {
      if(err)
      {
        console.log("ERROR: "+err);
      }
    });
  });
});

