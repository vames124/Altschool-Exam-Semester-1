let timer;
let milliseconds = 0;
let isRunning = false;

const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");
const startPauseBtn = document.getElementById("startPause");
const lapClearBtn = document.getElementById("lapClear");


function formatTime(ms) {
  const hrs = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const mins = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const msec = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return `${hrs}:${mins}:${secs}.${msec}`;
}

function updateDisplay() {
  display.textContent = formatTime(milliseconds);
}

function tick() {
  milliseconds += 10;
  updateDisplay();
  timer = setTimeout(tick, 10);
}

startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    tick();
    startPauseBtn.textContent = "PAUSE";
    lapClearBtn.textContent = "LAP";
    lapClearBtn.style.display = "inline-block";
  } else {
    clearTimeout(timer);
    isRunning = false;
    startPauseBtn.textContent = "START";
    lapClearBtn.textContent = "CLEAR";
    lapClearBtn.style.display = "inline-block";
  }
});

lapClearBtn.addEventListener("click", () => {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = `Lap ${lapsContainer.children.length + 1}: ${formatTime(milliseconds)}`;
    lapsContainer.appendChild(li);
  } else {
    lapsContainer.innerHTML = "";
    milliseconds = 0;
    updateDisplay();
    lapClearBtn.style.display = "none"; 
  }
});


const toggle = document.getElementById("modeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});
