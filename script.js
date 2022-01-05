const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "DEFAULT";

let selectedColor = DEFAULT_COLOR;
let selectedMode = DEFAULT_MODE;

const grid = document.getElementById("grid");
const eraser = document.getElementById("eraser");
const color = document.getElementById("color");
const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("range");
const clear = document.getElementById("clear");
const rainbow = document.getElementById("rainbow");
let size = slider.value;
sliderText.innerHTML = slider.value;
eraser.onclick = (e) => updateMode(e, "eraser");
color.onclick = (e) => updateMode(e, DEFAULT_COLOR);
rainbow.onclick = (e) => updateMode(e, "rainbow");
slider.onchange = (e) => updateSize(e.target.value);
slider.onmousemove = (e) => updateSizeText(e.target.value);
clear.onclick = () => reload();
function updateMode(e, mode) {
  clearButtonStyle();
  e.target.style.backgroundColor = "black";
  e.target.style.color = "white";
  selectedColor = mode;
}

function generateGrid() {
  for (let i = 0; i < size * size; i++) {
    const create = document.createElement("div");
    const dimensions = Math.round((500 / size) * 100) / 100;
    create.classList.add("block");
    create.style.width = dimensions + "px";
    create.style.height = dimensions + "px";
    create.style.padding = 0;
    create.style.margin = 0;
    create.addEventListener("mouseover", paint);
    grid.appendChild(create);
  }
}

function reload() {
  grid.innerHTML = "";
  generateGrid();
}

function paint(e) {
  if (selectedColor === DEFAULT_COLOR) {
    e.target.style.backgroundColor = selectedColor;
  } else if (selectedColor === "eraser") {
    e.target.style.backgroundColor = "white";
  } else if (selectedColor === "rainbow") {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
}

function updateSize(value) {
  size = value;
  console.log(size);
  reload();
}

function updateSizeText(value) {
  sliderText.innerHTML = value;
}

function clearButtonStyle() {
  eraser.style.backgroundColor = "white";
  eraser.style.color = "black";
  color.style.backgroundColor = "white";
  color.style.color = "black";
  rainbow.style.color = "black";
  rainbow.style.backgroundColor = "white";
}
window.onload = () => {
  generateGrid();
};
