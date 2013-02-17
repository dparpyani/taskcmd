/*
  helpers.js: Contains helper functions.
*/

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
