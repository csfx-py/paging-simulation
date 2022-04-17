function createStats(ramSlots, refString) {
  stats = [];
  stats.push(fifoStats(ramSlots, refString));
  stats.push(lruStats(ramSlots, refString));

  // get table
  const table = document.getElementById("stats");
  // table visible
  table.style.visibility = "visible";
  // get first tr second th
  const refTh = document.getElementById("refString");
  // show refString
  refTh.innerHTML = refString.toString().replace(/,/g, ", ");

  // get hidden inputs for post
  const refIn = document.getElementById("refStringIn");
  const procCountIn = document.getElementById("procCountIn");
  const ramSizeIn = document.getElementById("ramSizeIn");
  const pageSizeIn = document.getElementById("pageSizeIn");
  const frameCountIn = document.getElementById("frameCount");
  const pageCountIn = document.getElementById("pageCount");
  const fifoHitsIn = document.getElementById("fifoHitsIn");
  const fifoMissesIn = document.getElementById("fifoMissesIn");
  const lruHitsIn = document.getElementById("lruHitsIn");
  const lruMissesIn = document.getElementById("lruMissesIn");
  refIn.value = refString.toString().replace(/,/g, ", ");
  procCountIn.value = procCount.value;
  ramSizeIn.value = twoN[parseInt(ramInput.value)];
  pageSizeIn.value = twoN[parseInt(pageSizeInput.value)];
  frameCountIn.value = ramSlots;
  pageCountIn.value = pagesPerProc;
  fifoHitsIn.value = stats[0].hits;
  fifoMissesIn.value = stats[0].misses;
  lruHitsIn.value = stats[1].hits;
  lruMissesIn.value = stats[1].misses;

  // get by class frame-size
  const frameSize = document.getElementsByClassName("frame-size");
  // set frame size for all
  for (let i = 0; i < frameSize.length; i++) {
    frameSize[i].innerHTML = ramSlots;
  }

  // get by class pagePerProc
  const pagePerProc = document.getElementsByClassName("pagePerProc");
  // set pagePerProc for all
  for (let i = 0; i < pagePerProc.length; i++) {
    pagePerProc[i].innerHTML = pagesPerProc;
  }

  // get fifoHits
  const fifoHits = document.getElementById("fifoHits");
  fifoHits.innerHTML = stats[0].hits;
  // get fifoMisses
  const fifoMisses = document.getElementById("fifoMisses");
  fifoMisses.innerHTML = stats[0].misses;

  // get lruHits
  const lruHits = document.getElementById("lruHits");
  lruHits.innerHTML = stats[1].hits;
  // get lruMisses
  const lruMisses = document.getElementById("lruMisses");
  lruMisses.innerHTML = stats[1].misses;

  // scroll to table
  table.scrollIntoView({ behavior: "smooth" });
}

function fifoStats(ramSlots, refString) {
  hits = 0;
  misses = 0;
  frames = [];
  for (let i = 0; i < refString.length; i++) {
    if (frames.length >= ramSlots) {
      frames.shift();
    }
    if (frames.includes(refString[i])) {
      hits++;
    } else {
      misses++;
      frames.push(refString[i]);
    }
  }
  return { hits, misses };
}

function lruStats(ramSlots, refString) {
  hits = 0;
  misses = 0;
  frames = [];
  for (let i = 0; i < refString.length; i++) {
    if (frames.length >= ramSlots) {
      frames.shift();
    }
    if (frames.includes(refString[i])) {
      hits++;
      frames.splice(frames.indexOf(refString[i]), 1);
      frames.push(refString[i]);
    } else {
      misses++;
      frames.push(refString[i]);
    }
  }
  return { hits, misses };
}
