/*
  taskOperations.js: Contains operations related to managing tasks.
*/

var taskIO = require('./taskIO');
var feedback = require('./feedback');
var helpers = require('./helpers');

// Shows tasks that match the filter options.
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
  if (tasks.length > 0) {
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
  
  feedback.printTask(task);
  feedback.message('"' + taskDescription + '" successfully added.');
};

// Marks an existing task as complete.
module.exports.complete = function (id, note) {
  var tasks = taskIO.getTasks();
  var filteredTasks = helpers.filterTasks('-id', id, tasks);
  
  if (filteredTasks.length === 0) {
    feedback.error('No task found with id = '+ id + '.');
  }
  
  for (var i = filteredTasks.length - 1; i >= 0; i--) {
    if (filteredTasks[i].isCompleted) {
      feedback.error('The task with id ' + id + ' has already been completed.');
    }
    
    filteredTasks[i].isCompleted = true;
    if (note) { filteredTasks[i].completionNote = note; }
    filteredTasks[i].completedAt = helpers.formatDate(new Date());
    
    feedback.printTask(filteredTasks[i]);
  }
  
  taskIO.saveTasks(tasks);
  feedback.message('The task with id ' + id + ' was marked complete.');
};

// Removes tasks that match the filter options.
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
  
  feedback.ask('Are you sure you want to remove the task(s) shown above? (y/n)', function (reply) {
    if (reply.trim().toLowerCase() !== 'y') {
      feedback.message('No task was removed.');
      process.exit(0);
    }
    
    for (var i = 0; i < filteredTasks.length; i++) {
      var index = tasks.indexOf(filteredTasks[i]);
      tasks.splice(index, 1);
    }
    
    taskIO.saveTasks(tasks);
    feedback.message('Task(s) were removed.');
  });
};

// Edits properties of an existing task
module.exports.edit = function (id, option, value) {
  var tasks = taskIO.getTasks();
  var filteredTasks = helpers.filterTasks('-id', id, tasks);
  
  if (filteredTasks.length === 0) {
    feedback.error('No task found with id = '+ id + '.');
  }
  
  var message = 'The task with id ' + id + ' was modified.';
  for (var i = filteredTasks.length - 1; i >= 0; i--) {
    switch (option) {
      case '-c':
        // Modify completion note
        filteredTasks[i].completionNote = value;
        message = 'The completion note for task with id ' + id + ' was modified.';
        break;
      case '-d':
        // Modify description
        filteredTasks[i].description = value;
        message = 'The description for task with id ' + id + ' was modified.';
        break;
      case '-i':
        // Mark task as incomplete
        if (! filteredTasks[i].isCompleted) {
          feedback.error('The task with id ' + id + ' is already incomplete.');
        }
        
        filteredTasks[i].isCompleted = false;
        filteredTasks[i].completionNote = '';
        filteredTasks[i].completedAt = null;
        
        message = 'The task with id ' + id + ' was marked as incomplete.';
        break;
      case '-p':
        // Sets priority for task
        if (filteredTasks[i].isCompleted) {
          feedback.error('Priority cannot be set for completed tasks.');
        }
        
        filteredTasks[i].priority = helpers.getPriorityId(value);
        message = 'The priority for task with id ' + id + ' was modified.';
        break;
      default:
        feedback.error('Invalid option provided.');
    }
    
    feedback.printTask(filteredTasks[i]);
  }
  
  taskIO.saveTasks(tasks);
  feedback.message(message);
};

// Creates a new task list in the current directory
module.exports.newList = function (dir) {
   // Update task file name
   taskFile = dir + '/' + taskFileName;

   // Simply call taskIO.getTasks() to save the new list
   taskIO.getTasks();
};

// Refreshes task IDs so that the max ID is the total number of tasks.
module.exports.refresh = function() {
  
}
