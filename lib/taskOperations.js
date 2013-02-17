/*
  taskOperations.js: Contains operations related to managing tasks.
*/

var taskIO = require('./taskIO');
var feedback = require('./feedback');
var helpers = require('./helpers');

// Lists all existing tasks.
module.exports.list = function () {
  var tasks = taskIO.getTasks();
  
  for (var i = 0; i < tasks.length; i++) {
    feedback.printTask(tasks[i]);
  }
};

// Adds a new task.
module.exports.add = function (taskDescription) {
  var tasks = taskIO.getTasks();
  
  var previousId = 0;
  if (tasks.length > 1) {
    previousId = tasks[tasks.length - 1].id;
  }
  
  var task = {
    id: previousId + 1,
    priority: 0,
    description: taskDescription,
    isCompleted: false,
    completionNote: "",
    createdAt: helpers.formatDate(new Date()),
    completedAt: null
  };
  
  tasks.push(task);
  taskIO.saveTasks(tasks);
};

// Removes an existing task.
module.exports.remove = function () {
  
};

// Help messages.
module.exports.help = function () {
  
};
