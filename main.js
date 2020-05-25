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

function format(reg) {
  return `Where is ${reg}?`;
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

function handleRegionClick(event, OHKO) {
  if (live === 2) return;
  if (!live) live = 1;

  const { target } = event;
  const { id } = target;

  if (clickedRegions.includes(id)) return;

  const current = regionSequence[0];

  if (current === id) {
    clickedRegions.push(regionSequence.shift());
    elNext.textContent = format(regions[regionSequence[0]]);
    elRemaining.textContent = --totalRegions;

    colorRegion(target, "green");
    addRegionTitle(target);
  } else if (OHKO) {
    const actual = $(`#${current}`);

    live = 2;

    colorRegion(target, "red");
    colorRegion(actual, "blue");
    addRegionTitle(target);
    addRegionTitle(actual);
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
  const borders = false;
  const OHKO = true;

  if (borders) {
    const reg = $(".state");

    reg.style.stroke = "#8492a6";
    reg.style.strokeWidth = "0.5";
  }

  processRegions(OHKO);
  prepareGame();

  elNext.textContent = format(regions[regionSequence[0]]);
  elRemaining.textContent = totalRegions;
  elTotal.textContent = totalRegions;
})();
