/*
  feedback.js: Used for anything related to printing to console, reading user input, or help.
*/

var colors = require('colors');
var helpers = require('./helpers');

colors.setTheme({
  priority0: 'grey',
  priority1: 'cyan',
  priority2: 'yellow',
  priority3: 'red',
  complete: 'green',
  ask: 'yellow',
  message: 'magenta',
  error: 'red'
});

module.exports.message = function (message) {
  console.log(('TaskCmd: ' + message).message);
}

module.exports.error = function (message, callBeforeExit) {
  console.error(("TaskCmd [error]: " + message).error);
  if (callBeforeExit) { callBeforeExit(); }
  
  process.exit(1);
};

module.exports.ask = function (question, callback) {
  console.log(('TaskCmd: ' + question).ask.bold);
  
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  process.stdin.on('data', function (reply) {
    process.stdin.pause();
    callback(reply);
  });
}

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

module.exports.help = function () {
  var helpUrl = 'https://github.com/dparpyani/TaskCmd';
  this.message('Launching help ("' + helpUrl + '") in default browser...');
  
  try {
    var open = require('open');
    open(helpUrl);
  } catch (err) {
    this.error('An error occurred while launching the browser.');
  }
}
