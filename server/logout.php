<?php
session_start();
$des = session_destroy();
if ($des) {
    header("Location: /login.php");
} else {
    echo "Session not destroyed";
}
