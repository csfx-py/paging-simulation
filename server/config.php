<?php
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
  }

  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
  }
  
  define('DB_HOST', 'localhost');
  define('DB_USER', 'csfx');
  define('DB_PASS', 'pass');
  define('DB_NAME', 'project');

  $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if ($conn === false) {
      die("Failed to connect to DB. " . mysqli_connect_error());
    }
?>