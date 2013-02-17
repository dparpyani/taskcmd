/*
  taskOperations.js: Contains operations related to managing tasks.
*/

var taskIO = require('./taskIO');
var feedback = require('./feedback');
var helpers = require('./helpers');

// Lists all tasks filtered using provided option.
module.exports.list = function (option, keyword) {
  var tasks = taskIO.getTasks();
  var filteredTasks = helpers.filterTasks(option, keyword, tasks);
  
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
  feedback.message('"' + taskDescription + '" successfully added.');
};

// Completes an existing task.
module.exports.complete = function (id, note) {
  var tasks = taskIO.getTasks();
  var filteredTasks = helpers.filterTasks('-id', id, tasks);
  
  if (filteredTasks.length === 0) {
    feedback.error('No task found with id = '+ id);
  }
  
  for (var i = filteredTasks.length - 1; i >= 0; i--) {
    if (filteredTasks[i].isCompleted) {
      feedback.error('The task with given ID has already been completed.');
    }
    
    filteredTasks[i].isCompleted = true;
    if (note) { filteredTasks[i].completionNote = note; }
    filteredTasks[i].completedAt = helpers.formatDate(new Date());
    
    feedback.printTask(filteredTasks[i]);
  }
  
  taskIO.saveTasks(tasks);
  feedback.message('The task with id ' + id + ' was marked complete.');
};

// Removes all tasks filtered using provided option.
module.exports.remove = function (option, keyword) {
  var tasks = taskIO.getTasks();
  
  if (! option) {
    feedback.error('An option needs to be provided in order to remove task(s).');
  }
  
  var filteredTasks = helpers.filterTasks(option, keyword, tasks);
  
  if (filteredTasks.length === 0) {
    feedback.error('No task found with specified options.');
  }
  
  for (var i = filteredTasks.length - 1; i >= 0; i--) {
    feedback.printTask(filteredTasks[i]);
  }
  
  feedback.ask('Are you sure you want to remove the tasks shown above? (y/n)', function (reply) {
    if (reply.trim().toLowerCase() !== 'y') {
      feedback.message('No task was removed.');
      process.exit(0);
    }
    
    for (var i = 0; i < filteredTasks.length; i++) {
      var index = tasks.indexOf(filteredTasks[i]);
      tasks.splice(index, 1);
    }
    
    taskIO.saveTasks(tasks);
    feedback.message('Tasks were removed.');
  });
};

// Help related to taskcmd usage.
module.exports.help = function () {
  
};

// About taskcmd.
module.exports.about = function () {
  
};

// Refreshes task IDs so that the max ID is the total number of tasks.
module.exports.refresh = function() {
  
}
