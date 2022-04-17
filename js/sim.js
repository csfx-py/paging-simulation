// get elements from DOM
const procCount = document.getElementById("proc-count");

const ramInput = document.getElementById("ram");
const ramSize = document.getElementById("ram-size");

const pageSizeInput = document.getElementById("page-size");
const pageSize = document.getElementById("page-size-value");

const pageCount = document.getElementById("page-count");

const algo = document.getElementById("algorithm");
let algoVal = algo.value.toLowerCase();

const animSpeedInput = document.getElementById("anim-speed");
const animSpeedOut = document.getElementById("anim-out");
let animSpeed = 1;

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
let isStarted = false;

const logger = document.getElementById("log");

const twoN = [2, 4, 8, 16, 32];
const pagesPerProc = 5;
const iterationCount = 10;

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
  algoVal = algo.value.toLowerCase();
});

animSpeedInput.addEventListener("input", () => {
  animSpeed = animSpeedInput.value;
  animSpeedOut.innerHTML = animSpeed;
});

startBtn.addEventListener("click", () => {
  if (!isStarted) {
    isStarted = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startBtn.classList.add("disabled");
    stopBtn.classList.remove("disabled");

    // disable all controls
    procCount.disabled = true;
    ramInput.disabled = true;
    pageSizeInput.disabled = true;
    algo.disabled = true;

    // add disabled class to all controls
    procCount.classList.add("disabled");
    ramInput.classList.add("disabled");
    pageSizeInput.classList.add("disabled");
    algo.classList.add("disabled");
    startAnim();
  }
});

stopBtn.addEventListener("click", async () => {
  if (isStarted) {
    stopBtn.disabled = true;
    stopBtn.classList.add("disabled");
    // cursor loading
    document.body.style.cursor = "progress";
    await new Promise((resolve) => setTimeout(resolve, 3000));
    isStarted = false;
    stopAnim();
    startBtn.disabled = false;
    startBtn.classList.remove("disabled");

    // enable all controls
    procCount.disabled = false;
    ramInput.disabled = false;
    pageSizeInput.disabled = false;
    algo.disabled = false;

    // remove disabled class from all controls
    procCount.classList.remove("disabled");
    ramInput.classList.remove("disabled");
    pageSizeInput.classList.remove("disabled");
    algo.classList.remove("disabled");
    // hide table
    document.getElementById("stats").style.visibility = "hidden";
    document.body.style.cursor = "default";
  }
});

const startAnim = async (e) => {
  const bottomDiv = document.getElementById("bottom");
  bottomDiv.scrollIntoView({ behavior: "smooth" });
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

  // get hdd
  const hdd = document.getElementById("hdd");

  // hdd grid rows = procCount
  hdd.style.gridTemplateRows = "repeat(" + procCount.value + ", 1fr)";

  // hdd grid cols = per proc pages
  hdd.style.gridTemplateColumns = "repeat(" + pagesPerProc + ", 1fr)";

  // add procCount * pagesPerProc pages to hdd
  for (let i = 0; i < procCount.value; i++) {
    for (let j = 0; j < pagesPerProc; j++) {
      const ref = createPage(i, j, "hdd");
      ref.style.gridRow = i + 1;
      ref.style.gridColumn = j + 1;
      hdd.appendChild(ref);
      ref.classList.add("ref-scale-up");
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  // start fifo algorithm
  if (algoVal === "fifo") {
    fifo(ramSlots, parseInt(procCount.value));
  }

  // start lru algorithm
  if (algoVal === "lru") {
    lru(ramSlots, parseInt(procCount.value));
  }
};

const stopAnim = (e) => {
  // reset
  const queueDiv = document.getElementById("queue");
  queueDiv.innerHTML = "";
  const ramRefs = document.getElementById("ram-refs");
  ramRefs.innerHTML = "";
  const hdd = document.getElementById("hdd");
  hdd.innerHTML = "";
  const logs = document.getElementById("log");
  logs.innerHTML = "";
  freeSlot.row = 1;
  freeSlot.col = 1;
};
