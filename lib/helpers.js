/*
  helpers.js: Contains helper functions.
*/

var taskIO = require('./taskIO');

// Formats the provided date.
module.exports.formatDate = function (date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  
  // append 0 to single digit dates and months
  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }
  
  var hours = date.getHours();
  var minutes = date.getMinutes();
  
  // append 0 to single digit minutes
  if (minutes < 10) { minutes = '0' + minutes; }
  
  // 12-hour clock
  var meridiem = (hours >= 12 ? 'pm' : 'am');
  hours = hours % 12;
  if (hours === 0) { hours = 12; }
  
  // Example format: '16/02/2013 5:57 pm'
  return dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes + ' ' + meridiem;
}

module.exports.getPriority = function (priorityId) {
  var priority = '';
  switch (priorityId) {
    case 0:
      priority = 'none'; break;
    case 1:
      priority = 'low'; break;
    case 2:
      priority = 'medium'; break;
    case 3:
      priority = 'high'; break;
  }
  return priority;
}

module.exports.getFilteredTasks = function (option, keyword) {
  var tasks = taskIO.getTasks();
  var filteredTasks = [];
  
  if (! option) { option = '-i'; }
  
  for (var i = 0; i < tasks.length; i++) {
    switch (option) {
      case '-a':
        // Returns all tasks
        filteredTasks.push(tasks[i]);
        break;
      case '-c':
        // Returns all completed tasks
        if (tasks[i].isCompleted) {
          filteredTasks.push(tasks[i]);
        }
        break;
      case '-i':
        // Returns all incomplete tasks
        if (! tasks[i].isCompleted) {
          filteredTasks.push(tasks[i]);
        }
        break;
      case '-s':
        // Returns all tasks containing keyword
        if (! keyword) { feedback.error('Keyword missing.'); }
        
        if (tasks[i].description.indexOf(parameters[1]) > -1 ||
            tasks[i].completionNote.indexOf(parameters[1]) > -1)
        {
            filteredTasks.push(tasks[i]);
        }
        break;
      case '-sc':
        // Returns completed tasks containing keyword
        if (! keyword) { feedback.error('Keyword missing.'); }
        
        if (tasks[i].isCompleted && (
            tasks[i].description.indexOf(parameters[1]) > -1 ||
            tasks[i].completionNote.indexOf(parameters[1]) > -1))
        {
            filteredTasks.push(tasks[i]);
        }
        break;
      case '-si':
        // Returns active tasks containing keyword
        if (! keyword) { feedback.error('Keyword missing.'); }
        
        if ((! tasks[i].isCompleted) && (
              tasks[i].description.indexOf(parameters[1]) > -1 ||
              tasks[i].completionNote.indexOf(parameters[1]) > -1))
        {
            filteredTasks.push(tasks[i]);
        }
        break;
      default:
        feedback.error('Invalid option provided.');
    }
  }
  
  return filteredTasks;
};
