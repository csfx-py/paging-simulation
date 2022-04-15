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
  <title>Login</title>
</head>

<body>
  <div class="header">Paging and Page Replacement Algorithms</div>
  <div class="container">
    <form action="./server/login.php" method="POST" class="card" onsubmit="return validateLogin()">
      <h1>Login</h1>
      <input type="text" name="srn" id="srn" placeholder="Enter SRN" class="inp" />
      <input type="password" name="password" id="password" placeholder="Enter password" class="inp" />
      <input type="submit" value="Login" class="btn" />
      <a href="./register.html">Not registered?</a>
      <span id="response"></span>
    </form>
  </div>
  <script src="./js/authValidate.js" defer></script>
</body>

</html>