const express = require( "express" );
const cors = require( "cors" );

var server = express( );
var port = 8080;

//Data
var data = require("./data.js")

// Middleware
server.use( express.urlencoded( {
    extended: false
} ) );
server.use( cors( ) );
server.use (express.json());

server.listen (port, function () {
  console.log(`listening on port ${port}`);
});
