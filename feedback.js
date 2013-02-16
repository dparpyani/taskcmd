/*
  feedback.js: Provides feedback to the user like help messages, errors, etc.
*/

module.exports = (function feedback () {
  function errorFeedback (message) {
    console.log("Taskline: [error] " + message);
    process.exit(1);
  }
  
  return {
    error: errorFeedback
  };
} ());