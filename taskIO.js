/*
  taskIO.js: Manages input/output related to storing and retrieving tasks.
*/

var fs = require('fs');
var feedback = require('./feedback');
var storageFile = './tasks.json';

// Loads the saved tasks from tasks.json.
module.exports.getTasks = function () {
  var tasks = new Array();
  
  if (fs.existsSync(storageFile)) {
    tasks = require(storageFile);
  } else {
    fs.writeFileSync(storageFile, JSON.stringify(tasks, null, 4) , 'utf8', function (err) {
      if (err) { feedback.error(err.message); }
    });
  }
  
  return tasks;
};

// Saves the tasks to tasks.json.
module.exports.saveTasks = function (tasks) {
  if (tasks) {
    fs.writeFileSync(storageFile, JSON.stringify(tasks, null, 4), 'utf8', function (err) {
      if (err) { feedback.error(err.message); }
    });
  }
};