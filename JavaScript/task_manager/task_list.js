"use strict";

var $ = function (id) {
  return document.getElementById(id);
};

var addToTaskList = function () {
  var taskTextbox = $("task");
  var dueDateTextbox = $("due_date");
  var priorityTextbox = $("priority");

  var taskName = taskTextbox.value;
  var dueDate = dueDateTextbox.value;
  var priority = priorityTextbox.value;

  if (taskName.trim() !== "") {
    tasklist.add(new Task(taskName, dueDate, priority));
    tasklist.save(); // Lưu dữ liệu vào Local Storage
    taskTextbox.value = "";
    tasklist.display(); // Hiển thị danh sách sau khi thêm
  } else {
    alert("Please enter a task.");
  }

  taskTextbox.focus();
};

var clearTaskList = function () {
  tasklist.clear();
  $("task").focus();
};

var deleteFromTaskList = function () {
  var index = this.title;
  tasklist.delete(index);
  tasklist.save(); // Lưu dữ liệu vào Local Storage
  tasklist.display();
  $("task").focus();
};

var editFromTaskList = function () {
  var index = this.title.substring(5);
  var task = tasklist.tasks[index];

  // Hiển thị giá trị hiện tại trong các ô
  $("task").value = task.text;
  $("due_date").value = task.dueDate || "";
  $("priority").value = task.priority || "Medium";

  // Ẩn nút "Add Task" và hiển thị nút "Update" và "Cancel"
  $("add_task").style.display = "none";
  $("update_task").style.display = "inline";
  $("cancel_edit").style.display = "inline";

  // Lưu index của nhiệm vụ đang chỉnh sửa để cập nhật sau này
  $("update_task").setAttribute("data-index", index);
};

var updateTask = function () {
  var index = $("update_task").getAttribute("data-index");
  var taskTextbox = $("task");
  var dueDateTextbox = $("due_date");
  var priorityTextbox = $("priority");

  var taskName = taskTextbox.value;
  var dueDate = dueDateTextbox.value;
  var priority = priorityTextbox.value;

  var task = new Task(taskName, dueDate, priority);

  if (task.isValid()) {
    // Cập nhật nhiệm vụ
    tasklist.edit(index, task);
    tasklist.save();

    // Xóa giá trị trong các ô và hiển thị lại nút "Add Task"
    taskTextbox.value = "";
    dueDateTextbox.value = "";
    priorityTextbox.value = "";
    $("add_task").style.display = "inline";
    $("update_task").style.display = "none";
    $("cancel_edit").style.display = "none";
  } else {
    alert("Please enter a task.");
  }

  taskTextbox.focus();

  tasklist.display();
  taskTextbox.focus();
};

var cancelEdit = function () {
  // Xóa giá trị trong các ô
  $("task").value = "";
  $("due_date").value = "";
  $("priority").value = "Medium";

  // Ẩn nút "Update" và "Cancel" và hiển thị nút "Add Task"
  $("add_task").style.display = "inline";
  $("update_task").style.display = "none";
  $("cancel_edit").style.display = "none";
};

window.onload = function () {
  tasklist.load(); // Gọi hàm load để khôi phục dữ liệu từ Local Storage

  $("add_task").onclick = addToTaskList;
  $("clear_tasks").onclick = clearTaskList;
  // Thêm sự kiện cho nút "Update" và "Cancel"
  $("update_task").onclick = updateTask;
  $("cancel_edit").onclick = cancelEdit;

  tasklist.deleteClickHandler = deleteFromTaskList;
  tasklist.editClickHandler = editFromTaskList;
  tasklist.displayDiv = $("tasks");

  // Kiểm tra xem có dữ liệu trong Local Storage không
  if (tasklist.tasks.length > 0) {
    tasklist.display();
  }

  $("task").focus();
};

// Lưu dữ liệu vào Local Storage khi thực hiện các thay đổi
function saveToLocalStorage() {
  tasklist.save();
}
