function createPage(proc = 0, page = 0, refType) {
    const div = document.createElement("div");
    div.classList.add("ref");
    div.id = refType + "-" + (parseInt(proc) + 1) + "-" + page;
    div.innerHTML = "Prc" + (parseInt(proc) + 1) + "-Pg-" + page;
    div.style.borderColor = colors[proc];
    return div;
  }