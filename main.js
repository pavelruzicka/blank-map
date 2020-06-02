const $ = document.querySelector.bind(document);
const $$ = (s) => document.querySelectorAll(s);

const elNext = $("#next");
const elRemaining = $("#remaining");
const elTotal = $("#total");
const elTime = $("#time");

let live = 0;
let clock = 300;

let totalRegions = 0;
const regions = {};
let regionSequence = [];
let clickedRegions = [];

function format(reg) {
  return reg ? `Where is <strong>${reg}</strong>?` : `Well done!`;
}

function colorRegion(el, color) {
  let fill, stroke;

  switch (color) {
    case "red":
      fill = "#FF4949";
      stroke = "#BF0000";
      break;

    case "blue":
      fill = "#1FB6FF";
      stroke = "#008cd0";
      break;

    default:
      fill = "#29EB7F";
      stroke = "#13CE66";
  }

  el.style.fill = fill;
  el.style.stroke = stroke;
}

function addRegionTitle(el) {
  const title = document.createElementNS("http://www.w3.org/2000/svg", "title");

  title.textContent = el.dataset.name;
  el.appendChild(title);
}

function handleRegionClick(event, minefield) {
  if (live === 2) return;
  if (!live) live = 1;

  const { target } = event;
  const { id } = target;

  if (clickedRegions.includes(id)) return;

  const current = regionSequence[0];

  if (current === id) {
    clickedRegions.push(regionSequence.shift());
    elNext.innerHTML = format(regions[regionSequence[0]]);
    elRemaining.textContent = --totalRegions;

    if (!totalRegions) {
      live = 0;
    }

    colorRegion(target, "green");
    addRegionTitle(target);
  } else if (minefield) {
    const actual = $(`#${current}`);

    live = 2;
    elNext.innerHTML = `No, that's <strong>${regions[id]}</strong>.`;

    colorRegion(target, "red");
    colorRegion(actual, "blue");
    addRegionTitle(target);
    addRegionTitle(actual);
  }
}

function processRegions(minefield) {
  for (let region of $$("#map .state > path")) {
    totalRegions++;
    regions[region.id] = region.dataset.name;

    region.addEventListener("click", (e) => handleRegionClick(e, minefield));
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffleRegions() {
  let regionIds = Object.keys(regions);

  for (let i = totalRegions - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [regionIds[i], regionIds[j]] = [regionIds[j], regionIds[i]];
  }

  return regionIds;
}

function not(bool) {
  return bool === "true" ? "false" : "true";
}

function prepareButtons() {
  $("#btnRestart").addEventListener("click", () => {
    location.reload();
  });

  const borders = localStorage.getItem("borders") || "true";
  const minefield = localStorage.getItem("minefield") || "false";

  [
    { bool: borders, text: "borders", btn: $("#btnBorders") },
    { bool: minefield, text: "minefield", btn: $("#btnMinefield") },
  ].forEach((o) => {
    o.btn.addEventListener("click", () => {
      localStorage.setItem(o.text, not(o.bool));
      location.reload();
    });

    o.btn.lastChild.textContent = `Turn ${o.bool === "true" ? "off" : "on"} ${
      o.text
    }`;
  });

  return [borders, minefield];
}

function drawBorders() {
  const reg = $(".state");

  reg.style.stroke = "#8492a6";
  reg.style.strokeWidth = "0.5";
}

function formatTime(seconds) {
  return `${(seconds / 60) | 0}:${(seconds % 60).toString().padStart(2, "0")}`;
}

(function () {
  const [borders, minefield] = prepareButtons();

  if (borders === "true") drawBorders();

  processRegions(minefield === "true");
  regionSequence = shuffleRegions();

  setInterval(() => {
    if (live !== 1) return;

    clock--;
    elTime.textContent = formatTime(clock);

    if (clock === 0) {
      live = 2;
      elNext.textContent = "You've run out of time.";
    }
  }, 1000);

  elNext.innerHTML = format(regions[regionSequence[0]]);
  elRemaining.textContent = totalRegions;
  elTotal.textContent = totalRegions;
})();

// TODO
// local over cdn
// php includes and stuff
