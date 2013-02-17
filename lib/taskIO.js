/*
  taskIO.js: Manages input/output related to storing and retrieving tasks.
*/

var fs = require('fs');
var feedback = require('./feedback');

// Loads the saved tasks.
module.exports.getTasks = function () {
  var tasks = new Array();
  
  if (fs.existsSync(taskFile)) {
    tasks = require(taskFile);
  } else {
    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 4) , 'utf8', function (err) {
      if (err) { feedback.error(err.message); }
    });
  }
  
  return tasks;
};

// Saves the tasks.
module.exports.saveTasks = function (tasks) {
  if (tasks) {
    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 4), 'utf8', function (err) {
      if (err) { feedback.error(err.message); }
    });
  }
};
