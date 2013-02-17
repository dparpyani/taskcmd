/*
  feedback.js: Used for anything related to printing to console.
*/

var colors = require('colors');

colors.setTheme({
  priority0: 'grey',
  priority1: 'green',
  priority2: 'yellow',
  priority3: 'red',
  error: 'red'
});

module.exports.error = function (message) {
  console.error(("Taskline [error]: " + message).error);
  process.exit(1);
};

module.exports.printTask = function (task) {
  if (task.isCompleted) {
    console.log(
      ( '\nid: ' + task.id + '\n' +
        'created at: ' + task.createdAt + '\n' +
        'description: ' + task.description + '\n' +
        'completed at: ' + task.completedAt + '\n' +
        'completion note: ' + task.completionNote
      )['priority' + task.priority]
    );
  } else {
    console.log(
      ( '\nid: ' + task.id + '\n' +
        'priority: ' + task.priority + '\n' +
        'created at: ' + task.createdAt + '\n' +
        'description: ' + task.description
      )['priority' + task.priority].bold
    );
  }
}
