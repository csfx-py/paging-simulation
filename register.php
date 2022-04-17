<?php
session_start();
session_regenerate_id();
if (isset($_SESSION['srn']))      // if there is valid session
{
  header("Location: /simulation.php");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./css/auth.css" />
  <title>Register</title>
</head>

<body>
  <div class="header">Paging and Page Replacement Algorithms</div>
  <div class="container">
    <form action="./server/register.php" method="POST" class="card" onsubmit="return validateReg()">
      <h1>Register</h1>
      <input type="text" name="username" id="username" placeholder="Enter Full Name" class="inp" />
      <input type="text" name="srn" id="srn" placeholder="Enter SRN" class="inp" />
      <input type="text" name="course" id="course" placeholder="Enter Course" class="inp" />
      <input type="password" name="password" id="password" placeholder="Enter password" class="inp" />
      <small>
        Password must contain at least one number,<br />
        one letter and one special character
      </small>

      <input type="password" name="repassword" id="repassword" placeholder="Confirm password" class="inp" />
      <input type="submit" value="Register" class="btn" />
      <a href="./login.php">Already registered?</a>
      <span id="response"></span>
    </form>
  </div>
</body>

</html>