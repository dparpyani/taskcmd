/*
  helpers.js: Contains helper functions.
*/

var feedback = require('./feedback');

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
    default:
      feedback.error('Invalid priority ID provided.');
  }
  return priority;
}

module.exports.getPriorityId = function (priority) {
  var priorityId = 0;
  switch (priority.toLowerCase()) {
    case 'none':
      priorityId = 0; break;
    case 'low':
      priorityId = 1; break;
    case 'medium':
      priorityId = 2;break;
    case 'high':
      priorityId = 3; break;
    default:
      feedback.error('Priority can only be one of "none", "low", "medium" or "high".');
  }
  return priorityId;
}

module.exports.filterTasks = function (option, keyword, tasks) {
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
        
        if (tasks[i].description.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
            tasks[i].completionNote.toLowerCase().indexOf(keyword.toLowerCase()) > -1)
        {
          filteredTasks.push(tasks[i]);
        }
        break;
      case '-sc':
        // Returns completed tasks containing keyword
        if (! keyword) { feedback.error('Keyword missing.'); }
        
        if (tasks[i].isCompleted && (
            tasks[i].description.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
            tasks[i].completionNote.toLowerCase().indexOf(keyword.toLowerCase()) > -1))
        {
          filteredTasks.push(tasks[i]);
        }
        break;
      case '-si':
        // Returns active tasks containing keyword
        if (! keyword) { feedback.error('Keyword missing.'); }
        
        if ((! tasks[i].isCompleted) && (
              tasks[i].description.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
              tasks[i].completionNote.toLowerCase().indexOf(keyword.toLowerCase()) > -1))
        {
          filteredTasks.push(tasks[i]);
        }
        break;
      case '-id':
        // Returns task with the given ID
        if (! keyword) { feedback.error('ID missing.'); }
        
        if (tasks[i].id == keyword) {
          filteredTasks.push(tasks[i]);
        }
        break;
      default:
        feedback.error('Invalid option provided.');
    }
  }

  return filteredTasks;
};
