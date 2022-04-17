const srn = document.getElementById("srn");
const username = document.getElementById("username");
const course = document.getElementById("course");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");

function validateSrn(srn) {
  const srnRegex =
    /(^[a-zA-Z]{3})\d{1}([a-zA-Z]{2})[0-9]{2}([a-zA-Z]{2})([0-9]{3})/;
  if (!srnRegex.test(srn)) {
    return false;
  }
  return true;
}

function validatePass(password) {
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passRegex.test(password)) {
    return false;
  }
  return true;
}

function validateReg() {
  if (!validateSrn(srn.value)) {
    alert("Invalid SRN");
    return false;
  }

  if (username.value.length < 3) {
    alert("Invalid username");
    return false;
  }

  if (course.value.length < 3) {
    alert("Invalid Course");
    return false;
  }

  if (!validatePass(password.value)) {
    alert("Invalid Password");
    return false;
  }

  if (password.value !== repassword.value) {
    alert("Passwords do not match");
    return false;
  }

  return true;
}

function validateLogin() {
  if (!validateSrn(srn.value)) {
    alert("Invalid SRN");
    return false;
  }

  if (!validatePass(password.value)) {
    alert("Invalid Password");
    return false;
  }

  return true;
}
