const $ = document.querySelector.bind(document);
const $$ = (s) => document.querySelectorAll(s);

const elNext = $("#next");

// flags
// let OHKO = true;

let totalRegions = 0;
const regions = {};
let regionSequence = [];
let clickedRegions = [];

function handleRegionClick(event) {
  const {
    target: { id },
  } = event;

  if (clickedRegions.includes(id)) {
    return;
  }

  const current = regionSequence[0];

  console.log(current, id);

  if (current === id) {
    clickedRegions.push(regionSequence.shift());
    elNext.textContent = regions[regionSequence[0]];

    console.log(regionSequence, clickedRegions);

    console.log("yep");
  } else {
    console.log("nope");
  }
}

function processRegions() {
  for (let region of $$("#map .state > path")) {
    totalRegions++;
    regions[region.id] = region.dataset.name;

    region.addEventListener("click", (e) => handleRegionClick(e));
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
  processRegions();
  prepareGame();

  elNext.textContent = regions[regionSequence[0]];
})();
