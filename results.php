<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Swapping Algorithms Stats</title>
    <link rel="stylesheet" href="./css/res.css">
    <link href="https://fonts.googleapis.com/css2?family=Beau+Rivage&display=swap" rel="stylesheet">
</head>

<body>
    <div class="header">Paging and Page Replacement Algorithms</div>
    <h1>
        Results for Page Swapping Algorithms by users
    </h1>
    <?php
    require_once "./server/config.php";
    $sql = "SELECT *, name FROM stats join student on stats.srn = student.srn";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    if ($resultCheck > 0) {
        echo "<h2>Number of registered users: " . mysqli_num_rows(mysqli_query($conn, "SELECT * FROM student")) . "</h2>";
        echo "<h2>Number of times simuation saved: " . $resultCheck . "</h2>";
        echo "<table>";
        echo "<tr>";
        echo "<th>SRN</th>";
        echo "<th>Ref String</th>";
        echo "<th>Process Count</th>";
        echo "<th>Ram Size</th>";
        echo "<th>Page Size</th>";
        echo "<th>Frame Count</th>";
        echo "<th>Page Count</th>";
        echo "<th>FIFO Hits</th>";
        echo "<th>FIFO Misses</th>";
        echo "<th>LRU Hits</th>";
        echo "<th>LRU Misses</th>";
        echo "</tr>";
        while ($row = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>" . $row['srn'] . "<br /><b>" . $row['name'] . "</b></td>";
            echo "<td>" . $row['ref_string'] . "</td>";
            echo "<td>" . $row['proc_count'] . "</td>";
            echo "<td>" . $row['ram_size'] . "KB</td>";
            echo "<td>" . $row['page_size'] . "KB</td>";
            echo "<td>" . $row['frame_count'] . "</td>";
            echo "<td>" . $row['page_count'] . "</td>";
            echo "<td>" . $row['fifo_hits'] . "</td>";
            echo "<td>" . $row['fifo_misses'] . "</td>";
            echo "<td>" . $row['lru_hits'] . "</td>";
            echo "<td>" . $row['lru_misses'] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "No results found";
    }
    ?>
    <script>
        // for each row in table, get 2nd column
        document.querySelectorAll('tr').forEach(function(row) {
            // get 2nd column
            var col = row.querySelectorAll('td')[1];
            // if 2nd column is not empty
            if (col?.innerHTML) {
                // get the value of 2nd column
                var val = col.innerHTML;
                // split by comma
                var arr = val.split(',');
                // put br tag after every 10 elements
                for (var i = 1; i < arr.length; i++) {
                    if (i % 10 == 0) {
                        arr[i - 1] = arr[i - 1] + ' |<br />      ';
                    }
                }
                // join the array
                var newVal = arr.join(' | ');
                // replace the value of 2nd column
                col.innerHTML = ' | ' + newVal + ' | ';
            }
        });
    </script>
</body>

</html>