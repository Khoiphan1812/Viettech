// Định nghĩa đối tượng Sinh viên
var Student = function (
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
};

// Phương thức kiểm tra tính hợp lệ của Sinh viên
Student.prototype.isValid = function () {
  if (
    this.fullName === "" ||
    isNaN(this.birthYear) ||
    this.gender === "" ||
    this.email === "" ||
    isNaN(this.theoryScore) ||
    isNaN(this.practiceScore)
  ) {
    return false;
  }
  return true;
};

// Phương thức tính điểm trung bình của Sinh viên
Student.prototype.calculateAverage = function () {
  var theoryScoreNumber = parseFloat(this.theoryScore);
  var practiceScoreNumber = parseFloat(this.practiceScore);
  // Làm tròn điểm trung bình
  var avg = Math.round(theoryScoreNumber + practiceScoreNumber * 2) / 3;

  return avg;
};
//Phuong thuc xep hang cua sinh vien
Student.prototype.calculateClassification = function () {
  if (this.calculateAverage() >= 8) {
    return "Gioi";
  } else if (this.calculateAverage() > 6) {
    return "Trung Binh";
  } else {
    return "Yeu";
  }
};

//Phuong thuc tinh tuoi cua sinh vien
Student.prototype.calculateAge = function () {
  var currentYear = new Date().getFullYear();
  return currentYear - this.birthYear;
};
