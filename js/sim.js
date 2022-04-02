// get elements from DOM
const procCount = document.getElementById("proc-count");

const ramInput = document.getElementById("ram");
const ramSize = document.getElementById("ram-size");

const pageSizeInput = document.getElementById("page-size");
const pageSize = document.getElementById("page-size-value");

const pageCount = document.getElementById("page-count");

const algo = document.getElementById("algorithm");
let algoVal = algo.value.toLowerCase();

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
let isStarted = false;

const twoN = [2, 4, 8, 16, 32];
const pagesPerProc = 5;

let ramSlots =
  twoN[parseInt(ramInput.value)] / twoN[parseInt(pageSizeInput.value)];

const colors = ["#f03e16", "#9000d2", "#2fda1f", "#6f020e", "#2299ff"];

const freeSlot = { row: 1, col: 1 };
let maxRows = ramSlots / 2;
const maxCols = 2;

// event listeners
ramInput.addEventListener("input", () => {
  ramSize.innerHTML = twoN[parseInt(ramInput.value)] + "kb";
  pageSizeInput.max = ramInput.value - 1;
  ramSlots =
    twoN[parseInt(ramInput.value)] / twoN[parseInt(pageSizeInput.value)];
  pageCount.innerHTML = ramSlots;
  maxRows = ramSlots / 2;
});

pageSizeInput.addEventListener("input", () => {
  pageSize.innerHTML = twoN[parseInt(pageSizeInput.value)] + "kb";
  ramSlots =
    twoN[parseInt(ramInput.value)] / twoN[parseInt(pageSizeInput.value)];
  pageCount.innerHTML = ramSlots;
  maxRows = ramSlots / 2;
});

algo.addEventListener("change", () => {
  algoVal = algo.value;
});

startBtn.addEventListener("click", () => {
  if (!isStarted) {
    isStarted = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startBtn.classList.add("disabled");
    stopBtn.classList.remove("disabled");
    startAnim();
  }
});

stopBtn.addEventListener("click", () => {
  if (isStarted) {
    isStarted = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    startBtn.classList.remove("disabled");
    stopBtn.classList.add("disabled");
    stopAnim();
  }
});