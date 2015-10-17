
// Port on which app runs.
exports.PORT = 3000;



/* ALL other urls are relative to base url */
//Base url of app
exports.baseUrl = "http://localhost:"+exports.PORT;

//Url at which the 
exports.submitId_actionUrl = "/project";

//Keys of variables in db
exports.dbKey_idCount = "notepadLive:idCount";
exports.dbKey_projectId = function(id){ return "notepadLive:project:"+id;};



//Relative path from server file to index.jade
exports.PATH_TO_INDEX_TEMPLATE = "/public/index.jade";

//Relative path form server file to project.jade
exports.PATH_TO_PROJECT_TEMPLATE = "/public/project.jade";
