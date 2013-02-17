/*
  taskline.js
*/

// Path to the storage file (global variable).
taskFile = __dirname + '/tasks.json';

var taskOperations = require('./lib/taskOperations');
var feedback = require('./lib/feedback');

var command = process.argv[2];
var parameters = process.argv.slice(3);

if (command == 'add') {
  taskOperations.add(parameters[0]);
}

if (command == 'list') taskOperations.list();
