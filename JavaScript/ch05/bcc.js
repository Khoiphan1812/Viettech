var $ = function (id) {
  return document.getElementById(id);
};

var inBangCuuChuong = function (n) {
  var result = "";
  for (var i = 1; i <= 10; i++) {
    result += n + " * " + i + " = " + n * i + "<br>";
  }
  return result;
};

var processEntries = function () {
  var isValid = true;
  var bcc = $("bcc").value;
  var number = parseInt($("bcc").value);
  var result = inBangCuuChuong(number);
  $("show_result").innerHTML =
    "<h2>Bang Cuu Chuong So" + number + "</h2> <br>" + result;
};
window.onload = function () {
  $("bcc").onchange = processEntries;
};
