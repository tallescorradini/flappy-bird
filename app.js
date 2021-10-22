const bird = document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const sky = document.querySelector(".sky");
const ground = document.querySelector(".ground");

let position = 100;
let gravity = 2;
const JUMP_HEIGHT = 50;
const MAX_FLYING_HEIGHT = sky.offsetHeight - bird.offsetHeight - JUMP_HEIGHT;

function applyGravity(position) {
  return (position -= gravity);
}

function updatePosition(newPosition) {
  position = newPosition;
  bird.style.bottom = newPosition + "px";
}

function fly() {
  console.log(sky.offsetHeight, bird.offsetHeight);
  if (position < MAX_FLYING_HEIGHT) updatePosition((position += JUMP_HEIGHT));
}
document.addEventListener("keyup", fly);

function startGame() {
  updatePosition(applyGravity(position));
}
let timerId = setInterval(startGame, 20);
