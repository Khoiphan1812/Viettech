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
  return ((this.theoryScore + this.practiceScore * 2) / 3).toFixed(2);
};
