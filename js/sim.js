const ramInput = document.getElementById("ram");
ramInput.addEventListener("change", () => {
  const ramValues = [1, 2, 4, 8, 16, 32, 64];
  const ramSize = document.getElementById("ram-size");
  console.log(ramInput.value);
  console.log(ramValues[ramInput.value]);
  console.log(ramSize);
  ramSize.innerHTML = ramValues[parseInt(ramInput.value) - 1] + "kb";
});
