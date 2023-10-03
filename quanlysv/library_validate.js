var Validate = function () {
  this.month = 0;
  this.year = 0;
};
Validate.prototype.isBlank = function (text) {
  return text === "";
};
Validate.prototype.isMatch = function (text1, text2) {
  return text1 === text2;
};
Validate.prototype.isEmail = function (text) {
  if (text.length === 0) return false;
  var parts = text.split("@");
  if (parts.length !== 2) return false;
  if (parts[0].length > 64) return false;
  if (parts[1].length > 255) return false;
  var address = "(^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*$)";
  var quotedText = '(^"(([^\\\\"])|(\\\\[\\\\"]))+"$)';
  var localPart = new RegExp(address + "|" + quotedText);
  if (!parts[0].match(localPart)) return false;
  var hostnames =
    "(([a-zA-Z0-9]\\.)|([a-zA-Z0-9][-a-zA-Z0-9]{0,62}[a-zA-Z0-9]\\.))+";
  var tld = "[a-zA-Z0-9]{2,6}";
  var domainPart = new RegExp("^" + hostnames + tld + "$");
  if (!parts[1].match(domainPart)) return false;
  return true;
};
Validate.prototype.isTheoryScoreValid = function (theoryScore) {
  // Check if the score is a number and within the range [0, 10]
  var numericScore = parseFloat(theoryScore);
  return !isNaN(numericScore) && numericScore >= 0 && numericScore <= 10;
};
Validate.prototype.isBirthYear = function (birthYear) {
  var dayofbirth = parseFloat(birthYear);
  return !isNaN(dayofbirth) && dayofbirth >= 1980 && dayofbirth <= 2004;
};
