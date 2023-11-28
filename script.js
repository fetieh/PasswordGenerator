// Function to prompt user for password options
function getPasswordOptions() {
  var length = prompt("Enter the length of the password (between 8 and 128):");

  // Validate the length input
  if (length < 8 || length > 128 || isNaN(length)) {
    alert("Please enter a valid length between 8 and 128.");
    return null;
  }

  var includeLowercase = confirm("Include lowercase characters?");
  var includeUppercase = confirm("Include uppercase characters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeSpecial = confirm("Include special characters?");

  // Validate that at least one character type is selected
  if (!(includeLowercase || includeUppercase || includeNumeric || includeSpecial)) {
    alert("Please select at least one character type.");
    return null;
  }

  return {
    length: length,
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase,
    includeNumeric: includeNumeric,
    includeSpecial: includeSpecial
  };
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();

  if (!options) {
    return; // User canceled or entered invalid options
  }

  var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numericChars = "0123456789";
  var specialChars = "$@%&*";

  var allChars = "";
  var password = "";

  if (options.includeLowercase) {
    allChars += lowercaseChars;
    password += getRandomChar(lowercaseChars);
  }
  if (options.includeUppercase) {
    allChars += uppercaseChars;
    password += getRandomChar(uppercaseChars);
  }
  if (options.includeNumeric) {
    allChars += numericChars;
    password += getRandomChar(numericChars);
  }
  if (options.includeSpecial) {
    allChars += specialChars;
    password += getRandomChar(specialChars);
  }

  // Fill the remaining length of the password
  for (var i = password.length; i < options.length; i++) {
    password += getRandomChar(allChars);
  }

  return password;
}

// Function for getting a random element from an array
function getRandomChar(chars) {
  var randomIndex = Math.floor(Math.random() * chars.length);
  return chars.charAt(randomIndex);
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the page
function writePassword() {
  var password = generatePassword();
  var passwordText = document.getElementById("password");

  if (password) {
    passwordText.innerText = "Generated Password: " + password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
