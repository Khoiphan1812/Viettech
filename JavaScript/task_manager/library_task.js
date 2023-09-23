var Task = function (taskName, dueDate, priority) {
  this.text = taskName;
  this.dueDate = dueDate;
  this.priority = priority;
};
Task.prototype.isValid = function () {
  if (this.text === "") {
    return false;
  } else {
    return true;
  }
};
Task.prototype.toString = function () {
  var first = this.text.substring(0, 1);
  return first.toUpperCase() + this.text.substring(1);
};
