"use strict";

/* ---- Contains frequently used functions ---- */

//Database interaction functions
exports.set_key = function(client,key,value,callback)
  {
    client.set([key,value],function(err,reply)
    {
      callback(err,reply);
    });
  };


exports.get_key = function(client,key,callback)
  {
    client.get( key , function(err, reply)
    {
      callback(err,reply);
    });
  }




