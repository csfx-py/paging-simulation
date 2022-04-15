const srn = document.getElementById("srn").value;
const username = document.getElementById("username")?.value;
const course = document.getElementById("course")?.value;
const password = document.getElementById("password").value;
const repassword = document.getElementById("repassword")?.value;

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
  if (!validateSrn(srn)) {
    alert("Invalid SRN");
    return false;
  }

  if (username.length < 3) {
    alert("Invalid username");
    return false;
  }

  if (course.length < 3) {
    alert("Invalid Course");
    return false;
  }

  if (!validatePass(password)) {
    alert("Invalid Password");
    return false;
  }

  if (password !== repassword) {
    alert("Passwords do not match");
    return false;
  }

  return true;
}

function validateLogin() {
  if (!validateSrn(srn)) {
    alert("Invalid SRN");
    return false;
  }

  if (!validatePass(password)) {
    alert("Invalid Password");
    return false;
  }

  return true;
}
