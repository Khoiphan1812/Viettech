// Định nghĩa prototype cho lưu trữ
var storagePrototype = {
  get: function () {
    var str = localStorage.getItem(this.key);
    if (typeof str === "string" && str !== "") {
      return str.split("|");
    } else {
      return [];
    }
  },

  set: function (dataString) {
    localStorage.setItem(this.key, dataString);
  },
  clear: function () {
    localStorage.setItem(this.key, "");
  },
};

// Tạo đối tượng lưu trữ
var getTaskStorage = function (key) {
  var storage = Object.create(storagePrototype);
  storage.key = key;
  return storage;
};

// Định nghĩa prototype cho objectArrayStorage
var objectArrayStoragePrototype = Object.create(storagePrototype);

objectArrayStoragePrototype.get = function () {
  var str = storagePrototype.get.call(this) || "";
  return str === ""
    ? []
    : str.split("|").map(function (value) {
        var temp = value.split(";");
        return new Task(temp[0], temp[1], temp[2]);
      });
};

objectArrayStoragePrototype.set = function (arr) {
  if (Array.isArray(arr)) {
    var str = "";
    arr.forEach(function (value) {
      str += "|" + value.text + ";" + value.dueDate + ";" + value.priority;
    });
    storagePrototype.set.call(this, str.substring(1));
  }
};

// Định nghĩa hàm getTaskObjectStorage
var getTaskObjectStorage = function (key) {
  var storage = Object.create(objectArrayStoragePrototype);
  storage.key = key;
  return storage;
};

// Sử dụng:
var taskArray = [
  {
    text: "Task 1",
    dueDate: "2023-09-30",
    priority: "High",
  },
  {
    text: "Task 2",
    dueDate: "2023-10-15",
    priority: "Medium",
  },
];

// Sử dụng getTaskObjectStorage để tạo một lưu trữ cho các nhiệm vụ
var taskStorage = getTaskObjectStorage("yourStorageKey");
// Sử dụng set để lưu mảng taskArray vào Local Storage
localStorage.setItem("yourStorageKey", JSON.stringify(taskArray));

// Để lấy dữ liệu từ Local Storage
var retrievedTasks = JSON.parse(localStorage.getItem("yourStorageKey"));

// retrievedTasks giờ đây là mảng chứa dữ liệu từ Local Storage
