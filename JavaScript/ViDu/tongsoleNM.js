var $ = function (id) {
  return document.getElementById(id);
};

var calculateSum = function (N, M) {
  var sum = 0;

  for (var i = N; i <= M; i++) {
    if (i % 2 !== 0) {
      sum += i;
    }
  }

  return sum;
};

var EquationString = function (N, M) {
  var equation = "";

  for (var i = N; i <= M; i++) {
    if (i % 2 !== 0) {
      // Kiểm tra số lẻ
      equation += i;
      if (i + 2 <= M) {
        equation += "+";
      }
    }
  }

  return equation;
};

var processEntries = function () {
  var N = parseInt($("number_N").value);
  var M = parseInt($("number_M").value);

  $("N_error").firstChild.nodeValue = "*";
  $("M_error").firstChild.nodeValue = "*";

  if (isNaN(N)) {
    $("N_error").firstChild.nodeValue = "Nhập số N";
  } else {
    $("N_error").firstChild.nodeValue = "*";
  }
  if (isNaN(M)) {
    $("M_error").firstChild.nodeValue = "Nhập số M";
  } else {
    $("M_error").firstChild.nodeValue = "*";
  }

  var sum = calculateSum(N, M);
  var equation = EquationString(N, M);

  $("result").value = sum;

  var resultHTML = "<h2>Tổng của các số từ " + N + " đến " + M + " là:</h2>";
  resultHTML += "<p>" + equation + " = " + sum + "</p>";
  $("show_result").innerHTML = resultHTML;
};
window.onload = function () {
  $("calculate_sum").onclick = processEntries;
};
