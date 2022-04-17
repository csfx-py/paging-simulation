<?php
session_start();
session_regenerate_id();
if (!isset($_SESSION['srn']))      // if there is no valid session
{
  header("Location: /login.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./css/sim.css" />
  <title>Page Replacement Simulation</title>
</head>

<body>
  <div class="header">Paging and Page Replacement Algorithms</div>
  <div class="container">
    <nav>
      <ul>
        <li>
          <label for="proc-count">Number of Processes:</label><br />
          <input type="range" name="proc-count" id="proc-count" min="2" max="5" value="2" oninput="this.nextElementSibling.value = this.value" />
          <output>2</output>
        </li>
        <li>
          <label for="ram">Ram Size:</label><br />
          <input type="range" name="ram" id="ram" min="1" max="4" value="2" />
          <span id="ram-size">8kb</span>
        </li>
        <li>
          <label for="page-size">Page Size:</label><br />
          <input type="range" name="page-size" id="page-size" min="0" max="1" value="0" />
          <span id="page-size-value">2kb</span>
        </li>
        <li>
          <span>Page Count: <span id="page-count">4</span></span>
        </li>
        <li>
          <label for="anim-speed">Animation speed:</label><br />
          <input type="range" name="anim-speed" id="anim-speed" min="0.5" max="3" step="0.25" value="1" />
          <span id="anim-out">1</span>
        </li>
        <li>
          <label for="algorithm">Algorithm:</label><br />
          <select name="algorithm" id="algorithm">
            <option value="FIFO" selected>FIFO</option>
            <option value="LRU">LRU</option>
          </select>
        </li>
      </ul>
      <button class="control-btn start" id="start">Start</button>
      <button class="control-btn stop disabled" id="stop" disabled>
        Reset
      </button>
    </nav>
    <div class="dash"></div>
    <main id="main-container">
      <div class="top">
        <img src="./assets/cpu.png" alt="" class="icon" />
        <h3>Page Reference</h3>
        <div id="queue"></div>
        <div id="log"></div>
      </div>
      <div class="bottom" id="bottom">
        <div class="primary-container">
          <img class="icon" src="./assets/ram.png" alt="" />
          <div class="refs" id="ram-refs"></div>
        </div>
        <div class="secondary-container">
          <img class="icon" src="./assets/hdd.jpg" alt="" />
          <div class="refs" id="hdd"></div>
        </div>
      </div>
      <form action="./server/saveStats.php" method="POST" class="results" id="stats">
        <table>
          <thead>
            <tr>
              <th>Reference String</th>
              <th colspan="4" id="refString"></th>
            </tr>
            <tr>
              <th>Algorithm</th>
              <th>Number of Frames</th>
              <th>Pages</th>
              <th>Hits</th>
              <th>Miss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FIFO</td>
              <td class="frame-size"></td>
              <td class="pagePerProc"></td>
              <td id="fifoHits"></td>
              <td id="fifoMisses"></td>
            </tr>
            <tr>
              <td>LRU</td>
              <td class="frame-size"></td>
              <td class="pagePerProc"></td>
              <td id="lruHits"></td>
              <td id="lruMisses"></td>
            </tr>
          </tbody>
        </table>
        <input type="hidden" name="refStringIn" id="refStringIn">
        <input type="hidden" name="procCountIn" id="procCountIn">
        <input type="hidden" name="ramSizeIn" id="ramSizeIn">
        <input type="hidden" name="pageSizeIn" id="pageSizeIn">
        <input type="hidden" name="frameCount" id="frameCount">
        <input type="hidden" name="pageCount" id="pageCount">
        <input type="hidden" name="fifoHitsIn" id="fifoHitsIn">
        <input type="hidden" name="fifoMissesIn" id="fifoMissesIn">
        <input type="hidden" name="lruHitsIn" id="lruHitsIn">
        <input type="hidden" name="lruMissesIn" id="lruMissesIn">
        <input type="submit" value="Save" class="control-btn" id="ref-save" />
      </form>
    </main>
  </div>
  <script src="./js/createPage.js" defer></script>
  <script src="./js/stats.js" defer></script>
  <script src="./js/fifo.js" defer></script>
  <script src="./js/lru.js" defer></script>
  <script src="./js/sim.js" defer></script>
</body>

</html>