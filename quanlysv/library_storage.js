"use strict";

var storagePrototype = {
  get: function () {
    return localStorage.getItem(this.key);
  },

  set: function (dataString) {
    localStorage.setItem(this.key, dataString);
  },
  clear: function () {
    localStorage.setItem(this.key, "");
  },
};

// Tạo đối tượng lưu trữ
var getStudentStorage = function (key) {
  var storage = Object.create(storagePrototype);
  storage.key = key;
  return storage;
};

var objectArrayStoragePrototype = Object.create(storagePrototype);

objectArrayStoragePrototype.get = function () {
  var str = storagePrototype.get.call(this) || "";
  var arr = [];

  if (str !== "") {
    arr = JSON.parse(str).map(function (objectStudent) {
      return new Student(
        objectStudent.fullName,
        objectStudent.birthYear,
        objectStudent.gender,
        objectStudent.email,
        objectStudent.hometown,
        objectStudent.theoryScore,
        objectStudent.practiceScore
      );
    });
  }
  return arr;
};

objectArrayStoragePrototype.set = function (arr) {
  if (Array.isArray(arr)) {
    var str = "[]";
    str = JSON.stringify(arr);
    storagePrototype.set.call(this, str);
  }
};

var getStudentObjectStorage = function (key) {
  var storage = Object.create(objectArrayStoragePrototype);
  storage.key = key;
  return storage;
};

/* 
  // Định nghĩa prototype cho objectArrayStorage
  var objectArrayStoragePrototype = Object.create(storagePrototype);
  
  objectArrayStoragePrototype.get = function () {
    var str = storagePrototype.get.call(this) || "";
    return str === ""
      ? []
      : str.split("|").map(function (value) {
          var temp = value.split(";");
          return new Student(
            temp[0],
            parseInt(temp[1]),
            temp[2],
            temp[3],
            temp[4],
            parseFloat(temp[5]),
            temp[6],
            temp[7],
            temp[8]
          );
        });
  };
  
  objectArrayStoragePrototype.set = function (arr) {
    if (Array.isArray(arr)) {
      var str = "";
      arr.forEach(function (student) {
        str +=
          "|" +
          student.fullName +
          ";" +
          student.birthYear +
          ";" +
          student.gender +
          ";" +
          student.email +
          ";" +
          student.hometown +
          ";" +
          student.theoryScore +
          ";" +
          student.practiceScore +
          ";" +
          student.calculateAverage() +
          ";" +
          student.calculateClassification();
      });
      storagePrototype.set.call(this, str.substring(1));
    }
  };
  
  // Định nghĩa hàm getStudentObjectStorage
  var getStudentObjectStorage = function (key) {
    var storage = Object.create(objectArrayStoragePrototype);
    storage.key = key;
    return storage;
  };
   */

// Ví dụ về cách tạo một đối tượng Student
