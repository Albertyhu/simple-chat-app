const genKey = (size) => {
  var key = "";
  for (var i = 0; i < size; i++) {
    key += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return key;
};

//replaces whitespaces in a string with underscore character
function replaceWhiteSpaces(inputString) {
  return inputString.replace(/\s/g, "_");
}

const RemoveUserElem = () => {
  LogoutLink.style.display = "none";
  MenuHeader.innerHTML = "";
  MenuHeader.style.display = "none";
  chatform.style.display = "none";
};
