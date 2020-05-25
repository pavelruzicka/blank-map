const $ = document.querySelector.bind(document);
const $$ = (s) => document.querySelectorAll(s);

const elNext = $("#next");
const elRemaining = $("#remaining");
const elTotal = $("#total");

let live = 0;

let totalRegions = 0;
const regions = {};
let regionSequence = [];
let clickedRegions = [];

function colorRegion(el, color) {
  if (color === "green") {
    el.style.fill = "#29EB7F";
    el.style.stroke = "#13CE66";
  } else {
    el.style.fill = "#FF4949";
    el.style.stroke = "#BF0000";
  }
}

function addRegionTitle(el) {
  const title = document.createElementNS("http://www.w3.org/2000/svg", "title");

  title.textContent = el.dataset.name;
  el.appendChild(title);
}

function handleRegionClick(event, OHKO) {
  if (live === 2) return;
  if (!live) live = 1;

  const { target } = event;
  const { id } = target;

  if (clickedRegions.includes(id)) return;

  const current = regionSequence[0];

  if (current === id) {
    clickedRegions.push(regionSequence.shift());
    elNext.textContent = regions[regionSequence[0]];
    elRemaining.textContent = --totalRegions;

    colorRegion(target, "green");
    addRegionTitle(target);
  } else if (OHKO) {
    live = 2;

    colorRegion(target, "red");
    addRegionTitle(target);
  }
}

function processRegions(OHKO) {
  for (let region of $$("#map .state > path")) {
    totalRegions++;
    regions[region.id] = region.dataset.name;

    region.addEventListener("click", (e) => handleRegionClick(e, OHKO));
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

function prepareGame() {
  regionSequence = shuffleRegions();

  console.log(regionSequence);
}

(function () {
  const borders = true;
  const OHKO = true;

  if (borders) {
    const reg = $(".state");

    reg.style.stroke = "#8492a6";
    reg.style.strokeWidth = "0.5";
  }

  processRegions(OHKO);
  prepareGame();

  elNext.textContent = regions[regionSequence[0]];
  elRemaining.textContent = totalRegions;
  elTotal.textContent = totalRegions;
})();
