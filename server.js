const express = require( "express" );
const cors = require( "cors" );


var server = express( );
var port = process.env.port || 3000;

//Data
var data = require("./data.js")

// Middleware
server.use( express.urlencoded( {
    extended: false
} ) );
server.use( cors( ) );
server.use (express.json());
server.use(function (req, res, next) {
  console.log(`New Request: ${req.method} ${req.path} on ${new Date()}`)
  next();
});

server.listen (port, function () {
  console.log(`listening on port ${port}`);
});

server.get("/todos", function (req, res) {
  var response = {
    todos: data.todos
  };
  res.json(response);
});
