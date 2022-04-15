<?php
require_once "config.php";

session_start();

function isExist($srn)
// check if srn is already registered
{
  global $conn;
  $sql = "SELECT * FROM student WHERE srn = '$srn'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    return true;
  }
  return false;
}

function register($srn, $name, $course, $password)
// register new student
{
  global $conn;
  $sql = "INSERT INTO student (srn, name, course, password) VALUES ('$srn', '$name', '$course', '$password')";
  if (mysqli_query($conn, $sql)) {
    return true;
  } else {
    return false;
  }
}

if (isset($_POST)) {
  $name = $_POST['username'];
  $srn = $_POST['srn'];
  $course = $_POST['course'];
  $password = $_POST['password'];
  if (isExist($srn)) {
    echo "<script>";
    echo "alert('SRN already exists');";
    echo "window.location.href = './register.html';";
    echo "</script>";
  } else {
    if (register($srn, $name, $course, $password)) {
      $_SESSION['srn'] = $_POST['srn'];
      header("Location: /simulation.php");
    } else {
      echo "<script>";
      echo "alert('Registration failed');";
      echo "window.location.href = './register.html';";
      echo "</script>";
    }
  }
}
