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

stopBtn.addEventListener("click", async () => {
  if (isStarted) {
    stopBtn.disabled = true;
    stopBtn.classList.add("disabled");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    isStarted = false;
    stopAnim();
    startBtn.disabled = false;
    startBtn.classList.remove("disabled");
  }
});

function createPage(proc = 0, page = 0) {
  const div = document.createElement("div");
  div.classList.add("ref");
  div.id = "page-" + (parseInt(proc) + 1) + "-" + page;
  div.innerHTML = "Proc-" + (parseInt(proc) + 1) + "-Page-" + page;
  div.style.borderColor = colors[proc];
  return div;
}

async function fifo(ramSlots, procCount) {
  const firstIn = [];

  // get ram-refs
  const ramRefs = document.getElementById("ram-refs");

  // grid rows for ramrefs set ram slots / 2
  ramRefs.style.gridTemplateRows = "repeat(" + ramSlots / 2 + ", 1fr)";

  // loop processes 10 times
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < procCount; j++) {
      // highlight process
      const proc = document.getElementById("proc-" + j);
      proc.classList.add("active");
      // request random page 0 to pagesPerProc for current process
      const page = Math.floor(Math.random() * pagesPerProc);
      // check page exists in ram
      if (ramRefs.querySelector("#page-" + (j + 1) + "-" + page)) {
        // if page exists in ram
        // highlight page
        const pageRef = ramRefs.querySelector("#page-" + (j + 1) + "-" + page);
        pageRef.classList.add("active");
        // remove active after 500ms
        await new Promise((resolve) => setTimeout(resolve, 1000));
        pageRef.classList.remove("active");
      } else {
        // create page
        const ref = createPage(j, page);
        // check ram full
        if (ramRefs.childElementCount >= ramSlots) {
          // get first element from firstIn
          const first = firstIn.shift();
          // remove page from ram
          const page = document.getElementById(first.id);
          // remove page from ram
          page.classList.add("ref-scale-down");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          ramRefs.removeChild(page);
          freeSlot.col = first.col;
          freeSlot.row = first.row;
        }
        // add row and col to firstIn
        firstIn.push({ id: ref.id, row: freeSlot.row, col: freeSlot.col });
        ramRefs.appendChild(ref);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        ref.classList.add("ref-scale-up");
        // add page to ram freeslot
        ref.style.gridRow = freeSlot.row;
        ref.style.gridColumn = freeSlot.col;
        if (freeSlot.col === maxCols && freeSlot.row < maxRows) {
          // increment free slot
          freeSlot.col = 1;
          freeSlot.row++;
        } else {
          freeSlot.col++;
        }
        // wait for animSpeed
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
      proc.classList.remove("active");
    }
  }
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
    fifo(ramSlots, parseInt(procCount.value));
  }
};

const stopAnim = (e) => {
  // reset
  const queueDiv = document.getElementById("queue");
  queueDiv.innerHTML = "";
  const ramRefs = document.getElementById("ram-refs");
  ramRefs.innerHTML = "";
  freeSlot.row = 1;
  freeSlot.col = 1;
};
