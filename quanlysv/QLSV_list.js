"use strict";

var $ = function (id) {
  return document.getElementById(id);
};

var registerForm;
var addToStudentList = function () {
  // Gọi hàm kiểm tra validateForm
  if (registerForm.validateForm()) {
    var fullNameTextbox = $("fullName");
    var birthYearTextbox = $("birthYear");
    var genderSelect = $("gender");
    var emailTextbox = $("email");
    var hometownTextbox = $("hometown");
    var theoryScoreTextbox = $("theoryScore");
    var practiceScoreTextbox = $("practiceScore");

    var fullName = fullNameTextbox.value;
    var birthYear = parseInt(birthYearTextbox.value);
    var gender = genderSelect.value;
    var email = emailTextbox.value;
    var hometown = hometownTextbox.value;
    var theoryScore = parseFloat(theoryScoreTextbox.value);
    var practiceScore = parseFloat(practiceScoreTextbox.value);

    var student = new Student(
      fullName,
      birthYear,
      gender,
      email,
      hometown,
      theoryScore,
      practiceScore
    );

    studentList.add(student);
    studentList.save(); // Lưu dữ liệu vào Local Storage
    fullNameTextbox.value = "";
    birthYearTextbox.value = "";
    genderSelect.value = "Nam";
    emailTextbox.value = "";
    hometownTextbox.value = "";
    theoryScoreTextbox.value = "";
    practiceScoreTextbox.value = "";
    studentList.display(); // Hiển thị danh sách sau khi thêm

    $("fullName").focus();
  }
};

var clearStudentList = function () {
  studentList.clear();
  $("fullName").focus();
};

var deleteFromStudentList = function () {
  var index = this.title.substring(7);
  studentList.delete(index);
  studentList.save(); // Lưu dữ liệu vào Local Storage
  studentList.display();
  $("fullName").focus();
};

var editFromStudentList = function () {
  var index = this.title.substring(5);
  var student = studentList.students[index];

  // Hiển thị giá trị hiện tại trong các ô
  $("fullName").value = student.fullName;
  $("birthYear").value = student.birthYear;
  $("gender").value = student.gender;
  $("email").value = student.email;
  $("hometown").value = student.hometown;
  $("theoryScore").value = student.theoryScore;
  $("practiceScore").value = student.practiceScore;

  // Ẩn nút "Thêm Sinh viên" và hiển thị nút "Cập nhật" và "Hủy"
  $("addStudentButton").style.display = "none";
  $("updateStudentButton").style.display = "inline";
  $("cancelEdit").style.display = "inline";

  // Lưu index của sinh viên đang chỉnh sửa để cập nhật sau này
  $("updateStudentButton").setAttribute("data-index", index);
};

var updateStudent = function () {
  var index = $("updateStudentButton").getAttribute("data-index");
  var fullNameTextbox = $("fullName");
  var birthYearTextbox = $("birthYear");
  var genderSelect = $("gender");
  var emailTextbox = $("email");
  var hometownTextbox = $("hometown");
  var theoryScoreTextbox = $("theoryScore");
  var practiceScoreTextbox = $("practiceScore");

  var fullName = fullNameTextbox.value;
  var birthYear = parseInt(birthYearTextbox.value);
  var gender = genderSelect.value;
  var email = emailTextbox.value;
  var hometown = hometownTextbox.value;
  var theoryScore = parseFloat(theoryScoreTextbox.value);
  var practiceScore = parseFloat(practiceScoreTextbox.value);

  var student = new Student(
    fullName,
    birthYear,
    gender,
    email,
    hometown,
    theoryScore,
    practiceScore
  );

  if (!isNaN(birthYear) && !isNaN(theoryScore) && !isNaN(practiceScore)) {
    // Cập nhật thông tin sinh viên
    studentList.edit(index, student);
    studentList.save();
    studentList.display();

    // Xóa giá trị trong các ô và hiển thị lại nút "Thêm Sinh viên"
    fullNameTextbox.value = "";
    birthYearTextbox.value = "";
    genderSelect.value = "Nam";
    emailTextbox.value = "";
    hometownTextbox.value = "";
    theoryScoreTextbox.value = "";
    practiceScoreTextbox.value = "";
    $("addStudentButton").style.display = "inline";
    $("updateStudentButton").style.display = "none";
    $("cancelEdit").style.display = "none";
  } else {
    alert("Vui lòng nhập thông tin hợp lệ.");
  }

  fullNameTextbox.focus();

  studentList.display();
  fullNameTextbox.focus();
};

var cancelEdit = function () {
  // Xóa giá trị trong các ô
  $("fullName").value = "";
  $("birthYear").value = "";
  $("gender").value = "Nam";
  $("email").value = "";
  $("hometown").value = "";
  $("theoryScore").value = "";
  $("practiceScore").value = "";

  // Ẩn nút "Cập nhật" và "Hủy" và hiển thị nút "Thêm Sinh viên"
  $("addStudentButton").style.display = "inline";
  $("updateStudentButton").style.display = "none";
  $("cancelEdit").style.display = "none";
};

var sortByName = function () {
  studentList.sortDirection *= -1;
  studentList.sortByName().display();
  if (studentList.sortDirection === 1) {
    $("sort_by_name_icon").className = "icon-up";
  } else {
    $("sort_by_name_icon").className = "icon-down";
  }
};

var sortByMark = function () {
  studentList.sortDirection *= -1;
  studentList.sortByMark().display();

  if (studentList.sortDirection === 1) {
    $("sort_by_mark_icon").className = "icon-down";
  } else {
    $("sort_by_mark_icon").className = "icon-up";
  }
};

window.onload = function () {
  registerForm = new RegisterForm();
  studentList.load();

  $("addStudentButton").onclick = addToStudentList;
  $("clearStudentButton").onclick = clearStudentList;
  // Thêm sự kiện cho nút "Cập nhật" và "Hủy"
  $("updateStudentButton").onclick = updateStudent;
  $("cancelEdit").onclick = cancelEdit;

  $("btnSortName").onclick = sortByName;
  $("btnSortMark").onclick = sortByMark;

  studentList.deleteClickHandler = deleteFromStudentList;
  studentList.editClickHandler = editFromStudentList;
  studentList.displayDiv = $("studentList");
  studentList.load().display();

  $("fullName").focus();
};
