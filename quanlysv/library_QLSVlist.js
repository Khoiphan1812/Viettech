"use strict";

var $ = function (id) {
  return document.getElementById(id);
};

var sortByName = function (a, b) {
  var nameA = a.fullName,
    nameB = b.fullName;
  var firstNameA = nameA.substr(nameA.lastIndexOf(" ") + 1),
    firstNameB = nameB.substr(nameB.lastIndexOf(" ") + 1);

  if (firstNameA > firstNameB) {
    return 1 * studentList.sortDirection;
  } else if (firstNameA < firstNameB) {
    return -1 * studentList.sortDirection;
  } else {
    return 0;
  }
};

var sortByMark = function (a, b) {
  var markA = a.calculateAverage(),
    markB = b.calculateAverage();

  return (markB - markA) * studentList.sortDirection;
};

var studentList = {
  students: [],
  storage: getStudentObjectStorage("students_11"),
  displayDiv: null,
  deleteClickHandler: null,
  editClickHandler: null,
  theLastSort: null,
  sortDirection: null,

  sort: function () {
    this.students.sort(this.theLastSort);
  },

  load: function () {
    if (this.students.length === 0) {
      studentList.students = this.storage.get();
    }
    return this;
  },

  save: function () {
    this.storage.set(this.students);
    return this;
  },

  sortByName: function () {
    this.theLastSort = sortByName;
    this.students.sort(this.theLastSort);
    return this;
  },
  sortByMark: function () {
    this.theLastSort = sortByMark;
    this.students.sort(this.theLastSort);
    return this;
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
