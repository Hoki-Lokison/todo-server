const express = require( "express" );
const cors = require( "cors" );
const uuid = require( "uuid" );


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

server.post("/todos", function (req, res) {
  if (req.body.name == undefined) {
    //They did not send a name for the new todo
    var response = {
      msg: "You need to send an item for the To do list in order to create an item."
    };
    res.status(400);
    res.json(response);
  } else if (req.body.name == "") {
    //Name was empty
    var response = {
      msg: "Please enter a name for the new todo."
    };
    res.status(400);
    res.json(response);
  } else {
    // add new todo to the list of todo
    var new_todo = {
      id: uuid.v4(),
      name: req.body.name,
      completed: false,
      editing: false,
      createdOn: new Date(),
    };
    data.todos.unshift( new_todo );
    res.status(201);
    res.json(response);
  };
});


server.put("/todos/:id", function (req, res) {
  var bad_request = false;
  if (req.body.name == undefined && req.body.completed == undefined) {
    bad_request = true;
  };
  if (req.body.name != undefined && req.body.name == "") {
    bad_request= true;
  };
  if (req.body.completed != undefined && typeof( req.body.completed) != "boolean") {
    bad_request= true;
  };
  if (bad_request) {
    var response = {
      msg: "Please endter a valid name."
    };
    res.status(400);
    res.json(response);
  } else {
    var found = data.todos.some( function (todo) {
      return todo.id = req.params.id;
    });
  };

    if (!found) {
      var response = {
        msg: `We could not find a todo with the id of ${req.params.id}`,
      };
      res.status(404);
      res.json(response);
    } else {
        data.todo.forEach( function (todo) {
          if (todo.id == req.params.id) {
            if (req.body.name != undefined) {
              todo.name = req.body.name;
            };
            if (req.body.completed != undefined) {
              todo.body.completed == req.body.completed;
            };
          };
        });
        res.status(404);
        res.json();
    };
  });
