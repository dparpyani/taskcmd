/*
  taskline.js: A simple way to manage tasks in the command line.
*/

// Path to the storage file (global variable).
taskFile = __dirname + '/tasks.json';

var taskOperations = require('./lib/taskOperations');
var feedback = require('./lib/feedback');

var command = process.argv[2];
var parameters = process.argv.slice(3);

var aliases = require(__dirname + '/lib/aliases.json');

// List tasks
if (aliases.list.indexOf(command) > -1) {
  if (parameters.length <= 2) {
    taskOperations.list(parameters[0], parameters[1]);
  } else {
    feedback.error('Too many arguments provided.');
  }
}

// Add task
if (aliases.add.indexOf(command) > -1) {
  if (parameters.length == 1) {
    taskOperations.add(parameters[0]);
  } else {
    feedback.error('Invalid number of arguments provided.');
  }
}

// Complete task
if (aliases.complete.indexOf(command) > -1) {
  if (parameters.length <= 2) {
    taskOperations.complete(parameters[0], parameters[1]);
  } else {
    feedback.error('Invalid number of arguments provided.');
  }
}

// Remove tasks
if (aliases.remove.indexOf(command) > -1) {
  if (parameters.length <= 2) {
    taskOperations.remove(parameters[0], parameters[1]);
  } else {
    feedback.error('Too many arguments provided.');
  }
}

// Provide help on how to use taskline
if (aliases.help.indexOf(command) > -1) {
  taskOperations.help(parameters[0]);
}

// About Taskline.
if (aliases.about.indexOf(command) > -1) {
  taskOperations.about(parameters);
}
