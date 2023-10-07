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

var sortStudentsByName = function () {
  studentList.sortDirection *= -1;
  studentList.sortByName().display();
  if (studentList.sortDirection === 1) {
    $("sort_by_name_icon").className = "icon-up";
  } else {
    $("sort_by_name_icon").className = "icon-down";
  }
};

var sortStudentsByMark = function () {
  studentList.sortDirection *= -1;
  studentList.sortByMark().display();

  if (studentList.sortDirection === 1) {
    $("sort_by_mark_icon").className = "icon-down";
  } else {
    $("sort_by_mark_icon").className = "icon-up";
  }
};

var initDataJSON = function () {
  var initDataJSON = [
    {
      studentName: "Nguyễn Vân Anh",
      birthDay: "1999-01-02",
      gendle: "Nữ",
      country: "Thành phố Đà Nẵng",
      email: "anh@gmail.com",
      theory: "7",
      practice: "7",
    },
    {
      studentName: "Vũ Như Bão",
      birthDay: "2003-10-01",
      gendle: "Nam",
      country: "Thành phố Đà Nẵng",
      email: "bao@gmail.com",
      theory: "10",
      practice: "10",
    },
    {
      studentName: "Trần Việt Bình",
      birthDay: "1988-02-13",
      gendle: "Nam",
      country: "Thành phố Đà Nẵng",
      email: "binh@gmail.com",
      theory: "9",
      practice: "6",
    },
    {
      studentName: "Chu Cảnh Chiêu",
      birthDay: "2001-11-22",
      gendle: "Nam",
      country: "Tỉnh Bình Định",
      email: "chieu@gmail.com",
      theory: "5",
      practice: "9",
    },
    {
      studentName: "Trần Dinh",
      birthDay: "1977-05-02",
      gendle: "Nam",
      country: "Tỉnh Ninh Thuận",
      email: "dinh@gmail.com",
      theory: "2",
      practice: "2",
    },
    {
      studentName: "Võ Nam Giang",
      birthDay: "2000-02-02",
      gendle: "Nữ",
      country: "Tỉnh Quảng Ngãi",
      email: "giang@gmail.com",
      theory: "3",
      practice: "6",
    },
    {
      studentName: "Lý Diệu Hoa",
      birthDay: "1997-08-12",
      gendle: "Nữ",
      country: "Tỉnh Đồng Tháp",
      email: "hoa@gmail.com",
      theory: "5",
      practice: "9",
    },
    {
      studentName: "Lê Mỹ Hương",
      birthDay: "1997-08-12",
      gendle: "Nữ",
      country: "Thành phố Hải Phòng",
      email: "huong@gmail.com",
      theory: "9",
      practice: "4",
    },
    {
      studentName: "Mai Văn Học",
      birthDay: "1977-05-02",
      gendle: "Nam",
      country: "Thành phố Đà Nẵng",
      email: "hoc@gmail.com",
      theory: "1",
      practice: "5",
    },
    {
      studentName: "Lê Thị Mỹ Hồng",
      birthDay: "1986-10-21",
      gendle: "Nữ",
      country: "Tỉnh Thừa Thiên Huế",
      email: "hong@gmail.com",
      theory: "10",
      practice: "10",
    },
    {
      studentName: "Trần Thị Lý",
      birthDay: "1995-05-18",
      gendle: "Nữ",
      country: "Tỉnh Quảng Ngãi",
      email: "ly@gmail.com",
      theory: "9",
      practice: "7",
    },
    {
      studentName: "Hoàng Minh",
      birthDay: "1998-09-18",
      gendle: "Nam",
      country: "Thành phố Hà Nội",
      email: "minh@gmail.com",
      theory: "8",
      practice: "8",
    },
    {
      studentName: "Nguyễn Tuấn Nam",
      birthDay: "2002-12-21",
      gendle: "Nam",
      country: "Tỉnh Bình Định",
      email: "nam@gmail.com",
      theory: "5",
      practice: "10",
    },
    {
      studentName: "Mai Tài Phến",
      birthDay: "1993-05-23",
      gendle: "Nam",
      country: "Tỉnh Bình Dương",
      email: "phen@gmail.com",
      theory: "4",
      practice: "5",
    },
    {
      studentName: "Tạ Anh Sơn",
      birthDay: "2001-03-28",
      gendle: "Nam",
      country: "Thành phố Đà Nẵng",
      email: "son@gmail.com",
      theory: "7",
      practice: "7",
    },
    {
      studentName: "Cao Lê Thành",
      birthDay: "1977-05-02",
      gendle: "Nam",
      country: "Thành phố Hà Nội",
      email: "thanhcl@gmail.com",
      theory: "9",
      practice: "10",
    },
    {
      studentName: "Nguyễn Quyết Thắng",
      birthDay: "1989-04-14",
      gendle: "Nam",
      country: "Thành phố Hải Phòng",
      email: "thang@gmail.com",
      theory: "4",
      practice: "10",
    },
    {
      studentName: "Hoàng Thị Tú",
      birthDay: "1998-06-19",
      gendle: "Nữ",
      country: "Thành phố Đà Nẵng",
      email: "tu@gmail.com",
      theory: "7",
      practice: "8",
    },
    {
      studentName: "Nguyễn Nguyệt Vân",
      birthDay: "2000-11-11",
      gendle: "Nữ",
      country: "Thành phố Đà Nẵng",
      email: "van@gmail.com",
      theory: "8",
      practice: "10",
    },
  ];

  studentList.clear().display();
  localStorage.setItem(studentList.storage.key, JSON.stringify(initDataJSON));
  studentList.load().display();
};

window.onload = function () {
  registerForm = new RegisterForm();
  studentList.load();

  $("addStudentButton").onclick = addToStudentList;
  $("clearStudentButton").onclick = clearStudentList;
  // Thêm sự kiện cho nút "Cập nhật" và "Hủy"
  $("updateStudentButton").onclick = updateStudent;
  $("cancelEdit").onclick = cancelEdit;

  $("btnSortName").onclick = sortStudentsByName;
  $("btnSortMark").onclick = sortStudentsByMark;
  $("btnInIt").onclick = resetStudentList;

  studentList.deleteClickHandler = deleteFromStudentList;
  studentList.editClickHandler = editFromStudentList;
  studentList.theLastSort = sortByName;
  studentList.sortDirection = 1;
  studentList.displayDiv = $("studentList");
  studentList.load().display();

  $("fullName").focus();
};
