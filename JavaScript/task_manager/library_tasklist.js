"use strict";

var $ = function (id) {
  return document.getElementById(id);
};

var tasklist = {
  tasks: [],
  storage: getTaskStorage("tasks_11"),
  displayDiv: null,
  deleteClickHandler: null,
  editClickHandler: null,

  load: function () {
    var dataStringArray = this.storage.get();
    if (Array.isArray(dataStringArray)) {
      this.tasks = dataStringArray
        .map(function (taskStr) {
          var taskData = taskStr.split(", ");
          if (taskData.length >= 3) {
            return new Task(taskData[0], taskData[1], taskData[2]);
          } else {
            // Xử lý trường hợp dữ liệu không hợp lệ
            return null; // Hoặc thực hiện xử lý khác tùy ý
          }
        })
        .filter(function (task) {
          return task !== null; // Loại bỏ các đối tượng null
        });
    } else {
      this.tasks = [];
    }
  },

  save: function () {
    var dataString = this.tasks
      .map(function (task) {
        return (
          task.text +
          ", " +
          (task.dueDate || "N/A") +
          ", " +
          (task.priority || "N/A")
        );
      })
      .join("|");
    this.storage.set(dataString);
  },

  sort: function () {
    this.tasks.sort();
  },

  add: function (task) {
    this.tasks.push(task);
  },

  delete: function (i) {
    this.sort();
    this.tasks.splice(i, 1);
  },

  edit: function (i, newTask) {
    this.sort();
    this.tasks.splice(i, 1, newTask);
  },

  clear: function () {
    this.tasks.length = 0;
    this.storage.clear();
    this.displayDiv.innerHTML = "";
  },

  display: function () {
    this.sort();
    var html = "";

    for (var i = 0; i < this.tasks.length; i++) {
      var task = this.tasks[i];
      html += "<p>";
      html += '<a href="#" title="delete_' + i + '">Delete</a> | ';
      html += '<a href="#" title="edit_' + i + '">Edit</a><br>';
      html += "Task: " + task.text + "<br>";
      html += "Due Date: " + (task.dueDate || "N/A") + "<br>";
      html += "Priority: " + (task.priority || "N/A");
      html += "</p>";
    }
    this.displayDiv.innerHTML = html;

    var links = this.displayDiv.getElementsByTagName("a");

    for (var j = 0; j < links.length; j++) {
      var link = links[j];
      if (link.getAttribute("title").startsWith("delete_")) {
        link.onclick = this.deleteClickHandler;
      } else if (link.getAttribute("title").startsWith("edit_")) {
        link.onclick = this.editClickHandler;
      }
    }
  },
};
