const validatePassword = (password) => {
  const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

  if (password.length < 8) {
    throw new Error("Password must be longer than 8 characters");
  }
  if (password.length > 72) {
    throw new Error("Password must be less than 72 characters");
  }
  if (password.startsWith(" ") || password.endsWith(" ")) {
    throw new Error("Password must not start or end with empty spaces");
  }
  if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
    throw new Error(
      "Password must contain one upper case, lower case, number and special character"
    );
  }
  return null;
};

const validateEmail = (email) => {
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!emailRegex.test(email)) {
    throw new Error("Please enter a valid email address");
  }
};

module.exports = {
  validatePassword,
  validateEmail,
};
