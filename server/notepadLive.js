"use strict";

//Gets the value of key idCount from database
exports.get_idCount = function(utils,conf,client,callback)
{
  utils.get_key(client,conf.dbKey_idCount,function(err,reply)
  {
    if(err)
    {
      callback(err);
    }
    else
    {
      if(reply == null)
      {
        console.log('Key not present, intialising it to 0');
        exports.set_idCount(utils,conf,client,0,callback);
      }
      else
      {
        console.log('get_key: '+ conf.dbKey_idCount,'Reply: '+reply);
        callback(err,reply);
      }
    }
  });
}


//Sets the value of key idCount in database
exports.set_idCount = function(utils,conf,client,id_count,callback)
{
  utils.set_key(client,conf.dbKey_idCount,id_count,function(err,reply)
  {
    if(err)
    {
      callback(err,reply);
    }
    else
    {
      console.log("Id count modified to: "+id_count);
      callback(err,id_count);
    }
  });
}

