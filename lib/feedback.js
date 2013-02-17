/*
  feedback.js: Provides feedback to the user like help messages, errors, etc.
*/

module.exports.error = function (message) {
  console.log("Taskline: [error] " + message);
  process.exit(1);
};
