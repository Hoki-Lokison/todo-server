const uuid = require( "uuid" );
var data = {
  todos: [
      {
          id: uuid.v4(),
          name: "Mow the lawn",
          completed: false,
          editing: false,
          createdOn: new Date(),
      },
      {
          id: uuid.v4(),
          name: "Clean the house",
          completed: true,
          editing: false,
          createdOn: new Date(),
      },
      {
          id: uuid.v4(),
          name: "Take dog on walk",
          completed: false,
          editing: false,
          createdOn: new Date(),
      },
  ],

};

module.exports = data;
