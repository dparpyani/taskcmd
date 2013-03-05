#!/usr/bin/env node

/*
  taskcmd.js: A simple way to manage tasks in the command line.
*/

/* Global Variables */
// Path to the storage file
taskFile = '';
taskFileName = '.tasks.json';
cwd = process.cwd();
// Version number
version = '1.0.0';

var taskIO = require('./lib/taskIO');
var taskOperations = require('./lib/taskOperations');
var feedback = require('./lib/feedback');
var path = require('path');

taskFile = path.join(taskIO.findTaskFile(cwd), taskFileName);

var command = process.argv[2];
var parameters = process.argv.slice(3);

if (command) {
  command = command.toLowerCase();
} else {
  command = 'about';
}

var commandFound = false;
var aliases = require(path.join(__dirname, 'lib/aliases.json'));

// List tasks
// usage: list option [keyword]
if (aliases.list.indexOf(command) > -1) {
  commandFound = true;
  
  if (parameters.length <= 2) {
    taskOperations.list(parameters[0], parameters[1]);
  } else {
    feedback.error('Too many arguments provided.');
  }
}

// Add task
// usage: add description
if (aliases.add.indexOf(command) > -1) {
  commandFound = true;
  
  if (parameters.length == 1) {
    taskOperations.add(parameters[0]);
  } else {
    feedback.error('Invalid number of arguments provided.');
  }
}

// Complete task
// usage: complete id [note]
if (aliases.complete.indexOf(command) > -1) {
  commandFound = true;
  
  if (parameters.length <= 2) {
    taskOperations.complete(parameters[0], parameters[1]);
  } else {
    feedback.error('Invalid number of arguments provided.');
  }
}

// Remove tasks
// usage: remove option [keyword]
if (aliases.remove.indexOf(command) > -1) {
  commandFound = true;
  
  if (parameters.length <= 2) {
    taskOperations.remove(parameters[0], parameters[1]);
  } else {
    feedback.error('Too many arguments provided.');
  }
}

// Edit task
// usage: edit id option value
if (aliases.edit.indexOf(command) > -1) {
  commandFound = true;
  
  if (parameters.length == 3) {
    taskOperations.edit(parameters[0], parameters[1], parameters[2]);
  } else {
    feedback.error('Invalid number of arguments provided.');
  }
}

// Prioritize task
// usage: priority id value
if (aliases.priority.indexOf(command) > -1) {
  commandFound = true;
  
  if (parameters.length == 2) {
    taskOperations.edit(parameters[0], '-p', parameters[1]);
  } else {
    feedback.error('Invalid number of arguments provided.');
  }
}

// TaskCmd documentation
if (aliases.help.indexOf(command) > -1) {
  commandFound = true;
  feedback.help();
}

// About TaskCmd
if (aliases.about.indexOf(command) > -1) {
  commandFound = true;
  feedback.about();
}

// Init a new task list
if (aliases.init.indexOf(command) > -1) {
   commandFound = true;
   taskOperations.newList(".");
}

if (! commandFound) {
  feedback.error('Command not found.');
}
