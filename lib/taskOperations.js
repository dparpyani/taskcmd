/*
  taskOperations.js: Contains operations related to managing tasks.
*/

var taskIO = require('./taskIO');
var feedback = require('./feedback');
var helpers = require('./helpers');

// Lists all tasks filtered using provided option.
module.exports.list = function (option, keyword) {
  var filteredTasks = helpers.getFilteredTasks(option, keyword);
  
  for (var i = filteredTasks.length - 1; i >= 0; i--) {
    feedback.printTask(filteredTasks[i]);
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
  feedback.message('"' + taskDescription + '"successfully added.');
};

// Completes an existing task.
module.exports.complete = function () {
  
};

// Removes all tasks filtered using provided option.
module.exports.remove = function () {
  
};

// Help related to taskline usage.
module.exports.help = function () {
  
};

// About Taskline.
module.exports.about = function () {
  
};
