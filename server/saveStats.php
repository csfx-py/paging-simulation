<?php
require_once "config.php";

session_start();

function saveStats(
    $srn,
    $refString,
    $procCount,
    $ramSize,
    $pageSize,
    $frameCount,
    $pageCount,
    $fifoHits,
    $fifoMisses,
    $lruHits,
    $lruMisses
) {
    global $conn;
    $sql = "INSERT INTO stats (
        srn, 
        ref_string,
        proc_count,
        ram_size,
        page_size, 
        frame_count,
        page_count,
        fifo_hits,
        fifo_misses,
        lru_hits,
        lru_misses
        ) VALUES (
        '$srn', 
        '$refString', 
        '$procCount', 
        '$ramSize', 
        '$pageSize', 
        '$frameCount', 
        '$pageCount', 
        '$fifoHits', 
        '$fifoMisses', 
        '$lruHits', 
        '$lruMisses')";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        return true;
    } else {
        return false;
    }
}

if (isset($_POST)) {
    $srn = $_SESSION['srn'];
    $refString = $_POST['refStringIn'];
    $procCount = $_POST['procCountIn'];
    $ramSize = $_POST['ramSizeIn'];
    $pageSize = $_POST['pageSizeIn'];
    $frameCount = $_POST['frameCount'];
    $pageCount = $_POST['pageCount'];
    $fifoHits = $_POST['fifoHitsIn'];
    $lruHits = $_POST['lruHitsIn'];
    $fifoMisses = $_POST['fifoMissesIn'];
    $lruMisses = $_POST['lruMissesIn'];

    if (saveStats(
        $srn,
        $refString,
        $procCount,
        $ramSize,
        $pageSize,
        $frameCount,
        $pageCount,
        $fifoHits,
        $fifoMisses,
        $lruHits,
        $lruMisses
    )) {
        echo "<script>";
        echo "alert('Stats saved');";
        echo "window.location.href = '/simulation.php';";
        echo "</script>";
    } else {
        echo "<script>";
        echo "alert('Stats saving failed');";
        echo "window.location.href = '/simulation.php';";
        echo "</script>";
    }
}
