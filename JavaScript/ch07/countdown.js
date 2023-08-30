var $ = function (id) {
  return document.getElementById(id);
};
var calculateDays = function () {
  var event = $("event").value;
  var dt = $("date").value;
  var message = $("message").firstChild;

  if (event.length == 0 || dt.length == 0) {
    message.nodeValue = "Please enter a name and a date.";
    return;
  }

  if (dt.indexOf("/") == -1) {
    message.nodeValue = "Please enter the date in MM/DD/YYYY format.";
    return;
  }
  var year = dt.substring(dt.length - 4);
  if (isNaN(year)) {
    message.nodeValue = "Please enter the date in MM/DD/YYYY format.";
    return;
  }

  var date = new Date(dt);
  if (date == "Invalid Date") {
    message.nodeValue = "Please enter the date in MM/DD/YYYY format.";
    return;
  }

  var today = new Date();
  var oneDay = 24 * 60 * 60 * 1000;
  var days = (date.getTime() - today.getTime()) / oneDay;
  days = Math.ceil(days);

  if (days == 0) {
    message.nodeValue = "Hooray! Today is".concat(
      event.toLowerCase(),
      "!\n(",
      date.toDateString(),
      ")"
    );
  }

  if (days < 0) {
    event = event.substring(0, 1).toUpperCase() + event.substring(1);
    message.nodeValue = event.concat(
      "happened",
      Match.abs(days),
      "day(s) ago. \n (",
      date.toDateString(),
      ")"
    );
  }

  if (days > 0) {
    message.nodeValue = days
      .toString()
      .concat(
        "day (s) until ",
        event.toLowerCase(),
        "!\n",
        date.toDateString(),
        ")"
      );
  }
};
window.onload = function () {
  $("countdown").onclick = calculateDays;
  $("event").focus();
};
