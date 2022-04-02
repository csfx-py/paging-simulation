import { createPage } from "./createPage";

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


function fifo(){
  // TODO: implement FIFO algorithm
}

const startAnim = (e) => {
  const div = createPage(0, 0);
  console.log(div);
  // get queue div
  const queueDiv = document.getElementById("queue");
  // add procCount number of divs to queue div
  for (let i = 0; i < procCount.value; i++) {
    const div = document.createElement("div");
    div.classList.add("queue-item");
    div.id = "proc-" + i;
    div.innerHTML = "Process " + (i + 1);
    div.style.borderColor = colors[i];
    queueDiv.appendChild(div);
  }

  // get ram-refs
  const ramRefs = document.getElementById("ram-refs");

  // grid rows for ramrefs set ram slots / 2
  ramRefs.style.gridTemplateRows = "repeat(" + ramSlots / 2 + ", 1fr)";

  // start fifo algorithm
  if (algoVal === "fifo") {
    fifo();
  }
};

const stopAnim = (e) => {
  // reset
  const queueDiv = document.getElementById("queue");
  queueDiv.innerHTML = "";
  const ramRefs = document.getElementById("ram-refs");
  ramRefs.innerHTML = "";
  freeSlot = { row: 1, col: 1 };
};