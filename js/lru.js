async function lru(ramSlots, procCount) {
  const currentRam = [];
  const refString = [];

  // get ram-refs
  const ramRefs = document.getElementById("ram-refs");

  //   get hdd
  const hdd = document.getElementById("hdd");

  // grid rows for ramrefs set ram slots / 2
  ramRefs.style.gridTemplateRows = "repeat(" + ramSlots / 2 + ", 1fr)";

  // loop processes 10 times
  for (let i = 0; i < iterationCount; i++) {
    for (let j = 0; j < procCount; j++) {
      // highlight process
      const proc = document.getElementById("proc-" + j);
      proc.classList.add("active");
      // request random page 0 to pagesPerProc for current process
      const page = Math.floor(Math.random() * pagesPerProc);
      logger.innerHTML =
        "Process <b>" + (j + 1) + "</b> requesting page <b>" + page + "</b>";
      refString.push(`${j + 1}-${page}`);

      // check page exists in ram
      if (ramRefs.querySelector("#ram-" + (j + 1) + "-" + page)) {
        logger.innerHTML += `<span style="color:green">: Already in RAM`;

        // if page exists in ram, highlight page
        const pageRef = ramRefs.querySelector("#ram-" + (j + 1) + "-" + page);
        pageRef.classList.add("active");

        //   get element to first location in currentRam
        const refIndex = currentRam.findIndex((ref) => ref.id === pageRef.id);
        const swapRef = currentRam[refIndex];
        currentRam.splice(refIndex, 1);
        currentRam.push({
          id: swapRef.id,
          row: swapRef.row,
          col: swapRef.col,
        });

        // remove active after 2000ms
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (1 / animSpeed))
        );
        pageRef.classList.remove("active");
      } else {
        // create page
        const ref = createPage(j, page, "ram");

        // check ram full
        if (ramRefs.childElementCount >= ramSlots) {
          // get first element from currentRam
          const first = currentRam.shift();

          // remove page from ram
          const page = document.getElementById(first.id);
          const pageProcID = parseInt(page.id.split("-")[1]);
          const pagePageID = parseInt(page.id.split("-")[2]);

          const hddPage = createPage(pageProcID - 1, pagePageID, "hdd");

          // remove page from ram and add to hdd
          page.classList.add("ref-scale-down");
          hddPage.style.gridRow = pageProcID;
          hddPage.style.gridColumn = pagePageID + 1;
          hdd.appendChild(hddPage);
          await new Promise((resolve) =>
            setTimeout(resolve, 500 * (1 / animSpeed))
          );
          ramRefs.removeChild(page);
          hddPage.classList.add("ref-scale-up");
          freeSlot.col = first.col;
          freeSlot.row = first.row;
          logger.innerHTML += `<span style="color:red">: Page swapped at 
          </span><b>ram offset ${first.row}-${first.col}</b>`;
        }
        // add row and col to currentRam
        currentRam.push({ id: ref.id, row: freeSlot.row, col: freeSlot.col });

        const hddPage = document.getElementById("hdd-" + (j + 1) + "-" + page);
        hddPage.classList.add("ref-scale-down");
        ramRefs.appendChild(ref);
        await new Promise((resolve) =>
          setTimeout(resolve, 500 * (1 / animSpeed))
        );
        hdd.removeChild(hddPage);
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
      await new Promise((resolve) =>
        setTimeout(resolve, 2000 * (1 / animSpeed))
      );
      proc.classList.remove("active");
    }
  }
  createStats(ramSlots, refString);
}
