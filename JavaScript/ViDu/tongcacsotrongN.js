var $ = function (id) {
  return document.getElementById(id);
};

var calculate = function (N) {
  var sum = 0;
  var NStr = N.toString();

  for (var i = 0; i < NStr.length; i++) {
    sum += parseInt(NStr[i]);
  }

  return sum;
};

var EquationString = function (N) {
  var equation = "";
  var NStr = N.toString();

  for (var i = 0; i < NStr.length; i++) {
    equation += NStr[i];
    if (i < NStr.length - 1) {
      equation += "+";
    }
  }

  return equation;
};

var processEntry = function () {
  var N = parseInt($("number_N").value);

  $("N_error").firstChild.nodeValue = "*";

  if (isNaN(N)) {
    $("N_error").firstChild.nodeValue = "N must be numeric";
  } else {
    $("N_error").firstChild.nodeValue = "*";

    var sum = calculate(N);
    var equation = EquationString(N);

    $("result").value = sum;

    var resultHTML = "<h2>Tổng của các chữ số tạo thành số " + N + " là:</h2>";
    resultHTML += "<p>" + equation + " = " + sum + "</p>";
    $("show_result").innerHTML = resultHTML;
  }
};

window.onload = function () {
  $("calculate_sum").onclick = processEntry;
};
