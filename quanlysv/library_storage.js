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
  var getStudentStorage = function (key) {
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
  // Định nghĩa đối tượng Student
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
  
    // Phương thức tính xếp loại
    this.calculateClassification = function () {
        var theoryScoreNumber = parseFloat(this.theoryScore);
        var practiceScoreNumber = parseFloat(this.practiceScore);
        (theoryScoreNumber + practiceScoreNumber * 2) / 3;
      var averageScore =   (theoryScoreNumber + practiceScoreNumber * 2) / 3;
      if (averageScore >= 8) {
        return "Giỏi";
      }  else if (averageScore >=6){
          return "Kha"
      }else{
        return "Yếu";
      }
    };
    };
  
  // Ví dụ về cách tạo một đối tượng Student
  var newStudent = new Student(
    "Nguyễn Văn A",
    1995,
    "Nam",
    "example@example.com",
    "Hà Nội",
    8,
    7
  );