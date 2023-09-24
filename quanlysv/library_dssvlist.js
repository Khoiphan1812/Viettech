"use strict";

var $ = function (id) {
  return document.getElementById(id);
};

function Student(
  fullName,
  birthYear,
  gender,
  email,
  hometown,
  theoryScore,
  practiceScore
) {
  this.fullName = fullName;
  this.birthYear = birthYear;
  this.gender = gender;
  this.email = email;
  this.hometown = hometown;
  this.theoryScore = theoryScore;
  this.practiceScore = practiceScore;

  this.calculateAverage = function () {
    return (this.theoryScore + this.practiceScore) / 2;
  };

  this.calculateClassification = function () {
    var averageScore = this.calculateAverage();
    if (averageScore >= 5) {
      return "Giỏi";
    } else {
      return "Yếu";
    }
  };
}

var studentList = {
  students: [],
  storage: getStudentStorage("students_11"),
  displayDiv: null,
  deleteClickHandler: null,
  editClickHandler: null,

  load: function () {
    var dataStringArray = this.storage.get();
    if (Array.isArray(dataStringArray)) {
      this.students = dataStringArray
        .map(function (studentStr) {
          var studentData = studentStr.split(";");
          if (studentData.length >= 8) {
            return new Student(
              studentData[0],
              parseInt(studentData[1]),
              studentData[2],
              studentData[3],
              studentData[4],
              parseFloat(studentData[5]),
              studentData[6]
            );
          } else {
            // Xử lý trường hợp dữ liệu không hợp lệ
            return null; // Hoặc thực hiện xử lý khác tùy ý
          }
        })
        .filter(function (student) {
          return student !== null; // Loại bỏ các đối tượng null
        });
    } else {
      this.students = [];
    }
  },

  save: function () {
    var dataString = this.students
      .map(function (student) {
        var averageScore = parseFloat(student.calculateAverage()); // Chuyển đổi giá trị trung bình sang số
        if (!isNaN(averageScore)) {
          averageScore = averageScore.toFixed(2); // Nếu là số, thì làm tròn 2 chữ số
        } else {
          averageScore = ""; // Nếu không phải số, để trống giá trị
        }
        return (
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
          averageScore + // Sử dụng giá trị trung bình đã làm tròn (hoặc trống nếu không phải số)
          ";" +
          (averageScore >= 5 ? "Giỏi" : "Yếu") // Tính xếp loại dựa trên giá trị trung bình (hoặc trống nếu không phải số)
        );
      })
      .join("|");
    this.storage.set(dataString);
  },

  sort: function () {
    this.students.sort(function (a, b) {
      var avgA = a.calculateAverage();
      var avgB = b.calculateAverage();
      if (avgA < avgB) return 1;
      if (avgA > avgB) return -1;
      return 0;
    });
  },

  add: function (student) {
    this.students.push(student);
  },

  delete: function (i) {
    this.sort();
    this.students.splice(i, 1);
  },

  edit: function (i, newStudent) {
    this.sort();
    this.students.splice(i, 1, newStudent);
  },

  clear: function () {
    this.students.length = 0;
    this.storage.clear();
    this.displayDiv.innerHTML = "";
  },

  display: function () {
    this.sort();
    var html = "";

    for (var i = 0; i < this.students.length; i++) {
      var student = this.students[i];
      html += "<tr>";
      html += "<td>" + student.fullName + "</td>";
      html += "<td>" + student.birthYear + "</td>";
      html += "<td>" + student.gender + "</td>";
      html += "<td>" + student.theoryScore + "</td>";
      html += "<td>" + student.practiceScore + "</td>";
      html +=
        "<td>" +
        (typeof student.calculateAverage() === "number"
          ? student.calculateAverage().toFixed(2)
          : "") +
        "</td>";

      html +=
        "<td>" +
        (student && typeof student.calculateClassification === "function"
          ? student.calculateClassification()
          : "") +
        "</td>";

      html +=
        '<td><a href="#" title="delete_' +
        i +
        '">Delete</a> | <a href="#" title="edit_' +
        i +
        '">Edit</a></td>';
      html += "</tr>";
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

window.onload = function () {
  studentList.load();

  $("addStudentButton").onclick = addToStudentList;
  $("clearStudentButton").onclick = clearStudentList;
  $("updateStudentButton").onclick = updateStudent;

  studentList.deleteClickHandler = deleteFromStudentList;
  studentList.editClickHandler = editFromStudentList;
  studentList.displayDiv = $("studentList");

  if (studentList.students.length > 0) {
    studentList.display();
  }
  $("fullName").focus();
};
