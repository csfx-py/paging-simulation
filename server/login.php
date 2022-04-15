<?php
require_once "config.php";

session_start();

function auth($srn, $password)
// authenticate srn and password
{
    global $conn;
    $sql = "SELECT * FROM student WHERE srn = '$srn'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if ($row['password'] == $password) {
            return true;
        }
    }
    return false;
}

if (isset($_POST['srn']) && isset($_POST['password'])) {
    if (auth($_POST['srn'], $_POST['password'])) {
        $_SESSION['srn'] = $_POST['srn'];
        echo "<script>window.location.href = '/simulation.php';</script>";
    } else {
        echo "<script>";
        echo "alert('Invalid credentials');";
        echo "window.location.href = '/login.php';";
        echo "</script>";
    }
} else {
    echo "<script>";
    echo "alert('Invalid credentials');";
    echo "window.location.href = '/login.php';";
    echo "</script>";
}
