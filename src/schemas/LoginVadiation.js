export function validateEmail(email) {
  let error = "";
  
  if (!email) {
    error = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    error = "Please enter a valid email address.";
  }

  return error;
}

export function validatePassword(password) {
  let error = "";

  if (!password) {
    error = "Password is required";
  } else if (password.length < 8) {
    error = "Password must be at least 8 characters long.";
  }

  return error;
}

export function validateName(name) {
  let error = "";

  if (!name) {
    error = "Name is required.";
  }

  return error;
}

export function validateConfirmPassword(pass, repass) {
  return pass === repass ? "" : "Passwords don't match.";
}
