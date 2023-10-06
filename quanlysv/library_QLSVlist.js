"use strict";

var $ = function (id) {
  return document.getElementById(id);
};

var studentList = {
  students: [],
  storage: getStudentStorage("students_11"),
  displayDiv: null,
  deleteClickHandler: null,
  editClickHandler: null,

  sortByMark: function () {
    this.students.sort(function (a, b) {
      return b.calculateAverage() - a.calculateAverage();
    });
  },

  sortByName: function () {
    this.students.sort(function (a, b) {
      var fullNameA = a.fullName.toLowerCase(),
        fullNameB = b.fullName.toLowerCase();

      if (fullNameA < fullNameB) return -1;
      if (fullNameA > fullNameB) return 1;
      return 0;
    });
  },

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
        var averageScoreStr = "";
        var averageAge = parseInt(student.calculateAge());
        if (!isNaN(averageScore)) {
          averageScoreStr = averageScore.toFixed(2);
          console.log(averageScoreStr); // Nếu là số, thì làm tròn 2 chữ số
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
          ";"
        );
      })
      .join("|");
    this.storage.set(dataString);
  },

  add: function (student) {
    this.students.push(student);
  },

  delete: function (i) {
    this.sortByMark();
    this.students.splice(i, 1);
  },

  edit: function (i, newStudent) {
    this.sortByMark();
    this.students.splice(i, 1, newStudent);
  },

  clear: function () {
    this.students.length = 0;
    this.storage.clear();
    this.displayDiv.innerHTML = "";
  },

  display: function () {
    this.sortByMark();
    var html = "";

    for (var i = 0; i < this.students.length; i++) {
      var student = this.students[i];
      var mytr = "<tr>";
      if (student.calculateAverage() >= 8) {
        mytr = "<tr class='table-success'>";
      } else if (student.calculateAverage() >= 6) {
        mytr = "<tr class='table-primary'>";
      } else {
        mytr = "<tr class='table-danger'>";
      }
      html += mytr;
      html += "<td>" + student.fullName + "</td>";
      html += "<td>" + student.calculateAge() + "</td>";
      html += "<td>" + student.gender + "</td>";
      html += "<td>" + student.theoryScore + "</td>";
      html += "<td>" + student.practiceScore + "</td>";
      html += "<td>" + student.calculateAverage().toFixed(2) + "</td>";

      html += "<td>" + student.calculateClassification() + "</td>";

      html +=
        '<td><a href="#" title="delete_' +
        i +
        '"><i class="bi bi-trash-fill"></i></a> | <a href="#" title="edit_' +
        i +
        '"data-bs-toggle="modal" data-bs-target="#addStudentModal"><i class="bi bi-pencil-square"></i></a></td>';
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
