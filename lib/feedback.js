/*
  feedback.js: Used for anything related to printing to console.
*/

var colors = require('colors');
var helpers = require('./helpers');

colors.setTheme({
  priority0: 'grey',
  priority1: 'cyan',
  priority2: 'yellow',
  priority3: 'red',
  complete: 'green',
  message: 'magenta',
  error: 'red'
});

module.exports.message = function (message) {
  console.log(('Taskline: ' + message).message);
}

module.exports.error = function (message, callBeforeExit) {
  console.error(("Taskline [error]: " + message).error);
  if (callBeforeExit) { callBeforeExit(); }
  
  process.exit(1);
};

module.exports.printTask = function (task) {
  if (task.isCompleted) {
    var completionNote = '';
    
    if (task.completionNote.length > 0) {
      completionNote = 'completion note: ' + task.completionNote + '\n';
    }
    
    console.log(
      ( '\nid: ' + task.id + '\n' +
        'description: ' + task.description + '\n' +
        completionNote +
        'created at: ' + task.createdAt + '\n' +
        'completed at: ' + task.completedAt + '\n'
      ).complete.bold
    );
  } else {
    console.log(
      ( '\nid: ' + task.id + '\t' +
        'priority: ' + helpers.getPriority(task.priority) + '\n' +
        'description: ' + task.description + '\n' +
        'created at: ' + task.createdAt + '\n'
      )['priority' + task.priority].bold
    );
  }
}
